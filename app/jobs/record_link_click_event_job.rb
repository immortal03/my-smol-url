class RecordLinkClickEventJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 5, wait: 5.seconds

  def perform(link_id:, ip:, user_agent:, event_at:)
    EventHandler::RecordClickEvent.call(
      link_id: link_id,
      ip: ip,
      user_agent: user_agent,
      event_at: event_at
    ) && IncrementLinkClicksCounterJob.perform_later(link_id)
  end
end
