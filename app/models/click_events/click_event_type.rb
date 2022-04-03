class ClickEvents::ClickEventType < Types::BaseObject
  field :id, ID, null: false
  field :country, String, null: true
  field :ip_address, String, null: true
  field :device, String, null: true
  field :browser, String, null: true
  field :event_at, GraphQL::Types::ISO8601DateTime, null: false
end
