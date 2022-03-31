import { gql } from "@apollo/client"

const LinkFields = gql`
  fragment LinkFields on Link {
    id
    url
    slug
    pageTitle
    smolUrl
    smolUrlDisplay
    clicksCount
    createdAt
    updatedAt
  }
`

const SmolifyUrl = gql`
  ${LinkFields}
  mutation SmolifyUrl($url: String!, $customSlug: String) {
    createLink(url: $url, customSlug: $customSlug) {
      message
      link {
        ...LinkFields
      }
    }
  }
`

const RetrieveLinksWithConnection = gql`
  ${LinkFields}
  query RetrieveLinksWithConnection($first: Int = 10, $after: String) {
    retrieveLinksWithConnection(first: $first, after: $after) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
      nodes {
        ...LinkFields
      }
    }
  }
`

const RetrieveLink = gql`
  query RetrieveLink($slug: String!) {
    retrieveLink(slug: $slug) {
      id
      url
      slug
      pageTitle
      smolUrl
      smolUrlDisplay
      clicksCount
      createdAt
      updatedAt
      statisticsData
      visualData
    }
  }
`

export { SmolifyUrl, RetrieveLinksWithConnection, RetrieveLink }