module Types
  class QueryType < Types::BaseObject
    field :retrieve_links_with_connection, Link::LinkType.connection_type, null: true, connection: true

    field :retrieve_link, Link::LinkType, null: true do
      argument :slug, String, required: true
    end

    def retrieve_links_with_connection
      Link.all.order(created_at: :desc)
    end

    def retrieve_link(slug:)
      Link.find_by(slug: slug)
    end
  end
end
