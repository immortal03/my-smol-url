class SlugGenerator < ApplicationService
  attr_reader :length

  def initialize(length: 8)
    raise ArgumentError unless length.is_a?(Integer)

    @length = length
  end

  def call
    # Minimum 8 chars, maximum 15 chars
    count = if @length < 8
      8
    else
      @length > 15 ? 15 : @length
    end

    o = [("a".."z"), ("A".."Z"), (0..9)].map(&:to_a).flatten
    (0...count).map { o[rand(o.length)] }.join
  end
end
