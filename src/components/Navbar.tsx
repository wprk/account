import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom'

import Transition from './Transition'
import FullLogoImg from '../images/logo-light.png'

import { APP_PATH, MARKETING_PATH } from '../config/index'
import { UserContext } from '../providers/UserProvider';
import { AuthContext } from '../providers/AuthProvider';
import Avatar from './Avatar'

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { user } = useContext(UserContext)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-1 items-center">
            <div className="flex-shrink-0">
              <a href={MARKETING_PATH}>
                <img className="h-8 w-auto" src={FullLogoImg} alt="PledgeLedger Logo" />
              </a>
            </div>
            <div className="hidden md:block md:flex-1">
              <div className="flex items-baseline md:justify-between">
                <div className="flex items-baseline">
                  {/*
                    <NavLink to="/how-it-works" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" activeClassName="text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">
                      How it works
                    </NavLink>
                  */}
                </div>
                <div className="flex items-baseline">
                  {!isAuthenticated && (
                    <React.Fragment>
                      <NavLink to="/register" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" activeClassName="text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">
                        Register
                      </NavLink>
                    
                      <NavLink to="/login" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" activeClassName="text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">
                        Login
                      </NavLink>
                    </React.Fragment>
                  )}
                  {isAuthenticated && user && (
                    <a href={APP_PATH} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      Application
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthenticated && user && (
              <div className="ml-1 flex items-center">
                {/* <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button> */}

                <div className="ml-3 relative">
                  <div>
                    <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                      <Avatar size="medium" name={`${user?.first_name} ${user?.last_name}`} photo={user?.avatar_url || ''} />
                    </button>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    show={profileDropdownOpen}
                  >
                    <div className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <Link to="/profile" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                          Profile
                        </Link>
                        <Link to="/logout" className="mt-1 block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                          Logout
                        </Link>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg className={classNames('h-6','w-6', { block: !mobileNavOpen, hidden: mobileNavOpen })} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={classNames('h-6','w-6', { block: mobileNavOpen, hidden: !mobileNavOpen })} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames('md:hidden', { block: mobileNavOpen, hidden: !mobileNavOpen })}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {/* <Link to="/discover" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Discover venues</Link>
          <Link to="/how-it-works" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">How it works</Link> */}
          {!isAuthenticated && (
            <React.Fragment>
              <Link to={`${APP_PATH}/register`} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Register
              </Link>
              <Link to={`${APP_PATH}/login`} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Login
              </Link>
            </React.Fragment>
          )}
        </div>
        {isAuthenticated && user && (
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {/* <img className="h-10 w-10 rounded-full" src={user.picture} alt="" /> */}
                <img className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/a-/AOh14GiKFvCbcWj8YZB05-wSrTF44yWtnXbJBEq50Gh36fE" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{ `${user.first_name} ${user.last_name}` }</div>
                <div className="mt-1 text-sm font-medium leading-none text-gray-400">{ user.email }</div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Profile
              </Link>
              <Link to="/logout" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
