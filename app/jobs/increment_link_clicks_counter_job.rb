class IncrementLinkClicksCounterJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 3, wait: 5.seconds

  def perform(link_id)
    EventHandler::IncreaseClicksCount.call(link_id: link_id)
  end
end
