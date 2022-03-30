import React from "react"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import MissingPageImg from "../../images/404.png"

const Redirector = () => {
  const PageTitle = usePageTitle("Smol link not found")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="mt-16 sm:mt-24 lg:col-span-12 lg:mt-0">
            <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-xl">
              <div className="px-2 py-4 sm:px-10">
                <div className="py-8">
                  <div className="text-center">
                    <img
                      src={MissingPageImg}
                      alt="404"
                      className="mx-auto mb-4"
                      style={{ height: "200px" }}
                    />

                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                      404 error
                    </p>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                      Smol link not found.
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                      Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Go back home<span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Redirector
