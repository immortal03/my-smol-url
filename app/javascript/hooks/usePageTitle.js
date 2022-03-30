import React from "react"
import { Helmet } from "react-helmet"

const usePageTitle = (pageTitle = "My Smol URL") => {
  if (!pageTitle) throw new Error("You must provide a page title")

  return () => (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  )
}

export default usePageTitle
