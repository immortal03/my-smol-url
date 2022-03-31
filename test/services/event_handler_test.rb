require "test_helper"

class EventHandlerTest < ActiveSupport::TestCase
  def setup
    @link = Link.create(url: "http://www.google.com", slug: "a-new-slug")
    @invalid_id = "an-invalid-id"
    @user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
    @ip = "8.8.8.8"
  end

  # Tests for EventHandler::IncreaseClicksCount start
  test "EventHandler::IncreaseClicksCount should only be initialized if link_id is provided" do
    assert_raises ArgumentError do
      EventHandler::IncreaseClicksCount.call(link_id: nil)
    end
  end

  test "EventHandler::IncreaseClicksCount should return false if invalid link_id provided" do
    assert_not EventHandler::IncreaseClicksCount.call(link_id: @invalid_id)
  end

  test "EventHandler::IncreaseClicksCount should increase link clicks_count by 1 on default" do
    initial_count = @link.clicks_count
    EventHandler::IncreaseClicksCount.call(link_id: @link.id)

    assert_equal initial_count + 1, @link.reload.clicks_count
  end

  test "EventHandler::IncreaseClicksCount should increase link clicks_count by count value provided" do
    initial_count = @link.clicks_count
    increase_by = 5
    EventHandler::IncreaseClicksCount.call(link_id: @link.id, count: increase_by)

    assert_equal initial_count + increase_by, @link.reload.clicks_count
  end
  # Tests for EventHandler::IncreaseClicksCount end

  # Tests for EventHandler::ScrapeAndRecordPageTitle start
  test "EventHandler::ScrapeAndRecordPageTitle should only be initialized if link_id is provided" do
    assert_raises ArgumentError do
      EventHandler::ScrapeAndRecordPageTitle.call(link_id: nil)
    end
  end

  test "EventHandler::ScrapeAndRecordPageTitle should return false if invalid link_id provided" do
    assert_not EventHandler::ScrapeAndRecordPageTitle.call(link_id: @invalid_id)
  end

  test "EventHandler::ScrapeAndRecordPageTitle should save page title to Link" do
    link = Link.create(url: "https://example.com/", slug: "a-new-slug-2")
    EventHandler::ScrapeAndRecordPageTitle.call(link_id: link.id)

    assert_equal "Example Domain", link.reload.page_title
  end

  test "EventHandler::ScrapeAndRecordPageTitle should return false if url is invalid" do
    link = Link.create(url: "https://www.invalid-url-123123/", slug: "a-new-slug-3")
    assert_not EventHandler::ScrapeAndRecordPageTitle.call(link_id: link.id)
  end
  # Tests for EventHandler::ScrapeAndRecordPageTitle end

  # Tests for EventHandler::RecordClickEvent start
  test "EventHandler::RecordClickEvent should only be initialized if link_id, ip, user_agent and event_at is provided" do
    assert_raises ArgumentError, message: "link_id should be present" do
      EventHandler::RecordClickEvent.call(
        link_id: nil,
        ip: @ip,
        user_agent: @user_agent,
        event_at: Time.zone.now
      )
    end

    assert_raises ArgumentError, message: "ip should be present" do
      EventHandler::RecordClickEvent.call(
        link_id: @link.id,
        ip: nil,
        user_agent: @user_agent,
        event_at: Time.zone.now
      )
    end

    assert_raises ArgumentError, message: "user_agent should be present" do
      EventHandler::RecordClickEvent.call(
        link_id: @link.id,
        ip: @ip,
        user_agent: nil,
        event_at: Time.zone.now
      )
    end

    assert_raises ArgumentError, message: "event_at should be present" do
      EventHandler::RecordClickEvent.call(
        link_id: @link.id,
        ip: @ip,
        user_agent: @user_agent,
        event_at: nil
      )
    end
  end

  test "EventHandler::RecordClickEvent should save a ClickEvent record" do
    initial_click_events_count = @link.click_events.size
    EventHandler::RecordClickEvent.call(
      link_id: @link.id,
      ip: @ip,
      user_agent: @user_agent,
      event_at: Time.zone.now
    )

    assert_equal initial_click_events_count + 1, @link.reload.click_events.size
  end
  # Tests for EventHandler::RecordClickEvent end
end
