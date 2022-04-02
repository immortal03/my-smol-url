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
  size = "medium",
  loading = false,
  loadingText = "Loading...",
  icon,
}) => {
  const defaultStyles =
    "flex justify-center rounded-md border border-transparent font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
  const colorStyles = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    secondary:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 focus:ring-orange-500",
    tertiary: "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-300",
    success:
      "bg-emerald-500 text-emerald-700 hover:bg-emerald-600 focus:ring-emerald-500",
    danger: "bg-red-500 text-red-700 hover:bg-red-600 focus:ring-red-500",
    warning:
      "bg-orange-500 text-orange-700 hover:bg-orange-600 focus:ring-orange-500",
    twitter: "bg-sky-400 text-white hover:bg-sky-500 focus:ring-sky-500",
  }
  const sizeStyles = {
    small: "px-2.5 py-1.5 text-xs",
    medium: "py-2 px-4 text-sm",
  }
  const iconSizeStyles = {
    small: "mr-1 block h-4 w-4",
    medium: "mr-1 block h-5 w-5",
  }

  return (
    <button
      type={type}
      className={classNames(
        defaultStyles,
        colorStyles[color],
        sizeStyles[size],
        {
          "w-full": fullWidth,
        },
        className
      )}
      onClick={onClick}
    >
      {icon && <span className={iconSizeStyles[size]}>{icon}</span>}
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
  size: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.node,
}

export default Button
