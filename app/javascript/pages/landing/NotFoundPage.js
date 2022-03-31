import React from "react"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import MissingPageImg from "../../images/404.png"

const NotFoundPage = () => {
  const { PageTitle } = usePageTitle("Smol link not found")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto w-full max-w-md rounded-xl bg-white sm:overflow-hidden">
          <div className="px-2 py-4 sm:py-8 sm:px-10">
            <div className="text-center">
              <img
                src={MissingPageImg}
                alt="404"
                className="mx-auto mb-4 h-40 rounded-lg sm:h-52"
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
    </Container>
  )
}

export default NotFoundPage
