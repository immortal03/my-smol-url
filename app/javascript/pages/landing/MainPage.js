import React from "react"
import SmolifyForm from "./SmolifyForm"
import Container from "../../components/Container"
import usePageTitle from "../../hooks/usePageTitle"
import LogoImg from "../../images/msu_logo.svg"
import BackgroundPattern1 from "../../components/patterns/BackgroundPattern1"
import BackgroundPattern2 from "../../components/patterns/BackgroundPattern2"

const MainPage = () => {
  const PageTitle = usePageTitle("My Smol URL - Shorten your URL!")

  return (
    <Container>
      <PageTitle />

      <BackgroundPattern1 />
      <BackgroundPattern2 />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 px-4 text-left sm:mx-auto sm:px-6 sm:text-center">
          <div>
            <h1 className="font-source-sans mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
              <span className="md:block">Shorten links using</span>
            </h1>

            <img
              src={LogoImg}
              alt="My Smol URL logo"
              className="mt-2 h-6 sm:mx-auto sm:h-8 md:block"
            />
          </div>
        </div>

        <div className="col-span-12 mt-2 sm:mt-6">
          <div className="rounded-xl bg-white shadow sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden">
            <div className="px-4 py-6 sm:px-6">
              <div className="mt-2">
                <SmolifyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MainPage
