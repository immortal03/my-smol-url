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

## Running Test Suite

Testing done using `Minitest` and coverage for this application includes controllers, models, services and GraphQL queries & mutations. 

Run test cases using `rails test`.

## Deployment to Production

This application is configured to deploy using [dokku](https://dokku.com/) or Heroku.

### Deploying on AWS

- Create an EC2 instance using Ubuntu 20.04 and SSH in
- Allocate [swap memory](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-20-04/) (optional)
- Install dokku in the EC2 instance
- Configure ssh access for `dokku` user
- `dokku apps:create your_app_name` to create a new application
- Create a RDS PostgreSQL instance and note down the DB URL, format: `postgresql://[username]:[password]@[endpoint_url]:[port]/[db_name]`
- Create an Elasticache (Redis) instance and note down the URL, format: `redis://[primary_endpoint]/0`
- Configure env for production using `dokku config:set your_app_name APP_URL=YOUR_WEBSITE_URL ROOT_URL=YOUR_WEBSITE_ROOL_URL REDIS_URL=YOUR_REDIS_URL DATABASE_URL=YOUR_PSQL_URL RAILS_MASTER_KEY=YOUR_MASTER_KEY`
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
- On your local repository, add git remote `git remote add dokku dokku@[server_ip_address]:[dokku_app_name]`
- Run `git push dokku main` to deploy to production
- Run `dokku ps:scale worker=1` to scale the worker process to 1
- Run `dokku domains:add your_app_name domain_name` to add a domain name to your application (if applicable)


#### Adding SSL Support

- In your EC2 instance, install [letsencrypt plugin](https://github.com/dokku/dokku-letsencrypt) for dokku
- Run `dokku letsencrypt:enable your_app_name` to install SSL certificate for your app