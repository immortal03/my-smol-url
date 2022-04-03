import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { useParams, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import Badge from "../../components/Badge"
import TargetBlankLink from "../../components/TargetBlankLink"
import usePageTitle from "../../hooks/usePageTitle"
import { formatDateTime } from "../../utils/date-helper"
import ClicksBarChart from "./ClicksBarChart"
import LogoImg from "../../images/msu_logo.svg"
import { RetrieveLink } from "../../graphql/queries"
import CtaShare from "../landing/CtaShare"
import MetaSection from "./MetaSection"

const LinkAnalyticsPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [linkData, setLinkData] = useState({})
  const { PageTitle, setTitle } = usePageTitle("Analytics - SmolURL")

  useQuery(RetrieveLink, {
    variables: { slug: slug },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ retrieveLink }) => {
      if (!retrieveLink) navigate("/page-missing")

      setTitle(`${retrieveLink?.pageTitle || retrieveLink?.smolUrl} - SmolURL`)
      setLinkData(retrieveLink || {})
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <PageTitle />

      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        <div className="col-span-12">
          <div className="col-span-12 flex w-full sm:items-center md:mx-auto lg:text-left">
            {linkData.pageTitle || linkData.url ? (
              <h1 className="font-source-sans text-3xl font-extrabold tracking-tight text-slate-800 sm:leading-none lg:text-4xl xl:text-5xl">
                <span>{linkData.pageTitle || linkData.url}</span>
              </h1>
            ) : (
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-2 w-full rounded bg-slate-200" />
                <div className="h-2 w-3/4 rounded bg-slate-200" />
                <div className="h-2 w-1/2 rounded bg-slate-200" />
              </div>
            )}
          </div>

          <div className="col-span-12 mt-2 flex w-full flex-col items-baseline justify-between sm:flex-row sm:items-center md:mx-auto">
            <div className="mt-4 w-full">
              {linkData.smolUrl || linkData.smolUrlDisplay ? (
                <div className="flex flex-row flex-col items-center items-baseline justify-between gap-4 lg:flex-row">
                  <Badge color="orange" size="large">
                    <span className="mr-2">
                      <img src={LogoImg} className="w-20" />
                    </span>

                    <TargetBlankLink
                      url={linkData.smolUrl}
                      urlText={linkData.smolUrlDisplay}
                      customLinkClass="text-orange-800 hover:text-orange-900"
                      customIconClass="text-orange-800 h-6 w-6"
                      withCopyIcon
                    />
                  </Badge>

                  <CtaShare url={linkData.smolUrl} showCopy />
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="h-2 w-1/3 rounded bg-blue-200" />
                  <div className="h-2 w-1/4 rounded bg-blue-200" />
                </div>
              )}

              <div className="mt-3 w-full">
                {linkData.url ? (
                  <div className="flex flex-col items-baseline gap-2 sm:flex-row">
                    <Badge color="tertiary">
                      <span className="mr-2">🔗</span>{" "}
                      <TargetBlankLink
                        url={linkData.url}
                        customLinkClass="text-gray-600 hover:text-gray-800"
                        customIconClass="text-gray-600 hover:text-gray-800 hover:bg-gray-300"
                      />
                    </Badge>

                    <Badge color="tertiary">
                      <span className="mr-2">🕐</span>{" "}
                      {formatDateTime(linkData.createdAt)}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="h-2 w-1/4 rounded bg-slate-200" />
                    <div className="h-2 w-1/4 rounded bg-slate-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-4 divide-y rounded-xl bg-white shadow md:mt-2">
          <dl className="grid grid-cols-1 grid-cols-2 divide-y divide-gray-200 overflow-hidden md:divide-x lg:grid-cols-4 lg:divide-y-0">
            {linkData?.statisticsData &&
              linkData.statisticsData.map((item) => (
                <div key={item.name} className="px-5 py-4">
                  <dt className="text-base font-normal text-gray-800">
                    {item.name}
                  </dt>

                  <dd className="flex items-baseline justify-between md:block lg:flex">
                    <div className="flex flex-col text-lg font-semibold text-gray-800">
                      {item.value}

                      {item.description && (
                        <p className="text-sm font-medium text-gray-400">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </dd>
                </div>
              ))}
          </dl>

          <div className="divide-y sm:overflow-hidden">
            <ClicksBarChart linkData={linkData} />
          </div>
        </div>

        <MetaSection linkData={linkData} />
      </div>
    </Container>
  )
}

export default LinkAnalyticsPage
