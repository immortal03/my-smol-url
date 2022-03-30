import React from "react"
import PropTypes from "prop-types"

const Container = ({ children }) => {
  return (
    <main className="relative mx-auto mt-16 w-full px-6 sm:mt-24 sm:w-4/5 lg:px-0">
      {children}
    </main>
  )
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
