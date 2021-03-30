import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

const NotFound = () => (
  <div>
    <Navbar />
    <div className="h-full min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pt-40 md:pt-20 md:flex md:flex-col md:justify-center">
      <div className="max-w-sm">
        <div className="text-black text-5xl md:text-15xl font-black">404</div>
        <div className="w-16 h-1 bg-purple-light my-3 md:my-6"></div>
        <p className="text-grey-darker text-2xl md:text-3xl font-light mb-8 leading-normal">Sorry, the page you are looking for could not be found.</p>
        <Link to="/" className="bg-transparent text-grey-darkest font-bold uppercase tracking-wide py-3 px-6 border-2 border-grey-light hover:border-grey rounded-lg">Go Home</Link>
      </div>
    </div>
  </div>
)

export default NotFound
