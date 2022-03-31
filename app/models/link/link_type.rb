class Link::LinkType < Types::BaseObject
  field :id, ID, null: false
  field :url, String, null: false
  field :slug, String, null: false
  field :page_title, String, null: true
  field :clicks_count, Integer, null: false

  field :smol_url, String, null: true
  field :smol_url_display, String, null: true

  field :statistics_data, GraphQL::Types::JSON, null: false
  field :visual_data, GraphQL::Types::JSON, null: false

  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

  def visual_data
    object.visual_data.deep_transform_keys { |key, _| key.to_s.camelcase(:lower) }
  end
end
