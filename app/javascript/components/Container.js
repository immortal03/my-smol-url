import React from "react"
import PropTypes from "prop-types"

const Container = ({ children }) => {
  return (
    <main className="relative mx-auto mt-10 h-full w-full px-2 sm:mt-20 sm:w-3/4 sm:max-w-5xl sm:px-0">
      {children}
    </main>
  )
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
