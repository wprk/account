import React from 'react'

import Navbar from '../components/Navbar'
import HeroImg from '../images/register-hero.jpg'
import RegisterForm from '../components/Form/RegisterForm'

const UserRegistration = () => {
  return (
    <div>
      <Navbar />
      <div className="relative bg-white">
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full hidden sm:object-cover sm:object-bottom md:block md:object-cover md:object-right lg:absolute lg:h-full bg-bottom" src={HeroImg} alt="" />
          </div>
        </div>
        <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
          <div className="lg:pr-8">
            <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
              <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
                Register for an account
              </h2>
              <p className="mt-4 text-lg leading-7 text-gray-500 sm:mt-3">
                
              </p>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration
