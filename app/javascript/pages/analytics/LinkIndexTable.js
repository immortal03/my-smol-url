import React from "react"
import { Link } from "react-router-dom"

const links = [
  {
    url: "https://www.example.com/",
    pageTitle: "Example of a page title",
    smolUrl: "https://mysmolurl.com/fewfRG4ef",
    tags: ["example", "example tag"],
    clicksCount: Math.random(),
  },
  {
    url: "https://www.example.com/",
    pageTitle: "Example of a page title",
    smolUrl: "https://mysmolurl.com/fewfRG4ef",
    tags: ["example", "example tag"],
    clicksCount: Math.random(),
  },
  {
    url: "https://www.example.com/",
    pageTitle: "Example of a page title",
    smolUrl: "https://mysmolurl.com/fewfRG4ef",
    tags: ["example", "example tag"],
    clicksCount: Math.random(),
  },
]

const LinkIndexTable = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="text-sm text-gray-700">
            Browse and view analytics of smolified links!
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Smolify a URL
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Smol URL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {links.map((link, index) => {
                    const { url, pageTitle, smolUrl, tags, clicksCount } = link

                    return (
                      <tr key={smolUrl}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          <Link to={`/analytics/fejfFEer43`}>
                            {pageTitle}
                            <br />
                            <span className="text-blue-600 hover:text-blue-700 hover:underline">
                              {url}
                            </span>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Link
                            to={`/analytics/fejfFEer43`}
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            {smolUrl}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {tags}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {clicksCount}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkIndexTable
