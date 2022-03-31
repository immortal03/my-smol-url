require "test_helper"

class LinkMutationsTest < ActiveSupport::TestCase
  test "createLink mutation should create a new link record" do
    mutation_string = <<~GRAPHQL
      mutation($url: String!, $customSlug: String) {
        createLink(url: $url, customSlug: $customSlug) {
          message
          link {
            id
          }
        }
      }
    GRAPHQL

    response = MySmolUrlSchema.execute(mutation_string, variables: {
      url: "https://example.com"
    })

    assert response.dig("data", "createLink", "link", "id").present?
  end

  test "createLink mutation should create a new link record with custom slug if provided" do
    mutation_string = <<~GRAPHQL
      mutation($url: String!, $customSlug: String) {
        createLink(url: $url, customSlug: $customSlug) {
          message
          link {
            id
            slug
          }
        }
      }
    GRAPHQL

    custom_slug = "custom-slug"
    response = MySmolUrlSchema.execute(mutation_string, variables: {
      url: "https://example.com",
      customSlug: custom_slug
    })

    assert_equal custom_slug, response.dig("data", "createLink", "link", "slug")
  end
end
