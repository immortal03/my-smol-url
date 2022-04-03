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

const RetrieveChartClicksByDays = gql`
  query RetrieveChartClicksByDays($slug: String!, $days: Int) {
    retrieveChartClicksByDays(slug: $slug, days: $days)
  }
`

const RetrieveClickEventsWithConnection = gql`
  query RetrieveClickEventsWithConnection(
    $linkId: String!
    $first: Int = 30
    $after: String
  ) {
    retrieveClickEventsWithConnection(
      linkId: $linkId
      first: $first
      after: $after
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
      nodes {
        id
        ipAddress
        city
        region
        country
        device
        browser
        eventAt
      }
    }
  }
`

export {
  SmolifyUrl,
  RetrieveLinksWithConnection,
  RetrieveLink,
  RetrieveChartClicksByDays,
  RetrieveClickEventsWithConnection,
}
