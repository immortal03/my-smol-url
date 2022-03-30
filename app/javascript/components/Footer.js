import React from "react"

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <p className="mt-8 text-center text-base text-white">
          {new Date().getFullYear()} Michael Ng.
        </p>
      </div>
    </footer>
  )
}

export default Footer
