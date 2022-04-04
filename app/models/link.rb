class Link < ApplicationRecord
  include ChartData

  has_many :click_events, dependent: :destroy

  validates :url, presence: true, url: {message: "is not a valid format"}
  validates :slug, presence: true, uniqueness: true, length: {minimum: 8, maximum: 15},
    format: {with: /\A[a-z0-9\-_]+\z/i, message: "can only contain letters, numbers, dashes and underscores"}

  attr_accessor :custom_slug

  def assign_slug
    self.slug = custom_slug.presence || SlugGenerator.call
  end

  def smol_url
    return nil if slug.blank?

    # Remember to set APP_URL env in production to root url
    # e.g. https://smolurl.me
    if Rails.env.production?
      "#{ENV["APP_URL"]}#{slug}"
    else
      "http://localhost:3000/#{slug}"
    end
  end

  def smol_url_display
    return nil if slug.blank?

    # Remember to set ROOT_URL env in production to root url
    # e.g. smolurl.me
    if Rails.env.production?
      "#{ENV["ROOT_URL"]}#{slug}"
    else
      "localhost:3000/#{slug}"
    end
  end
end
