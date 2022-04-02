class Rack::Attack
  ### Configure Cache ###

  # If you don't want to use Rails.cache (Rack::Attack's default), then
  # configure it here.
  #
  # Note: The store is only used for throttling (not blocklisting and
  # safelisting). It must implement .increment and .write like
  # ActiveSupport::Cache::Store

  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  throttle("req/ip", limit: 10, period: 1.second) do |req|
    req.ip
  end

  Rack::Attack.safelist "allow localhost" do |req|
    req.ip == "127.0.0.1" || req.ip == "::1"
  end
end
