import React from "react"
import PropTypes from "prop-types"

const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Badge
