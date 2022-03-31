import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const Loading = ({ className, text = "Loading..." }) => {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      <Spinner />
      {text}
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
}

const Spinner = () => {
  return (
    <svg
      className="h-5 w-5 animate-spin text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
}

export default Loading
