class LandingController < ApplicationController
  before_action :render_redirect, only: :redirector

  def index
  end

  def redirector
    link = Link.find_by(slug: params[:slug])

    if link
      # Process click event using background job to allow immediate redirection for user
      # Click event processing involves API calls to retrieve geolocation data (synchronous flow)
      # and will end up making user wait for a few seconds to get redirected
      RecordLinkClickEventJob.perform_later(
        link_id: link.id,
        ip: Rails.env.production? ? request.ip : Faker::Internet.ip_v4_address,
        user_agent: Rails.env.production? ? request.user_agent : Faker::Internet.user_agent,
        event_at: Time.zone.now
      )

      redirect_to(link.url, allow_other_host: true)
    else
      render :index, status: :not_found
    end
  end

  private

  def render_redirect
    render :index if request.path.include?("analytics")
  end
end
