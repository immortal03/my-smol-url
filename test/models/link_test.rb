require "test_helper"

class LinkTest < ActiveSupport::TestCase
  def setup
    @url_regex = URI::DEFAULT_PARSER.make_regexp
  end

  test "should not save link without url" do
    link = Link.new
    assert_not link.save
  end

  test "should not save link with invalid url" do
    link = Link.new(url: "an-invalid-url")
    assert_not link.save
  end

  test "should not save if slug is empty" do
    link = Link.new(url: "https://www.google.com", slug: nil)
    assert_not link.save
  end

  test "should default clicks_count to 0 upon creation" do
    link = Link.new(url: "https://www.google.com")
    link.save

    assert_equal 0, link.clicks_count
  end

  test "should not save a duplicate slug" do
    link1 = Link.create(url: "https://www.google.com")
    link2 = Link.create(url: "https://www.google.com")
    link1.update(slug: "thisisaslug")

    assert_not link2.update(slug: "thisisaslug")
  end

  test "assign_slug api should assign a slug to link" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug

    assert_not_nil link.slug
  end

  test "assign_slug should assign custom_slug if provided" do
    link = Link.new(url: "https://www.google.com", custom_slug: "a-custom-slug")
    link.assign_slug

    assert_equal "a-custom-slug", link.slug
  end

  test "smol_url should return nil if slug is blank" do
    link = Link.new(url: "https://www.google.com", slug: nil)
    assert_nil link.smol_url
  end

  test "smol_url should return a valid url with slug if slug is present" do
    slug = "this-is-a-slug"
    link = Link.new(url: "https://www.google.com", slug: slug)

    assert @url_regex.match(link.smol_url) && link.smol_url.include?(slug)
  end

  test "smol_url_display should return nil if slug is blank" do
    link = Link.new(url: "https://www.google.com", slug: nil)
    assert_nil link.smol_url_display
  end

  test "smol_url_display should return a string with slug if slug is present" do
    slug = "this-is-a-slug"
    link = Link.new(url: "https://www.google.com", slug: slug)

    assert link.smol_url_display.include?(slug)
  end

  test "statistics_data should return an Array" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert_equal Array, link.statistics_data.class
  end

  test "statistics_data should return an Array with 4 hashes" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert_equal 4, link.statistics_data.count { |i| i.instance_of?(Hash) }
  end

  test "statistics_data should return an Array with hashes containing keys name, value and description" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert link.statistics_data.count { |i| i.keys != [:name, :value, :description] } == 0
  end

  test "visual_data should return a Hash" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert_equal Hash, link.visual_data.class
  end

  test "visual_data should have keys link_clicks, clicks_by_country, clicks_by_device and clicks_by_browser" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert_equal [:link_clicks, :clicks_by_country, :clicks_by_device, :clicks_by_browser], link.visual_data.keys
  end

  test "visual_data key value's Hash should have keys name, labels and datasets" do
    link = Link.new(url: "https://www.google.com")
    link.assign_slug
    link.save

    assert link.visual_data.values.count { |i| i.keys != [:name, :labels, :datasets] } == 0
  end
end
