import React from "react"
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
import usePageTitle from "../../hooks/usePageTitle"
import { ExternalLinkIcon } from "@heroicons/react/outline"
import Badge from "../../components/Badge"

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
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    // title: {
    //   display: true,
    //   text: "Link clicks by day",
    //   color: "#000",
    //   padding: 20,
    //   font: {
    //     size: 20,
    //     family: "Inter",
    //   },
    // },
  },
}

const clicksData = {
  labels: [
    "1/1/2022",
    "2/1/2022",
    "3/1/2022",
    "4/1/2022",
    "5/1/2022",
    "6/1/2022",
    "7/1/2022",
    "8/1/2022",
    "9/1/2022",
  ],
  datasets: [
    {
      label: "Clicks",
      data: [10, 5, 5, 5, 5, 10, 10, 10, 40],
      backgroundColor: "rgba(124, 58, 237, 0.7)",
    },
  ],
}

const stats = [
  {
    name: "Total Clicks",
    stat: "100",
    // previousStat: "70,946",
    // change: "12%",
    // changeType: "increase",
  },
  {
    name: "Top Country",
    stat: "Malaysia",
    previousStat: "200 clicks",
    // change: "2.02%",
    // changeType: "increase",
  },
  {
    name: "Top Device",
    stat: "Apple iPhone",
    previousStat: "300 clicks",
    // change: "4.05%",
    // changeType: "decrease",
  },
]

const locationData = {
  labels: ["Singapore", "Malaysia", "Indonesia", "Thailand"],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(91, 33, 182, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const devicesData = {
  labels: ["iPhone 13", "iPhone 11", "iPhone X", "iPad Pro"],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(91, 33, 182, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const pieOptions = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}

const LinkAnalyticsPage = () => {
  const PageTitle = usePageTitle("Analytics - My Smol URL")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto max-w-7xl px-2 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-12 w-full">
            <div className="w-full sm:items-center md:mx-auto lg:col-span-12 lg:flex lg:text-left">
              <h1 className="font-source-sans text-2xl font-extrabold tracking-tight text-white sm:leading-none lg:text-4xl xl:text-5xl">
                <span>
                  SerpMarker - Rank Tracking & Site Auditing Solutions
                </span>
              </h1>
            </div>

            <div className="col-span-12 mt-2 flex w-full flex-col items-baseline justify-between sm:flex-row sm:items-center md:mx-auto">
              <h2 className="font-source-sans mb-2 flex items-center text-2xl font-extrabold tracking-tight text-white sm:mb-0 sm:justify-between sm:leading-none ">
                <a
                  href="https://www.mysmolurl.com"
                  className="text-yellow-400 underline hover:text-yellow-500"
                  target="_blank"
                >
                  https://www.mysmolurl.com
                </a>

                <a
                  href="https://www.mysmolurl.com"
                  className="ml-2 h-6 w-6 text-yellow-400 hover:text-yellow-500"
                  target="_blank"
                >
                  <ExternalLinkIcon />
                </a>
              </h2>

              <div className="font-source-sans">
                <Badge>Created at: 12/02/2022 3pm</Badge>

                <div className="mt-2 flex gap-x-1">
                  <Badge>Tag1</Badge>
                  <Badge>Tag2</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mt-18 mt-10 divide-y rounded-lg bg-white shadow lg:col-span-12 lg:mt-0">
            <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden  md:grid-cols-3 md:divide-y-0 md:divide-x">
              {stats.map((item) => (
                <div key={item.name} className="px-4 py-5 sm:p-6">
                  <dt className="text-base font-normal text-gray-900">
                    {item.name}
                  </dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold text-indigo-800">
                      {item.stat}

                      {item.previousStat && (
                        <span className="ml-2 text-sm font-medium text-gray-500">
                          from {item.previousStat}
                        </span>
                      )}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="divide-y sm:overflow-hidden ">
              <div className="relative px-4 py-4">
                <div className="mb-6">
                  <h3 className="font-lg text-xl font-semibold">
                    Link clicks by day
                  </h3>

                  <span className="text-xs text-gray-600">
                    Last updated 10/01/2022 3:00pm
                  </span>
                </div>

                <Bar data={clicksData} options={clicksOption} />
              </div>

              <div className="grid grid-cols-12 divide-x">
                <div className="col-span-12 px-4 py-4 sm:col-span-6">
                  <div className="mb-6">
                    <h3 className="font-lg text-xl font-semibold">
                      Clicks by countries
                    </h3>

                    <span className="text-xs text-gray-600">
                      Last updated 10/01/2022 3:00pm
                    </span>
                  </div>

                  <Doughnut data={locationData} options={pieOptions} />
                </div>

                <div className="col-span-12 px-4 py-4 sm:col-span-6">
                  <div className="mb-6">
                    <h3 className="font-lg text-xl font-semibold">
                      Clicks by devices
                    </h3>

                    <span className="text-xs text-gray-600">
                      Last updated 10/01/2022 3:00pm
                    </span>
                  </div>

                  <Doughnut data={devicesData} options={pieOptions} />
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
