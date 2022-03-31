import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import Container from "../../components/Container"
import Badge from "../../components/Badge"
import usePageTitle from "../../hooks/usePageTitle"
import { RetrieveLink } from "../../graphql/queries"
import { formatDateTime } from "../../utils/date-helper"
import TargetBlankLink from "../../components/TargetBlankLink"
import LogoImg from "../../images/msu_logo.svg"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const clicksOption = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: { stepSize: 1 },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}

const pieOptions = {
  cutout: "70%",
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
  },
}

const LinkAnalyticsPage = () => {
  const { slug } = useParams()
  const { PageTitle, setTitle } = usePageTitle("Analytics - My Smol URL")
  const [linkData, setLinkData] = useState({})

  const { loading } = useQuery(RetrieveLink, {
    variables: { slug },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ retrieveLink }) => {
      setTitle(`${retrieveLink.pageTitle} - My Smol URL`)
      setLinkData(retrieveLink)
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) return "Loading..."

  return (
    <Container>
      <PageTitle />

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="col-span-12">
          <div className="w-full sm:items-center md:mx-auto lg:col-span-12 lg:flex lg:text-left">
            <h1 className="font-source-sans text-3xl font-extrabold tracking-tight text-slate-800 sm:leading-none lg:text-4xl xl:text-5xl">
              <span>{linkData.pageTitle || linkData.url}</span>
            </h1>
          </div>

          <div className="col-span-12 mt-2 flex w-full flex-col items-baseline justify-between sm:flex-row sm:items-center md:mx-auto">
            <div className="mt-4">
              <Badge color="blue" size="large">
                <span className="mr-2">
                  <img src={LogoImg} className="w-20" />
                </span>
                <TargetBlankLink
                  url={linkData.smolUrl}
                  urlText={linkData.smolUrlDisplay}
                  customLinkClass="text-blue-800 hover:text-blue-900"
                  customIconClass="text-slate-800 hover:text-slate-900 hover:bg-slate-300 h-5 w-5"
                  withCopyIcon
                />
              </Badge>

              <div className="mt-2 flex flex-col items-baseline gap-2 sm:flex-row">
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
            </div>
          </div>
        </div>

        <div className="sm:mt-18 mt-10 divide-y rounded-xl bg-white shadow lg:col-span-12 lg:mt-0">
          <dl className="grid grid-cols-1 grid-cols-2 divide-y divide-gray-200 overflow-hidden md:divide-x lg:grid-cols-4 lg:divide-y-0">
            {linkData?.statisticsData &&
              linkData.statisticsData.map((item) => (
                <div key={item.name} className="px-5 py-4">
                  <dt className="text-base font-normal text-gray-900">
                    {item.name}
                  </dt>

                  <dd className="flex items-baseline justify-between md:block lg:flex">
                    <div className="flex flex-col text-lg font-semibold text-gray-900">
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
            <div className="relative px-6 py-4">
              <div className="mb-8 sm:mb-14">
                <h3 className="text-lg font-medium text-gray-900">
                  Link clicks by day
                  <span className="block text-xs text-gray-400">
                    Last updated {formatDateTime(linkData.updatedAt)}
                  </span>
                </h3>
              </div>

              <div className="h-48 sm:h-60">
                {linkData?.visualData?.linkClicks && (
                  <Bar
                    type="bar"
                    data={linkData.visualData.linkClicks}
                    options={clicksOption}
                  />
                )}
              </div>
            </div>

            <div className="sm-divide-y-0 grid grid-cols-12 divide-x-0 divide-y sm:divide-x">
              <div className="col-span-12 px-6 py-4 sm:col-span-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Clicks by <span className="font-bold">countries</span>
                  </h3>
                </div>

                <div className="h-48 sm:h-60">
                  {linkData?.visualData?.clicksByCountry && (
                    <Doughnut
                      type="doughnut"
                      data={linkData.visualData.clicksByCountry}
                      options={pieOptions}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-12 px-6 py-4 sm:col-span-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Clicks by <span className="font-bold">devices</span>
                  </h3>
                </div>

                <div className="h-48 sm:h-60">
                  {linkData?.visualData?.clicksByDevice && (
                    <Doughnut
                      type="doughnut"
                      data={linkData.visualData.clicksByDevice}
                      options={pieOptions}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-12 px-6 py-4 sm:col-span-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Clicks by <span className="font-bold">browser</span>
                  </h3>
                </div>

                <div className="h-48 sm:h-60">
                  {linkData?.visualData?.clicksByBrowser && (
                    <Doughnut
                      type="doughnut"
                      data={linkData.visualData.clicksByBrowser}
                      options={pieOptions}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-12 px-6 py-4 sm:col-span-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Clicks by browser
                  </h3>
                </div>

                <div className="h-48 sm:h-60">
                  {linkData?.visualData?.clicksByBrowser && (
                    <Doughnut
                      type="doughnut"
                      data={linkData.visualData.clicksByBrowser}
                      options={pieOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LinkAnalyticsPage
