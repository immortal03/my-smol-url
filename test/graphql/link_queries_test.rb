require "test_helper"

class LinkQueriesTest < ActiveSupport::TestCase
  test "retrieveLink query should retrieve link by slug" do
    query_string = <<~GRAPHQL
      query($slug: String!) {
      retrieveLink(slug: $slug) {
          id
        }
      }
    GRAPHQL

    slug = "a-new-slug"
    link = Link.create(url: "https://example.com", slug: slug)
    response = MySmolUrlSchema.execute(query_string, variables: {
      slug: slug
    })

    assert_equal link.id, response.dig("data", "retrieveLink", "id")
  end

  test "retrieveLinksWithConnection query should retrieve paginate links" do
    query_string = <<~GRAPHQL
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

    Link.create(url: "https://example.com", slug: "a-new-slug")
    response = MySmolUrlSchema.execute(query_string)

    assert response.dig("data", "retrieveLinksWithConnection").key?("pageInfo")
    assert response.dig("data", "retrieveLinksWithConnection").key?("nodes")
  end
end
