import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const Card = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "w-full rounded-xl bg-white shadow sm:mx-auto sm:overflow-hidden",
        className
      )}
    >
      <div className="px-4 py-6 sm:px-6">{children}</div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Card
