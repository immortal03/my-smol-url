class EventHandler::RecordClickEvent < ApplicationService
  attr_reader :link_id, :ip, :user_agent, :event_at

  def initialize(link_id:, ip:, user_agent:, event_at:)
    raise ArgumentError unless link_id.present? && ip.present? && user_agent.present? && event_at.present?

    @link_id = link_id
    @ip = ip
    @user_agent = user_agent
    @event_at = event_at
  end

  def call
    ClickEvent.transaction do
      click_event = ClickEvent.new(
        link_id: @link_id,
        ip_address: @ip,
        event_at: @event_at
      )

      # Get IP info using geocoder
      # https://github.com/alexreisner/geocoder
      # 5 minutes caching in case transaction fails / dup and rerun
      geolocation_data = Rails.cache.fetch("/geocoder/#{@ip}", expires_in: 5.minutes) do
        results = Geocoder.search(@ip)
        result = results.first

        {country: result&.country || "Unknown"}
      rescue
        {country: "Unknown"}
      end

      # Get device, browser info using browser gem
      # https://github.com/fnando/browser
      browser_data = begin
        browser = Browser.new(@user_agent)
        {browser: browser.name, device: browser.device.name}
      rescue
        {browser: "Unknown", device: "Unknown"}
      end

      click_event.assign_attributes(browser_data.merge(geolocation_data))
      click_event.save!
    end
  end
end
