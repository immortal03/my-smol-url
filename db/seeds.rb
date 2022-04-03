# Sample data for dev env usage
SAMPLE_COUNTRIES = %w[Singapore Malaysia Indonesia Thailand China Australia Japan Korea].freeze
SAMPLE_DEVICES = ["iPhone 13 Pro Max", "iPhone 13 Pro", "Galaxy S22", "iPhone 12 Pro Max", "Huawei P30", "OnePlus 10", "Nokia 3380"].freeze
SAMPLE_BROWSERS = ["Chrome", "Firefox", "Safari", "Edge", "Opera", "Internet Explorer", "Netscape", "Chromium"].freeze

hash = [
  {
    url: "https://www.coingecko.com/",
    page_title: "Cryptocurrency Prices, Charts, and Crypto Market Cap | CoinGecko"
  },
  {
    url: "https://www.example.com/",
    page_title: "Example Page!"
  },
  {
    url: "https://twitter.com/",
    page_title: "Twitter Home!"
  }
]

hash.each do |data|
  link = Link.new(data)
  link.assign_slug
  link.save!

  31.times do |n|
    rand(20..100).times do
      link.click_events.create(
        browser: SAMPLE_BROWSERS.sample,
        device: SAMPLE_DEVICES.sample,
        country: SAMPLE_COUNTRIES.sample,
        city: Faker::Address.city,
        ip_address: Faker::Internet.ip_v4_address,
        event_at: Faker::Time.between(
          from: (Time.zone.now - n.days).beginning_of_day,
          to: n == 0 ? Time.zone.now : (Time.zone.now - n.days).end_of_day
        )
      )

      link.update(clicks_count: link.clicks_count + 1)
    end
  end
end
