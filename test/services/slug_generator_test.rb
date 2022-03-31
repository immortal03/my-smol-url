require "test_helper"

class SlugGeneratorTest < ActiveSupport::TestCase
  test "should return a string" do
    assert_equal "String", SlugGenerator.call.class.to_s
  end

  test "default call should return length of 8 chars" do
    assert_equal 8, SlugGenerator.call.length
  end

  test "should accept an Integer as length" do
    assert_raises ArgumentError do
      SlugGenerator.call(length: "8")
    end
  end

  test "should return slug with minimum length of 8 characters" do
    assert SlugGenerator.call(length: 3).length >= 8
  end

  test "should return slug with maximum length of 15 characters" do
    assert SlugGenerator.call(length: 20).length <= 15
  end
end
