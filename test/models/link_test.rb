require "test_helper"

class LinkTest < ActiveSupport::TestCase
  def setup
    @url_regex = URI::DEFAULT_PARSER.make_regexp
    @slug_regex = /\A[a-z0-9\-_]+\z/i
    @grouped_clicks_by_country = {
      "Malaysia" => 100,
      "Singapore" => 110,
      "Thailand" => 120,
      "China" => 120,
      "Vietnam" => 120,
      "Japan" => 120,
      "Korea" => 120,
      "Australia" => 120
    }
  end

  test "should not save link without url" do
    link = Link.new

    assert_not link.save
    assert link.errors[:url].present?
  end

  test "should not save link with invalid url" do
    invalid_url_list = %w[httpq://example.com zzzhttpq://example.com example.com]
    invalid_url_list.each do |url|
      link = Link.new(url: url, slug: "a-valid-slug")
      link.valid?

      assert link.errors[:url].present?, "Expected url error for invalid url #{url}"
    end
  end

  test "should not save if slug is empty" do
    link = Link.new(url: "https://example.com", slug: nil)

    assert_not link.save
    assert link.errors[:slug].present?
  end

  test "should not save a duplicate slug" do
    slug = "this-is-a-slug"
    _link1 = Link.create(url: "https://example.com", slug: slug)
    link2 = Link.create(url: "https://example.com")

    assert_not link2.update(slug: slug)
    assert link2.errors[:slug].present?
  end

  test "slug should only contain letters, numbers, dashes and underscores" do
    invalid_slug_list = ["invalid slug", "invalid@$@slug", "invalid🤔slug"]
    invalid_slug_list.each do |slug|
      link = Link.new(url: "https://example.com", slug: slug)
      link.valid?

      assert link.errors[:slug].present?, "Expected slug error for invalid slug #{slug}"
    end
  end

  test "should default clicks_count to 0 upon creation" do
    link = Link.new(url: "https://example.com")
    link.save

    assert_equal 0, link.clicks_count
  end

  # Tests for Link APIs start
  test "assign_slug api should assign a slug to link" do
    link = Link.new(url: "https://example.com")
    link.assign_slug

    assert_not_nil link.slug
  end

  test "assign_slug should assign custom_slug if provided" do
    link = Link.new(url: "https://example.com", custom_slug: "a-custom-slug")
    link.assign_slug

    assert_equal "a-custom-slug", link.slug
  end

  test "smol_url should return nil if slug is blank" do
    link = Link.new(url: "https://example.com", slug: nil)

    assert_nil link.smol_url
  end

  test "smol_url should return a valid url with slug if slug is present" do
    slug = "this-is-a-slug"
    link = Link.new(url: "https://example.com", slug: slug)

    assert @url_regex.match(link.smol_url) && link.smol_url.to_s.include?(slug)
  end

  test "smol_url_display should return nil if slug is blank" do
    link = Link.new(url: "https://example.com", slug: nil)

    assert_nil link.smol_url_display
  end

  test "smol_url_display should return a string with slug if slug is present" do
    slug = "this-is-a-slug"
    link = Link.new(url: "https://example.com", slug: slug)

    assert link.smol_url_display.to_s.include?(slug)
  end

  test "statistics_data should return an Array" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal Array, link.statistics_data.class
  end

  test "statistics_data should return an Array with 4 hashes" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal 4, link.statistics_data.count { |i| i.instance_of?(Hash) }
  end

  test "statistics_data should return an Array with hashes containing keys name, value and description" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert link.statistics_data.count { |i| i.keys != [:name, :value, :description] } == 0
  end

  test "visual_data should return a hash" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal Hash, link.visual_data.class
  end

  test "visual_data should have keys link_clicks, clicks_by_country, clicks_by_device and clicks_by_browser" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal [:link_clicks, :clicks_by_country, :clicks_by_device, :clicks_by_browser], link.visual_data.keys
  end

  test "visual_data key value's hash should have keys name, labels and datasets" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert link.visual_data.values.count { |i| i.keys != [:name, :labels, :datasets] } == 0
  end

  test "chart_clicks_by_days should return a hash" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal Hash, link.chart_clicks_by_days.class
  end

  test "chart_clicks_by_days should have keys labels and data" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal [:labels, :data], link.chart_clicks_by_days.keys
  end

  test "chart_clicks_by_days hash values should be array type" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    days = 30
    labels, data = link.chart_clicks_by_days(days: days).values_at(:labels, :data)

    assert_equal Array, labels.class
    assert_equal Array, data.class
  end

  test "chart_clicks_by_days hash values should be an array of items with length defined by days arg" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    days = 30
    labels, data = link.chart_clicks_by_days(days: days).values_at(:labels, :data)

    assert_equal days, labels.length
    assert_equal days, data.length
  end

  test "chart_meta_clicks_by_limit should return a hash" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal Hash, link.chart_meta_clicks_by_limit(@grouped_clicks_by_country).class
  end

  test "chart_meta_clicks_by_limit should have keys labels and data" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    assert_equal [:labels, :data], link.chart_meta_clicks_by_limit(@grouped_clicks_by_country).keys
  end

  test "chart_meta_clicks_by_limit hash values should be array type" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save
    labels, data = link.chart_meta_clicks_by_limit(@grouped_clicks_by_country).values_at(:labels, :data)

    assert_equal Array, labels.class
    assert_equal Array, data.class
  end

  test "chart_meta_clicks_by_limit hash values should return array of unique items with length defined by length arg, any additional items will be summed and grouped under 'Others' key" do
    link = Link.new(url: "https://example.com")
    link.assign_slug
    link.save

    length = 4
    labels, data = link.chart_meta_clicks_by_limit(@grouped_clicks_by_country, length: length).values_at(:labels, :data)
    expected_length = length + 1

    assert_equal expected_length, labels.length
    assert_equal expected_length, data.length
  end
  # Tests for Link APIs end
end
