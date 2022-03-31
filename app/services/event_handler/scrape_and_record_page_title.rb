class EventHandler::ScrapeAndRecordPageTitle < ApplicationService
  attr_reader :link_id

  def initialize(link_id:)
    raise ArgumentError if link_id.blank?

    @link_id = link_id
  end

  def call
    link = Link.find_by(id: @link_id)
    return false unless link

    # Scrape and get page title back
    # Handle MetaInspector exceptions
    # https://github.com/metainspector/metainspector#exception-handling
    begin
      page = MetaInspector.new(link.url)
    rescue MetaInspector::RequestError
      return false
    end

    return false if page.response.status != 200

    link.with_lock do
      link.update!(page_title: page.title)
    end
  end
end
