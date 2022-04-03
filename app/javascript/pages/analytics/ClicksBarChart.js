import React, { useState } from "react"
import PropTypes from "prop-types"
import { useLazyQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import Button from "../../components/Button"
import useBarChart from "../../hooks/useBarChart"
import { formatDateTime } from "../../utils/date-helper"
import { RetrieveChartClicksByDays } from "../../graphql/queries"

const DAY_OPTIONS = [14, 30, 60]

const ClicksBarChart = ({ linkData }) => {
  const { slug } = useParams()
  const [chartDays, setChartDays] = useState(30)
  const [BarChart, updateChartData] = useBarChart()
  const [retrieveChartClicksByDay] = useLazyQuery(RetrieveChartClicksByDays)

  const handleChartUpdate = (days) => {
    if (chartDays === days) return

    retrieveChartClicksByDay({ variables: { slug, days } }).then(({ data }) => {
      const { labels, data: chartData } = data.retrieveChartClicksByDays
      setChartDays(days)
      updateChartData(labels, chartData)
    })
  }

  return (
    <div className="relative px-6 py-4">
      <div className="mb-8 flex flex-col items-baseline justify-between sm:mb-14 md:flex-row md:items-center">
        <h3 className="text-lg font-medium text-gray-800">
          <span className="font-source-sans">Link clicks timeline</span>
          <span className="block text-xs text-gray-400">
            Last updated {formatDateTime(linkData.updatedAt) || "-"}
          </span>
        </h3>

        <div className="mt-4 flex items-baseline gap-2 md:mt-0">
          {DAY_OPTIONS.map((days) => (
            <Button
              key={days}
              color={chartDays === days ? "primary" : "secondary"}
              size="small"
              onClick={() => handleChartUpdate(days)}
            >
              Last {days} days
            </Button>
          ))}
        </div>
      </div>

      <div className="flex h-48 items-center justify-center sm:h-60">
        {linkData?.visualData?.linkClicks?.labels?.length > 0 ? (
          <BarChart data={linkData.visualData.linkClicks} />
        ) : (
          <span className="text-gray-400">No data available.</span>
        )}
      </div>
    </div>
  )
}

ClicksBarChart.propTypes = {
  linkData: PropTypes.object.isRequired,
}

export default ClicksBarChart
