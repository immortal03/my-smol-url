module Types
  class QueryType < Types::BaseObject
    field :retrieve_links_with_connection, Link::LinkType.connection_type, null: false

    field :retrieve_link, Link::LinkType, null: true do
      argument :slug, String, required: true
    end

    field :retrieve_chart_clicks_by_days, GraphQL::Types::JSON, null: true do
      argument :slug, String, required: true
      argument :days, Integer, required: false
    end

    field :retrieve_click_events_with_connection, ClickEvents::ClickEventType.connection_type, null: false do
      argument :link_id, String, required: true
    end

    def retrieve_links_with_connection
      Link.all.order(created_at: :desc)
    end

    def retrieve_link(slug:)
      Link.find_by(slug: slug)
    end

    def retrieve_chart_clicks_by_days(slug:, days: 30)
      Link.find_by(slug: slug)&.chart_clicks_by_days(days: days)
    end

    def retrieve_click_events_with_connection(link_id:)
      ClickEvent.where(link_id: link_id).order(event_at: :desc)
    end
  end
end
