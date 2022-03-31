import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const Button = ({
  type = "button",
  className,
  onClick = () => {},
  children,
  fullWidth = false,
  color = "primary",
  loading = false,
  loadingText = "Loading...",
  icon,
}) => {
  const defaultStyles =
    "flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
  const colorStyles = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    secondary:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 focus:ring-orange-500",
    tertiary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    success:
      "bg-emerald-500 text-emerald-700 hover:bg-emerald-600 focus:ring-emerald-500",
    danger: "bg-red-500 text-red-700 hover:bg-red-600 focus:ring-red-500",
    warning:
      "bg-orange-500 text-orange-700 hover:bg-orange-600 focus:ring-orange-500",
  }

  return (
    <button
      type={type}
      className={classNames(
        defaultStyles,
        colorStyles[color],
        {
          "w-full": fullWidth,
        },
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-1 block h-5 w-5">{icon}</span>}
      {loading ? loadingText : children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.node,
}

export default Button
