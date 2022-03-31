module Types
  class MutationType < Types::BaseObject
    field :create_link, mutation: Mutations::Link::CreateLink
  end
end
