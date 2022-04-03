require "test_helper"

class ClickEventQueriesTest < ActiveSupport::TestCase
  def setup
    @retrieve_click_events_query = <<~GRAPHQL
      query($linkId: String!, $first: Int, $after: String) {
        retrieveClickEventsWithConnection(linkId: $linkId, first: $first, after: $after) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          nodes {
            id
          }
        }
      }
    GRAPHQL
  end

  test "retrieveClickEventsWithConnection query should retrieve paginate click events" do
    link = Link.create(url: "https://example.com", slug: "a-new-slug")
    link.click_events.create(
      ip_address: "8.8.8.8",
      event_at: Time.zone.now
    )
    response = MySmolUrlSchema.execute(@retrieve_click_events_query, variables: {
      linkId: link.id
    })

    assert response.dig("data", "retrieveClickEventsWithConnection").key?("pageInfo")
    assert response.dig("data", "retrieveClickEventsWithConnection").key?("nodes")
    assert_equal 1, response.dig("data", "retrieveClickEventsWithConnection", "nodes").length
  end
end
