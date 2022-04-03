import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import useDonutChart from "../../hooks/useDonutChart"

const MetaChart = ({ className, data }) => {
  const DonutChart = useDonutChart()

  return (
    <div className={classNames("col-span-12 px-6 py-4", className)}>
      <div className="mb-6">
        <h3 className="font-source-sans text-lg font-medium text-gray-800">
          {data.name}
        </h3>
      </div>

      <div className="flex h-48 items-center justify-center sm:h-60">
        {data?.labels?.length > 0 ? (
          <DonutChart data={data} />
        ) : (
          <span className="text-gray-400">No data available.</span>
        )}
      </div>
    </div>
  )
}

MetaChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
}

export default MetaChart
