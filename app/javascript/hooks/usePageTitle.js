import React, { useState } from "react"
import { Helmet } from "react-helmet"

const usePageTitle = (pageTitle = "My Smol URL") => {
  if (!pageTitle) throw new Error("You must provide a page title")

  const [title, setTitle] = useState(pageTitle)

  const PageTitle = () => {
    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    )
  }

  return { PageTitle, setTitle }
}

export default usePageTitle
