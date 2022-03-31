import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"

const Alert = ({ type, title, description, className }) => {
  const StatusIcon =
    type === "success" ? CheckCircleIcon : type === "error" ? XCircleIcon : null

  return (
    <div
      className={classNames(
        "rounded-md py-2 px-4",
        {
          ["bg-green-50"]: type === "success",
          ["bg-red-50"]: type === "error",
        },
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <StatusIcon
            className={classNames("h-5 w-5", {
              ["text-green-400"]: type === "success",
              ["text-red-400"]: type === "error",
            })}
            aria-hidden="true"
          />
        </div>

        <div className="ml-3">
          <h3
            className={classNames("text-sm font-medium", {
              ["text-green-800"]: type === "success",
              ["text-red-800"]: type === "error",
            })}
          >
            {title}
          </h3>

          {description && (
            <div
              className={classNames("mt-1 text-sm", {
                ["text-green-700"]: type === "success",
                ["text-red-700"]: type === "error",
              })}
            >
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : typeof description === "object" ? (
                <ul>
                  {description.map((message, index) => (
                    <li key={`error-${index}`}>{message}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
}

export default Alert
