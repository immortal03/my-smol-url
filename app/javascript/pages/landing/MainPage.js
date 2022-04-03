import React from "react"
import SmolifyForm from "./SmolifyForm"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import BackgroundPattern1 from "../../components/patterns/BackgroundPattern1"
import BackgroundPattern2 from "../../components/patterns/BackgroundPattern2"
import Card from "../../components/Card"

const MainPage = () => {
  const { PageTitle } = usePageTitle(
    "SmolURL - Shorten your URLs & Track Click Events!"
  )

  return (
    <Container>
      <PageTitle />

      <BackgroundPattern1 />
      <BackgroundPattern2 />

      <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        <div className="col-span-12 mx-auto text-center">
          <h1 className="font-source-sans max-w-md text-4xl font-extrabold tracking-tight text-slate-800 sm:leading-none lg:text-5xl xl:max-w-xl xl:text-6xl">
            Shorten <span className="text-3xl lg:text-4xl xl:text-5xl">🔗</span>
            , share and easily track clicks!
          </h1>
        </div>

        <div className="col-span-12 mt-2 sm:mt-4">
          <Card className="mx-auto max-w-md lg:max-w-lg">
            <SmolifyForm />
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default MainPage
