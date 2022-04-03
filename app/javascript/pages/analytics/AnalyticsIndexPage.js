import React from "react"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import LinkIndexTable from "./LinkIndexTable"
import Button from "../../components/Button"
import { LinkIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import Card from "../../components/Card"

const AnalyticsIndexPage = () => {
  const { PageTitle } = usePageTitle("Analytics - SmolURL")

  return (
    <Container>
      <PageTitle />

      <div className="grid grid-cols-12">
        <div className="col-span-12 flex flex-col items-baseline justify-between md:flex-row md:items-center">
          <div>
            <h1 className="font-source-sans text-4xl font-bold tracking-tight text-slate-800 sm:leading-none lg:text-4xl xl:text-5xl">
              <span className="mr-2 text-2xl lg:text-3xl xl:text-4xl">
                🔗 🤏
              </span>
              <span>Smolified Links</span>
            </h1>

            <p className="mt-2">
              Browse and view analytics of smolified links!
            </p>
          </div>

          <div className="mt-4 sm:mt-2 md:mt-0">
            <Link to="/">
              <Button icon={<LinkIcon />}>Smolify a URL</Button>
            </Link>
          </div>
        </div>

        <div className="col-span-12 mt-8 lg:mt-10">
          <Card>
            <LinkIndexTable />
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default AnalyticsIndexPage
