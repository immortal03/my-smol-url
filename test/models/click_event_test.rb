require "test_helper"

class ClickEventTest < ActiveSupport::TestCase
  test "should not save if no Link is referenced" do
    assert_not ClickEvent.new.save
  end
end
