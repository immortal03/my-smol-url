import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  fullWidth = false,
  color = "primary",
  loading = false,
  loadingText = "Loading...",
}) => {
  const defaultStyles =
    "flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
  const colorStyles = {
    primary:
      "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500",
    secondary:
      "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    // info: "bg-blue-500 text-white",
    // light: "bg-yellow-500 text-white",
    // dark: "bg-yellow-500 text-white",
  }

  return (
    <button
      type={type}
      className={classNames(defaultStyles, colorStyles[color], {
        "w-full": fullWidth,
      })}
      onClick={onClick}
    >
      {loading ? loadingText : children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
}

export default Button
