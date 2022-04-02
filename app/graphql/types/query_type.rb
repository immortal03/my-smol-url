module Types
  class QueryType < Types::BaseObject
    field :retrieve_links_with_connection, Link::LinkType.connection_type, null: false, connection: true

    field :retrieve_link, Link::LinkType, null: true do
      argument :slug, String, required: true
    end

    field :retrieve_chart_clicks_by_days, GraphQL::Types::JSON, null: true do
      argument :slug, String, required: true
      argument :days, Integer, required: false
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
  end
end
