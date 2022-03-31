import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { RetrieveLinksWithConnection } from "../../graphql/queries"
import { LinkIcon, CursorClickIcon } from "@heroicons/react/outline"
import TargetBlankLink from "../../components/TargetBlankLink"
import Badge from "../../components/Badge"
import Loading from "../../components/loaders/Loading"
import LogoImg from "../../images/msu_logo.svg"
import Button from "../../components/Button"

const LinkIndexTable = () => {
  const [links, setLinks] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const { loading, fetchMore } = useQuery(RetrieveLinksWithConnection, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted: ({ retrieveLinksWithConnection }) => {
      setPageInfo(retrieveLinksWithConnection.pageInfo)
      setLinks([...links, ...retrieveLinksWithConnection.nodes])
    },
  })

  const { hasNextPage, endCursor } = pageInfo

  return (
    <div className="px-4 py-0 sm:px-6 sm:py-2">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-500 sm:pl-6 md:pl-0"
                  >
                    <span className="inline-block h-4 w-4">
                      <LinkIcon />
                    </span>{" "}
                    URL
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-medium text-gray-500"
                  >
                    <img src={LogoImg} className="h-4" />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-medium text-gray-500"
                  >
                    <span className="inline-block h-4 w-4">
                      <CursorClickIcon />
                    </span>{" "}
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {links.length > 0 ? (
                  links.map((link) => {
                    const {
                      id,
                      url,
                      pageTitle,
                      slug,
                      smolUrl,
                      smolUrlDisplay,
                      clicksCount,
                    } = link

                    return (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          <Link to={`/analytics/${slug}`}>
                            <p className="max-w-md truncate">{pageTitle}</p>
                            <p className="max-w-md truncate text-gray-400 underline decoration-dashed">
                              {url}
                            </p>
                          </Link>
                        </td>

                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                          <Badge>
                            <TargetBlankLink
                              url={smolUrl}
                              urlText={smolUrlDisplay}
                              customLinkClass="text-blue-800 hover:text-blue-900"
                              customIconClass="text-slate-800 hover:text-slate-900 hover:bg-slate-300 h-5 w-5"
                              withCopyIcon
                            />
                          </Badge>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {clicksCount}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center">
                      {loading ? (
                        <Loading
                          className="justify-center"
                          text="Loading smolified links..."
                        />
                      ) : (
                        "There are no smolified links yet. Create one now!"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {hasNextPage && (
              <Button
                className="mx-auto my-4"
                color="tertiary"
                onClick={() => {
                  fetchMore({
                    variables: {
                      after: endCursor,
                    },
                  }).then(({ data }) => {
                    setPageInfo(data?.retrieveLinksWithConnection?.pageInfo)
                    setLinks((links) => [
                      ...links,
                      ...data.retrieveLinksWithConnection.nodes,
                    ])
                  })
                }}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkIndexTable
