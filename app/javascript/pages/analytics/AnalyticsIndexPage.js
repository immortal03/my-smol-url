import React from "react"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import LinkIndexTable from "./LinkIndexTable"

const AnalyticsIndexPage = () => {
  const PageTitle = usePageTitle("Analytics - My Smol URL")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto max-w-7xl px-2 sm:px-8">
        <div className="sm:gap-4 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-12 w-full">
            <div className="w-full sm:items-center md:mx-auto lg:col-span-12 lg:flex lg:text-left">
              <h1 className="font-source-sans text-3xl font-bold tracking-tight text-white sm:leading-none lg:text-4xl xl:text-5xl">
                <span>Smolified Links</span>
              </h1>
            </div>
          </div>

          <div className="sm:mt-18 mt-10 divide-y rounded-lg bg-white shadow lg:col-span-12 lg:mt-0">
            <LinkIndexTable />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AnalyticsIndexPage
