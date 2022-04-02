class Mutations::Link::CreateLink < Mutations::BaseMutation
  argument :url, String, required: true
  argument :custom_slug, String, required: false

  field :message, GraphQL::Types::JSON, null: false
  field :link, Link::LinkType, null: true

  def resolve(url:, custom_slug: nil)
    link = Link.new(url: url, custom_slug: custom_slug)
    link.assign_slug

    {}.tap do |response|
      if link.save
        ScrapeAndRecordPageTitleJob.perform_later(link_id: link.id)

        response[:message] = {
          type: "success",
          title: "Your link has been smolified and copied to the clipboard 🙌"
        }
        response[:link] = link
      else
        response[:message] = {
          type: "error",
          title: "Failed to smolify your URL 😭",
          description: link.errors.full_messages
        }
      end
    end
  end
end
