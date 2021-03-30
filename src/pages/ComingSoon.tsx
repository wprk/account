import React from 'react'

import Navbar from '../components/Navbar'
import ComingSoonImg from '../images/coming-soon.svg'
import { MARKETING_PATH } from '../config'

const ComingSoon = () => {
  return (
    <div>
      <Navbar />    
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="max-w-screen-sm mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <img src={ComingSoonImg} alt="Page coming soon" />
          <h2 className="mt-8 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Page under construction
            <br />
            Come back soon
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href={`${MARKETING_PATH}`} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
