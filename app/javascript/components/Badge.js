import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const Badge = ({ children, color = "primary", size = "normal" }) => {
  const colorClass =
    color === "primary"
      ? "bg-blue-50 text-blue-500"
      : color === "secondary"
      ? "bg-orange-50 text-orange-500"
      : color === "tertiary"
      ? "bg-slate-200 text-slate-700"
      : color === "blue"
      ? "bg-blue-200 text-blue-500"
      : null

  const sizeClass =
    size === "normal"
      ? "px-2.5 py-1 text-sm"
      : size === "large"
      ? "px-4 py-2 text-md"
      : size === "small"
      ? "px-1 py-0.5 text-xs"
      : null

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md font-medium",
        colorClass,
        sizeClass
      )}
    >
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Badge
