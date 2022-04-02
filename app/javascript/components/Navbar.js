import React from "react"
import PropTypes from "prop-types"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import LogoImg from "../images/msu_logo.svg"

const navigation = [
  { name: "Smolify", href: "/" },
  { name: "Analytics", href: "/analytics" },
]

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Popover>
        <nav
          className="relative flex max-w-7xl items-center justify-between"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link to="/">
                <span className="sr-only">My Smol URL</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={LogoImg}
                  alt="My Smol URL logo"
                />
              </Link>

              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>

            <div className="hidden space-x-5 md:ml-10 md:flex">
              <NavLinks />
            </div>
          </div>
        </nav>

        <Transition
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    className="h-8 w-auto"
                    src={LogoImg}
                    alt="My Smol URL logo"
                  />
                </div>

                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="space-y-1 px-2 pt-2 pb-3">
                <NavLinks isMobile />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </NavbarWrapper>
  )
}

const NavbarWrapper = ({ children }) => {
  return (
    <header className="mx-auto h-full w-full px-2 pr-4 sm:w-3/4 sm:max-w-5xl sm:px-0 sm:pr-0">
      {children}
    </header>
  )
}

NavbarWrapper.propTypes = {
  children: PropTypes.node,
}

const NavLinks = ({ isMobile = false }) => {
  const linkClass = isMobile
    ? "block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800"
    : "font-medium text-dark hover:bg-slate-200 p-2 rounded-md"

  return (
    <React.Fragment>
      {navigation.map((item) => (
        <Link
          key={`${item.name}-${isMobile ? "mobile" : "desktop"}`}
          to={item.href}
          className={linkClass}
        >
          {item.name}
        </Link>
      ))}
    </React.Fragment>
  )
}

NavLinks.propTypes = {
  isMobile: PropTypes.bool,
}

export default Navbar
