require "test_helper"

class LinksTest < ActiveSupport::TestCase
  def setup
  end

  test "retrieves link by slug" do
    query_string = <<~GRAPHQL
      query($slug: String!) {
      retrieveLink(slug: $slug) {
          id
        }
      }
    GRAPHQL

    slug = "a-new-slug"
    link = Link.create(url: "http://google.com", slug: slug)
    response = MySmolUrlSchema.execute(query_string, variables: {
      slug: slug
    })

    assert_equal link.id, response.dig("data", "retrieveLink", "id")
  end
end
