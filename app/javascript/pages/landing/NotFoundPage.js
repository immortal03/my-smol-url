import React from "react"
import { Link } from "react-router-dom"
import Container from "../../components/Container"
import Card from "../../components/Card"
import usePageTitle from "../../hooks/usePageTitle"
import MissingPageImg from "../../images/404.png"

const NotFoundPage = () => {
  const { PageTitle } = usePageTitle("Smol link not found")

  return (
    <Container>
      <PageTitle />

      <div className="mx-auto max-w-md">
        <Card>
          <div className="text-center">
            <img
              src={MissingPageImg}
              alt="404"
              className="mx-auto mb-4 h-40 rounded-lg sm:h-52"
            />

            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              404 error
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              Smol link not found.
            </h1>

            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>

            <Link
              to="/"
              className="mt-6 block text-base font-medium text-orange-600 hover:text-orange-500"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  )
}

export default NotFoundPage
