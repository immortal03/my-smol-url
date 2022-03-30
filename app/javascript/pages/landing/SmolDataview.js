import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { CodeIcon, ExternalLinkIcon } from "@heroicons/react/outline"

const SmolDataview = ({ dataState = [] }) => {
  return (
    <React.Fragment>
      <Divider />

      <div>
        <div className="mb-6">
          <div className="absolute rounded-md bg-orange-500 p-2">
            <CodeIcon className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <h3 className="ml-10 text-lg font-bold">Smolified Details</h3>
        </div>

        <div className="mt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
            {dataState.map((item) => (
              <DataItem
                item={{
                  url: item.url,
                  label: item.label,
                  external: item.external,
                }}
              />
            ))}
          </dl>
        </div>
      </div>
    </React.Fragment>
  )
}

const Divider = () => {
  return (
    <div className="relative mt-6 mb-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>

      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500">Your Smolified URL</span>
      </div>
    </div>
  )
}

const DataItem = ({ item }) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
      <dd className="mt-1 flex items-center justify-between text-sm text-gray-900">
        {item.external ? (
          <a
            href={item.url}
            target="_blank"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            {item.url}
          </a>
        ) : (
          <Link
            to={item.url}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            {item.url}
          </Link>
        )}

        {item.external && (
          <div className="h-4 w-4">
            <a
              href={item.url}
              target="_blank"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              <ExternalLinkIcon />
            </a>
          </div>
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
