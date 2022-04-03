import React from "react"
import GithubIcon from "../images/GithubIcon"

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="mx-auto mt-8 max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <a href="https://github.com/immortal03/my-smol-url" target="_blank">
            <GithubIcon className="fill-gray-600" width={24} height={24} />
          </a>
        </div>

        <p className="mt-2 text-center text-base text-slate-800">
          {new Date().getFullYear()} Michael Ng.
        </p>
      </div>
    </footer>
  )
}

export default Footer
