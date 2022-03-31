import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import TargetBlankLink from "../../components/TargetBlankLink"

const SmolDataview = ({ dataState = [] }) => {
  return (
    <div className="mt-4 rounded-md bg-gray-50 p-4">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
        {dataState.map((item) => (
          <DataItem key={item.label} item={item} />
        ))}
      </dl>
    </div>
  )
}

const DataItem = ({ item }) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
      <dd className="mt-1 flex items-center justify-between text-sm text-gray-900">
        {item.external ? (
          <TargetBlankLink url={item.url} urlText={item.urlText || item.url} />
        ) : (
          <Link
            to={item.url}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            {item.urlText || item.url}
          </Link>
        )}
      </dd>
    </div>
  )
}

SmolDataview.propTypes = {
  dataState: PropTypes.array,
}

DataItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default SmolDataview
