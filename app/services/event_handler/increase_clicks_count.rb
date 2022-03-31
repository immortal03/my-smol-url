class EventHandler::IncreaseClicksCount < ApplicationService
  attr_reader :link_id, :count

  def initialize(link_id:, count: 1)
    raise ArgumentError unless link_id.present? && count.is_a?(Integer)

    @link_id = link_id
    @count = count
  end

  def call
    link = Link.find_by(id: @link_id)
    return false unless link

    link.with_lock do
      link.clicks_count += @count
      link.save!
    end
  end
end
