import React, { useState } from "react"
import classNames from "classnames"
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
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ retrieveLinksWithConnection }) => {
      setPageInfo(retrieveLinksWithConnection.pageInfo)
      setLinks([...retrieveLinksWithConnection.nodes])
    },
  })

  const { hasNextPage, endCursor } = pageInfo

  const THead = ({ children, className }) => {
    return (
      <th
        scope="col"
        className={classNames(
          "py-3.5 px-3 text-left text-sm font-medium text-gray-500",
          className
        )}
      >
        {children}
      </th>
    )
  }

  const TCol = ({ children, className }) => {
    return (
      <td
        className={classNames(
          "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
          className
        )}
      >
        {children}
      </td>
    )
  }

  return (
    <div className="flex flex-col overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <THead className="pl-4 sm:pl-6 md:pl-0" />

            <THead>
              <div className="flex items-center gap-2">
                <span className="inline-block h-4 w-4">
                  <LinkIcon />
                </span>{" "}
                URL
              </div>
            </THead>

            <THead className="hidden lg:table-cell">
              <img src={LogoImg} className="h-4" alt="SmolURL" />
            </THead>

            <THead className="hidden lg:table-cell">
              <div className="flex items-center gap-2">
                <span className="inline-block h-4 w-4">
                  <CursorClickIcon />
                </span>{" "}
                Clicks
              </div>
            </THead>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {links.length > 0 ? (
            links.map((link, index) => {
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
                  <TCol className="font-medium text-gray-800 sm:pl-6 md:pl-0">
                    {index + 1}.
                  </TCol>

                  <TCol className="font-medium text-gray-800">
                    <Link to={`/analytics/${slug}`}>
                      <p className="max-w-sm truncate md:max-w-md">
                        {pageTitle || url}
                      </p>
                      <p className="max-w-sm truncate text-gray-400 underline decoration-dashed md:max-w-md">
                        {url}
                      </p>
                    </Link>

                    <dl className="mt-2 font-normal lg:hidden">
                      <dt className="sr-only">SmolURL</dt>
                      <dd className="mt-1 flex items-center gap-2 truncate">
                        <Badge>
                          <TargetBlankLink
                            url={smolUrl}
                            urlText={smolUrlDisplay}
                            customLinkClass="text-blue-800 hover:text-blue-900"
                            customIconClass="text-blue-800"
                          />
                        </Badge>
                      </dd>
                      <dd className="mt-1 truncate text-gray-500">
                        Clicks: {clicksCount}
                      </dd>
                    </dl>
                  </TCol>

                  <TCol className="hidden lg:table-cell">
                    <Badge>
                      <TargetBlankLink
                        url={smolUrl}
                        urlText={smolUrlDisplay}
                        customLinkClass="text-blue-800 hover:text-blue-900"
                        customIconClass="text-blue-800"
                        withCopyIcon
                      />
                    </Badge>
                  </TCol>

                  <TCol className="hidden lg:table-cell">{clicksCount}</TCol>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center">
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
  )
}

export default LinkIndexTable
