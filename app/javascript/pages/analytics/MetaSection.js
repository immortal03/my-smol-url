import React, { useState } from "react"
import PropTypes from "prop-types"
import { useLazyQuery } from "@apollo/client"
import { useVirtual } from "react-virtual"
import { uniq } from "lodash"
import MetaChart from "./MetaChart"
import Button from "../../components/Button"
import { RetrieveClickEventsWithConnection } from "../../graphql/queries"
import { formatDateTime } from "../../utils/date-helper"
import { ChartPieIcon, TableIcon } from "@heroicons/react/solid"
import classNames from "classnames"

const MetaSection = ({ linkData }) => {
  const [viewType, setViewType] = useState("chart")
  const [clickEvents, setClickEvents] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [retrieveClickEvents, { loading, fetchMore }] = useLazyQuery(
    RetrieveClickEventsWithConnection
  )

  const parentRef = React.useRef()
  const rowVirtualizer = useVirtual({
    size: clickEvents.length,
    parentRef,
    estimateSize: React.useCallback(
      () => (window.innerWidth <= 768 ? 60 : 40),
      [window.innerWidth]
    ),
    overscan: 30,
  })

  const displayLocation = ({ city, region, country }) => {
    return uniq([city, region, country])
      .filter((i) => !!i)
      .join(", ")
  }

  const handleScroll = ({ currentTarget }) => {
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight &&
      pageInfo.hasNextPage
    ) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      }).then(({ data }) => {
        setPageInfo(data.retrieveClickEventsWithConnection.pageInfo)
        setClickEvents((events) => [
          ...events,
          ...data.retrieveClickEventsWithConnection.nodes,
        ])
      })
    }
  }

  return (
    <div className="col-span-12 divide-y rounded-xl bg-white shadow">
      <div className="flex flex-col items-baseline justify-between gap-2 p-4 lg:flex-row">
        <span>
          Showing clicks from&nbsp;
          <b>
            {formatDateTime(linkData.createdAt, "MMM dd, yyyy")} -{" "}
            {formatDateTime(linkData.updatedAt, "MMM dd, yyyy")}
          </b>
        </span>

        <div className="flex items-center gap-2">
          <Button
            color={viewType === "chart" ? "primary" : "secondary"}
            onClick={() => setViewType("chart")}
            icon={<ChartPieIcon />}
          >
            Chart View
          </Button>

          <Button
            color={viewType === "table" ? "primary" : "secondary"}
            onClick={() => {
              setViewType("table")
              retrieveClickEvents({
                variables: { linkId: linkData.id },
              }).then(({ data }) => {
                setClickEvents(data.retrieveClickEventsWithConnection.nodes)
                setPageInfo(data.retrieveClickEventsWithConnection.pageInfo)
              })
            }}
            icon={<TableIcon />}
          >
            Table View
          </Button>
        </div>
      </div>

      {viewType === "chart" ? (
        <div className="sm-divide-y-0 grid grid-cols-12 divide-x-0">
          {linkData?.visualData &&
            Object.keys(linkData.visualData).map((visualName, index) => {
              if (visualName === "linkClicks") return null

              return (
                <MetaChart
                  key={visualName}
                  data={linkData.visualData[visualName]}
                  className={classNames(
                    index === Object.keys(linkData.visualData).length - 1
                      ? "col-span-12 px-6 py-4 sm:col-span-12"
                      : "border-b md:col-span-6",
                    { ["border-r-0 md:border-r"]: index === 1 }
                  )}
                />
              )
            })}
        </div>
      ) : (
        <div
          ref={parentRef}
          className="w-full divide-y overflow-auto"
          onScroll={handleScroll}
          style={{
            height: clickEvents.length > 0 ? "auto" : "130px",
            maxHeight: "800px",
          }}
        >
          <div className="grid grid-cols-5 divide-x">
            <div className="col-span-5 px-4 py-4 font-medium text-gray-500 md:col-span-1">
              <span className="hidden md:block">🕐 Timestamp</span>
              <span className="block md:hidden">🖱 Click Details</span>
            </div>

            <div className="col-span-2 hidden px-4 py-4 font-medium text-gray-500 md:block">
              🏔 Location
            </div>

            <div className="hidden px-4 py-4 font-medium text-gray-500 md:block">
              📱 Browser
            </div>

            <div className="hidden px-4 py-4 font-medium text-gray-500 md:block">
              💻 Device
            </div>
          </div>

          <div
            className="relative w-full divide-y "
            style={{
              height: `${rowVirtualizer.totalSize}px`,
            }}
          >
            {clickEvents.length > 0 ? (
              rowVirtualizer.virtualItems.map((virtualRow) => {
                const clickEvent = clickEvents[virtualRow.index]
                const { eventAt, city, region, country, device, browser } =
                  clickEvent

                return (
                  <div
                    key={virtualRow.index}
                    className="absolute top-0 left-0 w-full text-sm"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className="text-md flex grid grid-cols-5 flex-row divide-x">
                      <div className="col-span-5 px-3 py-3 md:col-span-1 md:block">
                        <span className="text-gray-500">
                          {formatDateTime(eventAt, "dd/MM/yyyy p")}
                        </span>

                        <div className="mt md:hidden">
                          🏔 {displayLocation({ city, region, country })} · 📱{" "}
                          {browser} · 💻 {device}
                        </div>
                      </div>

                      <div className="col-span-2 hidden px-3 py-3 md:block">
                        {displayLocation({ city, region, country })}
                      </div>

                      <div className="hidden px-3 py-3 md:block">{browser}</div>

                      <div className="hidden px-3 py-3 md:block">{device}</div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="w-full p-6 text-center">
                There are no click events yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

MetaSection.propTypes = {
  linkData: PropTypes.object,
}

export default MetaSection
