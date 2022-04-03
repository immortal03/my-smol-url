import React, { useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { useVirtual } from "react-virtual"
import MetaChart from "./MetaChart"
import Button from "../../components/Button"
import { RetrieveClickEventsWithConnection } from "../../graphql/queries"
import Loading from "../../components/loaders/Loading"
import { formatDateTime } from "../../utils/date-helper"

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
    overscan: 5,
  })

  const handleScroll = ({ currentTarget }) => {
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
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
      <div className="flex justify-center gap-2 p-4">
        <Button
          color={viewType === "chart" ? "primary" : "secondary"}
          onClick={() => setViewType("chart")}
        >
          Charts View
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
        >
          Table View
        </Button>
      </div>

      {viewType === "chart" ? (
        <div className="sm-divide-y-0 grid grid-cols-12 divide-x-0 divide-y sm:divide-x">
          {linkData?.visualData &&
            Object.keys(linkData.visualData).map((visualName, index) => {
              if (visualName === "linkClicks") return null

              return (
                <MetaChart
                  key={visualName}
                  data={linkData.visualData[visualName]}
                  className={
                    index === Object.keys(linkData.visualData).length - 1
                      ? "col-span-12 px-6 py-4 sm:col-span-12"
                      : "md:col-span-6"
                  }
                />
              )
            })}
        </div>
      ) : (
        <div
          ref={parentRef}
          className="col-span-12 w-full divide-y overflow-auto"
          onScroll={handleScroll}
          style={{
            height: clickEvents.length > 0 ? "800px" : "150px",
          }}
        >
          <div className="col-span-12 flex flex-row divide-x">
            <div className="col-span-3 flex-1 px-4 py-4 font-medium text-gray-500">
              <span className="hidden md:block">🕐 Timestamp</span>
              <span className="block md:hidden">🖱 Click Details</span>
            </div>
            <div className="col-span-3 hidden flex-1 px-4 py-4 font-medium text-gray-500 md:block">
              🏔 Country
            </div>
            <div className="col-span-3 hidden flex-1 px-4 py-4 font-medium text-gray-500 md:block">
              📱 Browser
            </div>
            <div className="col-span-3 hidden flex-1 px-4 py-4 font-medium text-gray-500 md:block">
              💻 Device
            </div>
          </div>

          <div
            className="relative w-full"
            style={{
              height: `${rowVirtualizer.totalSize}px`,
            }}
          >
            {clickEvents.length > 0 ? (
              rowVirtualizer.virtualItems.map((virtualRow) => {
                const clickEvent = clickEvents[virtualRow.index]

                return (
                  <div
                    key={virtualRow.index}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className="text-md col-span-12 flex flex-row divide-x">
                      <div className="col-span-3 flex-1 px-4 py-3 md:block">
                        <span className="text-gray-500">
                          {formatDateTime(clickEvent.eventAt, "dd/MM/yyyy p")}
                        </span>

                        <div className="md:hidden">
                          {clickEvent.country} | {clickEvent.browser} |{" "}
                          {clickEvent.device}
                        </div>
                      </div>

                      <div className="col-span-3 hidden flex-1 px-4 py-3 md:block">
                        {clickEvent.country}
                      </div>

                      <div className="col-span-3 hidden flex-1 px-4 py-3 md:block">
                        {clickEvent.browser}
                      </div>

                      <div className="col-span-3 hidden flex-1 px-4 py-3 md:block">
                        {clickEvent.device}
                      </div>
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

export default MetaSection
