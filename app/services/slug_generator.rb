class SlugGenerator < ApplicationService
  attr_reader :length

  def initialize(length: 10)
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

    # https://apidock.com/ruby/SecureRandom/urlsafe_base64/class
    # SecureRandom.urlsafe_base64 defaulted to 16 bytes length
    # Number of elements available a-z, A-Z, 0-9, -, _
    # Number of combinations using 8 characters 10,639,125,640
    # Number of combinations using 10 characters 621,324,937,376
    SecureRandom.urlsafe_base64.first(count)
  end
end
