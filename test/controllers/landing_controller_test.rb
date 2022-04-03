require "test_helper"

class LandingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_url
    assert_response :success
  end

  test "should redirect to target url" do
    link = Link.create(url: "https://example.com", slug: "a-valid-slug")
    get "/#{link.slug}"

    assert_response :redirect
  end

  test "should render 404 error if invalid slug provided" do
    Link.create(url: "https://example.com", slug: "a-valid-slug")
    get "/an-invalid-slug"

    assert_response :not_found
  end
end
