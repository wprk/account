import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik'

import { NEWSLETTER_MAILING_LIST } from '../config/index'
import { SUBSCRIBE_TO_EMAILS } from '../data/mutations';
import Loading from './Loading';

const ComingSoonBanner = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [subscribeToEmail] = useMutation(SUBSCRIBE_TO_EMAILS);

  const subscribe = async (email: string): Promise<boolean> => {
    try {
      await subscribeToEmail({ variables: { email, mailingList: NEWSLETTER_MAILING_LIST, subscribed: true }})
      
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  return (
    <div className="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
      <p className="text-base font-medium text-gray-900">
        Sign up to get notified when it’s ready.
      </p>
      {formSubmitted && (
        <h3 className="mt-5 mb-4 max-w-2xl text-lg leading-6 text-gray-600">
          Thanks, you are now subscribed!
        </h3>
      )}
      {!formSubmitted && (
        <Formik
          initialValues={{
            newsletter_email: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await subscribe(values.newsletter_email)
            setFormSubmitted(true);
            setSubmitting(false)
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (            
            <form className="mt-3 sm:flex" onSubmit={handleSubmit}>
              <input
                aria-label="Email address"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1"                  id="newsletter_email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                required
                value={values.newsletter_email}
              />
              <button type="submit" className="mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                {!isSubmitting && (
                  <span>Notify me</span>
                )}
                {isSubmitting && (
                  <div className="mt-1">
                    <Loading size={10} />
                  </div>
                )}
              </button>
            </form>
          )}
        </Formik>
      )}
      <p className="mt-3 text-sm leading-5 text-gray-500">
        We care about the protection of your data. Read our <Link to="/faq" className="font-medium text-gray-900 underline">privacy policy</Link>.
      </p>
    </div>
  )
}

export default ComingSoonBanner
