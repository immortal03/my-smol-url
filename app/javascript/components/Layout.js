import React from "react"
import PropTypes from "prop-types"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-full flex-col overflow-x-hidden pt-6">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
