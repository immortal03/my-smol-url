# ![SmolURL - Link Shortener](app/javascript/images/msu_logo.svg)

> A URL shortener that allows you to shorten long URLs and track click events. Built using Ruby on Rails and React. 

Demo application URL: [smolurl.me](https://smolurl.me/)

# Getting started

To get the Rails application server running locally:
- Install Ruby 3.1.1
- Install Node 16.13.1 and Yarn 1.22.17
- Clone this repo
- `bundle install` and `yarn install` to install all required dependencies
- Install foreman `gem install foreman`
- `rails db:create db:migrate` to make all database migrations
- `rails db:seed` to seed the database (optional)
- `rails credentials:edit` to generate master.key and credentials.yml
- `./bin/dev` to start the local server
- `./bin/webpack-dev-server` to start the webpack dev server (optional)

# Code Overview
## Gem Dependencies

- [tailwindcss-rails](https://github.com/rails/tailwindcss-rails) - For TailWind CSS framework support
- [graphql](https://github.com/rmosolgo/graphql-ruby) - For API data querying
- [sidekiq](https://github.com/mperham/sidekiq) - For background job processing
- [browser](https://github.com/fnando/browser) - For browser detection
- [geocoder](https://github.com/alexreisner/geocoder) - For retrieving geo-location data
- [validate_url](https://github.com/perfectline/validates_url) - For ActiveRecord URL validation
- [rack-cors](https://github.com/cyu/rack-cors) - For CORS support
- [rack-attack](https://github.com/rack/rack-attack) - For blocking and throttling requests

## Package Dependencies

- [@apollo/client](https://www.npmjs.com/package/@apollo/client) - GraphQL client integration for React
- [lodash](https://www.npmjs.com/package/lodash) - Modular utility library
- [date-fns](https://github.com/cyu/rack-cors) - Date utility library
- [chart.js](https://github.com/cyu/rack-cors) - Charting library
- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) - React wrapper for Chart.js
- [qrcode](https://github.com/cyu/rack-cors) - QR code generator for URLs
- [react-virtual](https://www.npmjs.com/package/react-virtual) - For virtualizing scrollable elements in React

## Folders

- `app/models` - Contains the database models for the application where we can define methods, validations, queries, and relations to other models.
- `app/views` - Contains templates for generating the JSON output for the API
- `app/controllers` - Contains the controllers where requests are routed to their actions, where we find and manipulate our models and return them for the views to render.
- `app/services` - Contains the service objects required for business logic.
- `config` - Contains configuration files for our Rails application and for our database, along with an `initializers` folder for scripts that get run on boot.
- `db` - Contains the migrations needed to create our database schema.
- `test` - Contains the test files for our application.

## Business Logics
### Slug Generator
The slug generator `SlugGenerator` used by this application is located in the `app/services/slug_generator.rb` file. The slug is generated using `SecureRandom.urlsafe_base64` to ensure the slug generated is url safe and unique.
```
# app/services/slug_generator.rb

# Basic usage (will return length of 10 by default)
# Number of combinations using 8 characters 10,639,125,640
# Number of combinations using 10 characters 621,324,937,376
SlugGenerator.call

# Default length is changable by passing in a length arg
SlugGenerator.call(length: 8)
SlugGenerator.call(length: 15)
```

### Event Handlers
#### Record Click Event
The `EventHandler::RecordClickEvent` service object can be accessed in `app/services/event_handler/record_click_event.rb`. This service object is called to retrieve browser and geolocation data as well as to create a new `ClickEvent` record in the database.

```
# app/services/event_handler/record_click_event.rb

# A basic usage of the service object
EventHandler::RecordClickEvent.call(
  link_id: @link.id,
  ip: @ip,
  user_agent: @user_agent,
  event_at: Time.zone.now
)

# Retrieving geolocation data using Geocoder
results = Geocoder.search(@ip)
result = results.first

puts result

{
  "ip"=>"42.60.189.40",
  "hostname"=>"bb42.60-189-40.singnet.com.sg",
  "city"=>"Singapore",
  "region"=>"Singapore",
  "country"=>"SG",
  "loc"=>"1.2897,103.8501",
  "org"=>"AS9506 Singtel Fibre Broadband",
  "postal"=>"018989",
  "timezone"=>"Asia/Singapore",
  "readme"=>"https://ipinfo.io/missingauth"
}

# Retrieving browser data using Browser
browser = Browser.new(@user_agent)
{browser: browser.name, device: browser.device.name}
```

#### Scrape and Record Page Title
The `EventHandler::ScrapeAndRecordPageTitle` service object can be accessed in `app/services/event_handler/scrape_and_record_page_title.rb`. This service object is called to scrape the page title from the URL provided using `MetaInspector` and save the information to a `Link` instance.

```
# app/services/event_handler/scrape_and_record_page_title.rb

# A basic usage of the service object
EventHandler::ScrapeAndRecordPageTitle.call(link_id: @link.id)

# Scraping page title using MetaInspector
page = MetaInspector.new(@link.url)
page.title # Returns page title if found
```

### Increase Clicks Count
The `EventHandler::IncreaseClicksCount ` service object can be accessed in `app/services/event_handler/increase_clicks_count.rb`. This service object is called to increase the `clicks_count` of the `Link` instance by 1.

```
# app/services/event_handler/increase_clicks_count.rb

# A basic usage of the service object
EventHandler::IncreaseClicksCount.call(link_id: @link.id)
EventHandler::IncreaseClicksCount.call(link_id: @link.id, count: 2) # Increase clicks count by 2 if count arg is provided
```

## Concurrency and Error Handling

As the application increases the `clicks_count` field of a `Link` record by 1 for each click, there might be race conditions happening if there are a sudden surge in click events. The application handles this by using pessimistic locking and background job processing.

```
# Example incrementing the clicks_count field in Link
link = Link.find_by(id: @link_id)

# Locking the record to prevent race conditions and ensure data integrity
link.with_lock do
  link.clicks_count += @count
  link.save!
end

# Example of error handling using ActiveJob
# E.g. scraping a webpage might fail due to various reasons e.g. network issues, page not found, etc.
class ScrapeAndRecordPageTitleJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 3, wait: 5.seconds # Job will retry in case of error raised by MetaInspector

  def perform(link_id:)
    EventHandler::ScrapeAndRecordPageTitle.call(link_id: link_id)
  end
end
```

## Throttling and Rate Limiting
This application uses `rack-attack` gem to throttle requests to the application. You may change the configuration in `config/initializers/rack_attack.rb`.

```
# config/initializers/rack_attack.rb

class Rack::Attack
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Currently limit to 10 requests per second
  throttle("req/ip", limit: 10, period: 1.second) do |req|
    req.ip
  end

  Rack::Attack.safelist "allow localhost" do |req|
    req.ip == "127.0.0.1" || req.ip == "::1"
  end
end
```
## Running Test Suite

Testing done using `Minitest` and coverage for this application includes controllers, models, services and GraphQL queries & mutations. 

Run test cases using `rails test`.

## Deployment to Production

This application is configured to deploy using [dokku](https://dokku.com/) on EC2 (AWS) or Heroku.

### Deploying on AWS

- Create an EC2 instance using Ubuntu 20.04 and SSH in
- Allocate [swap memory](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-20-04/) (optional)
- Install dokku in the EC2 instance
- Configure ssh access for `dokku` user
- `dokku apps:create your_app_name` to create a new application
- Create a RDS PostgreSQL instance and note down the DB URL, format: `postgresql://[username]:[password]@[endpoint_url]:[port]/[db_name]`
- Create an Elasticache (Redis) instance and note down the URL, format: `redis://[primary_endpoint]/0`
- Configure env for production using `dokku config:set your_app_name APP_URL=YOUR_WEBSITE_URL ROOT_URL=YOUR_WEBSITE_ROOL_URL REDIS_URL=YOUR_REDIS_URL DATABASE_URL=YOUR_PSQL_URL RAILS_MASTER_KEY=YOUR_MASTER_KEY`
- Additionally, you may set `dokku config:set your_app_name CDN_HOST=YOUR_CDN_HOST` if you want to use a CDN to serve your assets 
- On your local repository, add git remote `git remote add dokku dokku@[ec2_ip_address]:[dokku_app_name]`
- Run `git push dokku main` to deploy to production
- Run `dokku ps:scale worker=1` to scale the worker process to 1
- Run `dokku domains:add your_app_name domain_name` to add a domain name to your application (if applicable)


### Deploying DB and Redis using dokku

- If you do not wish to setup an RDS or Elasticache instance, you can deploy the PostgreSQL database and Redis using dokku plugins.
- Install dokku [postgresql plugin](https://github.com/dokku/dokku-postgres)
- Run `dokku posgresql:create your_db_name` to create a new PostgreSQL instance
- Run `dokku posgresql:link your_db_name your_app_name` to link the PostgreSQL instance to your application
- Install dokku [redis plugin](https://github.com/dokku/dokku-redis)
- Run `dokku redis:create your_redis_name` to create a new Redis instance
- Run `dokku redis:link your_redis_name your_app_name` to link the Redis instance to your application
- Configure env for production using `dokku config:set your_app_name APP_URL=YOUR_WEBSITE_URL ROOT_URL=YOUR_WEBSITE_ROOL_URL RAILS_MASTER_KEY=YOUR_MASTER_KEY`
- Additionally, you may set `dokku config:set your_app_name CDN_HOST=YOUR_CDN_HOST` if you want to use a CDN to serve your assets
- On your local repository, add git remote `git remote add dokku dokku@[server_ip_address]:[dokku_app_name]`
- Run `git push dokku main` to deploy to production
- Run `dokku ps:scale worker=1` to scale the worker process to 1
- Run `dokku domains:add your_app_name domain_name` to add a domain name to your application (if applicable)


#### Adding SSL Support

- In your EC2 instance, install [letsencrypt plugin](https://github.com/dokku/dokku-letsencrypt) for dokku
- Run `dokku letsencrypt:enable your_app_name` to install SSL certificate for your app

### Deployment Issues

There is currently an [issue](https://github.com/heroku/heroku-buildpack-ruby/issues/1294) with heroku ruby buildpacks that prevents the application from deploying through dokku. You will have to clear your build cache everytime you push to production using `dokku repo:purge-cache your_app_name`.

## Enhancements

- Use proxies for page title scraping
- Display a snapshot of the page in the analytics page
- Allow users to select length of the URL slug
- Allow users to include utm parameters in the URL slug
- Allow user account signup and scope link analytics to user ownership
- Add notification systems (e.g. email, push notification) to notify users of certain click events threshold hit