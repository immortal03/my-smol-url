class Link < ApplicationRecord
  has_many :click_events, dependent: :destroy

  validates :url, presence: true, format: {with: URI::DEFAULT_PARSER.make_regexp}
  validates :slug, presence: true, uniqueness: true

  attr_accessor :custom_slug

  def assign_slug
    self.slug = custom_slug.presence || SlugGenerator.call
  end

  def smol_url
    return nil if slug.blank?

    # Remember to set APP_URL env in production to root url
    # e.g. https://mysmolurl.com
    if Rails.env.production?
      "#{ENV["APP_URL"]}#{slug}"
    else
      "http://localhost:3000/#{slug}"
    end
  end

  def smol_url_display
    return nil if slug.blank?

    # Remember to set ROOT_URL env in production to root url
    # e.g. mysmolurl.com
    if Rails.env.production?
      "#{ENV["ROOT_URL"]}#{slug}"
    else
      "localhost:3000/#{slug}"
    end
  end

  def statistics_data
    # Return 4 types of statistics data for the link analytics page:
    # 1. # of clicks
    # 2. Top country of clicks
    # 3. Top browser of clicks
    # 4. Top device of clicks

    [].tap do |data|
      data << {
        name: "Total Clicks",
        value: clicks_count,
        description: "from #{created_at.strftime("%b %d, %Y")}"
      }

      # Get stats from top country
      top_country, tc_clicks = click_events.group(:country).count.max_by { |_, v| v }
      data << {
        name: "Top Country",
        value: top_country,
        description: "from #{tc_clicks} clicks"
      }

      # Get stats from top device
      top_device, td_clicks = click_events.group(:device).count.max_by { |_, v| v }
      data << {
        name: "Top Device",
        value: top_device,
        description: "from #{td_clicks} clicks"
      }

      # Get stats from top browser
      top_browser, tb_clicks = click_events.group(:browser).count.max_by { |_, v| v }
      data << {
        name: "Top Browser",
        value: top_browser,
        description: "from #{tb_clicks} clicks"
      }
    end
  end

  def visual_data
    # Data structure for Charts.js
    # https://react-chartjs-2.js.org/components
    # https://www.chartjs.org/docs/latest/
    generator = ColorGenerator.new(
      saturation: 0.7,
      lightness: 0.75,
      seed: 10
    )

    {}.tap do |data|
      # Link clicks bar chart - display last 30 days
      grouped_clicks_by_date = click_events.where(
        created_at: 30.days.ago.beginning_of_day..Time.zone.now
      ).group("created_at::date").count

      data[:link_clicks] = {
        name: "Clicks",
        labels: grouped_clicks_by_date.keys,
        datasets: [
          {
            label: "Clicks",
            data: grouped_clicks_by_date.values,
            background_color: "rgba(30, 64, 175, 0.8)"
          }
        ]
      }

      # Clicks by country pie chart
      grouped_clicks_by_country = click_events.group(:country).count

      data[:clicks_by_country] = {
        name: "Clicks by Country",
        labels: grouped_clicks_by_country.keys,
        datasets: [
          {
            data: grouped_clicks_by_country.values,
            background_color: grouped_clicks_by_country.keys.length.times.map { |_| "##{generator.create_hex}" },
            border_width: 1
          }
        ]
      }

      # Clicks by devices pie chart
      grouped_clicks_by_device = click_events.group(:device).count

      data[:clicks_by_device] = {
        name: "Clicks by Device",
        labels: grouped_clicks_by_device.keys,
        datasets: [
          {
            data: grouped_clicks_by_device.values,
            background_color: grouped_clicks_by_device.keys.length.times.map { |_| "##{generator.create_hex}" },
            border_width: 1
          }
        ]
      }

      # Clicks by browser pie chart
      grouped_clicks_by_browser = click_events.group(:browser).count

      data[:clicks_by_browser] = {
        name: "Clicks by Browser",
        labels: grouped_clicks_by_browser.keys,
        datasets: [
          {
            data: grouped_clicks_by_browser.values,
            background_color: grouped_clicks_by_browser.keys.length.times.map { |_| "##{generator.create_hex}" },
            border_width: 1,
            weight: 10
          }
        ]
      }
    end
  end
end
