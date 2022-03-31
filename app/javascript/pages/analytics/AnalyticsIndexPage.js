import React from "react"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import LinkIndexTable from "./LinkIndexTable"
import Button from "../../components/Button"
import { LinkIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

const AnalyticsIndexPage = () => {
  const { PageTitle } = usePageTitle("Analytics - My Smol URL")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto">
        <div className="sm:gap-4 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-12 w-full">
            <div className="w-full justify-between sm:items-center md:col-span-12 md:mx-auto md:flex md:text-left">
              <div>
                <h1 className="font-source-sans text-3xl font-bold tracking-tight text-slate-800 sm:leading-none lg:text-4xl xl:text-5xl">
                  <span className="mr-2 text-2xl lg:text-3xl xl:text-4xl">
                    🔗 🤏
                  </span>
                  <span>Smolified Links</span>
                </h1>

                <p className="mt-2">
                  Browse and view analytics of smolified links!
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <Link to="/">
                  <Button icon={<LinkIcon />}>Smolify a URL</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 divide-y rounded-lg bg-white shadow sm:mt-16 lg:col-span-12 lg:mt-0">
            <LinkIndexTable />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AnalyticsIndexPage
