require "test_helper"

class LinkQueriesTest < ActiveSupport::TestCase
  def setup
    @retrieve_link_query = <<~GRAPHQL
      query($slug: String!) {
      retrieveLink(slug: $slug) {
          id
        }
      }
    GRAPHQL

    @retrieve_links_with_connection_query = <<~GRAPHQL
      query($first: Int = 10, $after: String) {
        retrieveLinksWithConnection(first: $first, after: $after) {
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

    @retrieve_chart_clicks_by_days_query = <<~GRAPHQL
      query($slug: String!, $days: Int){
        retrieveChartClicksByDays(slug: $slug, days: $days)
      }
    GRAPHQL
  end

  test "retrieveLink query should retrieve link by slug" do
    slug = "a-new-slug"
    link = Link.create(url: "https://example.com", slug: slug)
    response = MySmolUrlSchema.execute(@retrieve_link_query, variables: {
      slug: slug
    })

    assert_equal link.id, response.dig("data", "retrieveLink", "id")
  end

  test "retrieveLink query should return nil if invalid slug provided" do
    response = MySmolUrlSchema.execute(@retrieve_link_query, variables: {
      slug: "an-invalid-slug-123"
    })

    assert response.dig("data", "retrieveLink", "id").nil?
  end

  test "retrieveLinksWithConnection query should retrieve paginate links" do
    Link.create(url: "https://example.com", slug: "a-new-slug")
    response = MySmolUrlSchema.execute(@retrieve_links_with_connection_query)

    assert response.dig("data", "retrieveLinksWithConnection").key?("pageInfo")
    assert response.dig("data", "retrieveLinksWithConnection").key?("nodes")
  end

  test "retrieveChartClicksByDays query should retrieve grouped clicks count by day" do
    Link.create(url: "https://example.com", slug: "a-new-slug")
    response = MySmolUrlSchema.execute(@retrieve_chart_clicks_by_days_query, variables: {
      slug: "a-new-slug",
      days: 30
    })

    assert response.dig("data", "retrieveChartClicksByDays").key?(:labels)
    assert response.dig("data", "retrieveChartClicksByDays").key?(:data)
  end

  test "retrieveChartClicksByDays query should return nil if invalid slug provided" do
    response = MySmolUrlSchema.execute(@retrieve_chart_clicks_by_days_query, variables: {
      slug: "an-invalid-slug-123",
      days: 30
    })

    assert response.dig("data", "retrieveChartClicksByDays").nil?
  end
end
