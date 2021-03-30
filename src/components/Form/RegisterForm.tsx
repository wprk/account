import React from 'react'
import { Formik } from 'formik'

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{
        user: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }}
      validate={values => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your Details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                    First name
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="first_name"
                      onChange={handleChange('user.first_name')}
                      onBlur={handleBlur('user.first_name')}
                      required
                      value={values.user.first_name}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="last_name"
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      onChange={handleChange('user.last_name')}
                      onBlur={handleBlur('user.last_name')}
                      required
                      value={values.user.last_name}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      type="email"
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      onChange={handleChange('user.email')}
                      onBlur={handleBlur('user.email')}
                      required
                      value={values.user.email}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">You should use your work email address</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="password"
                      type="password"
                      onChange={handleChange('user.password')}
                      onBlur={handleBlur('user.password')}
                      required
                      value={values.user.password}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                    Confirm password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="password_confirmation"
                      type="password"
                      onChange={handleChange('user.password_confirmation')}
                      onBlur={handleBlur('user.password_confirmation')}
                      required
                      value={values.user.password_confirmation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="inline-flex rounded-md shadow-sm">
                <button type="button" className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                  Cancel
                </button>
              </span>
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Register
                </button>
              </span>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}
