require "test_helper"

class LinkMutationsTest < ActiveSupport::TestCase
  def setup
    @create_link_query = <<~GRAPHQL
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
  end

  test "createLink mutation should create a new link record" do
    response = MySmolUrlSchema.execute(@create_link_query, variables: {
      url: "https://example.com"
    })

    assert response.dig("data", "createLink", "link", "id").present?
  end

  test "createLink mutation should return error message if invalid url provided" do
    response = MySmolUrlSchema.execute(@create_link_query, variables: {
      url: "zzzhttps://example.com"
    }).deep_transform_keys(&:to_s)

    assert response.dig("data", "createLink", "message", "type") == "error"
  end

  test "createLink mutation should return error message if invalid custom slug provided" do
    response = MySmolUrlSchema.execute(@create_link_query, variables: {
      url: "https://example.com",
      customSlug: "fwefE^%^$^"
    }).deep_transform_keys(&:to_s)

    assert response.dig("data", "createLink", "message", "type") == "error"
  end

  test "createLink mutation should create a new link record with custom slug if provided" do
    custom_slug = "custom-slug"
    response = MySmolUrlSchema.execute(@create_link_query, variables: {
      url: "https://example.com",
      customSlug: custom_slug
    }).deep_transform_keys(&:to_s)

    assert_equal custom_slug, response.dig("data", "createLink", "link", "slug")
  end
end
