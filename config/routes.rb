require "sidekiq/web"

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  if Rails.env.production?
    # Basic authentication for production
    # Add in your username and password in credentials
    # rails credentials:edit
    Sidekiq::Web.use Rack::Auth::Basic do |username, password|
      ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username), ::Digest::SHA256.hexdigest(Rails.application.credentials.dig(:sidekiq, :username))) &
        ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password), ::Digest::SHA256.hexdigest(Rails.application.credentials.dig(:sidekiq, :password)))
    end
  end

  mount Sidekiq::Web, at: "/sidekiq"

  root to: "landing#index"

  get "/:slug", to: "landing#redirector"
  get "/(*others)", to: "landing#index"
  get "/analytics/(*others)", to: "landing#index"
end
