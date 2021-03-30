import React from 'react'
import { Formik } from 'formik'
import { STRIPE_PLANS, StripePlanBillingFrequency, StripePlanTier } from '../../config/stripe';

interface IProps {
  planBillingFrequency?: StripePlanBillingFrequency,
  planTier?: StripePlanTier,
}

const TeamRegisterForm = ({
  planBillingFrequency = StripePlanBillingFrequency.MONTHLY,
  planTier = StripePlanTier.STANDARD
}: IProps) => {
  return (
    <Formik
      initialValues={{
        team: {
          name: '',
          logo: '',
        },
        plan: {
          tier: planTier,
          billing_frequency: planBillingFrequency,
        },
        user: {
          default_payment_method_id: '',
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
                  Company Details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                    Name
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="name"
                      type="name"
                      onChange={handleChange('company.name')}
                      onBlur={handleBlur('company.name')}
                      required
                      value={values.team.name}
                    />
                  </div>
                </div>

                {/* @TODO - Add company logo */}
                {/* <div className="sm:col-span-6">
                  <label htmlFor="photo" className="block text-sm leading-5 font-medium text-gray-700">
                    Logo
                  </label>
                  <div className="mt-2 flex items-center">
                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <span className="ml-5 rounded-md shadow-sm">
                      <button type="button" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        Change
                      </button>
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Plan Details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Select the plan that best suits your needs. You can upgrade or downgrade later and every plan comes with a 14 day free trial.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                {/* @TODO - Update UI for this */}
                <div className="sm:col-span-6">
                  <label htmlFor="plan.tier" className="block text-sm font-medium leading-5 text-gray-700">
                    Your plan
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="plan.tier"
                      onChange={handleChange('plan.tier')}
                      onBlur={handleBlur('plan.tier')}
                      required
                      value={values.plan.tier}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="plan.billing_frequency" className="block text-sm font-medium leading-5 text-gray-700">
                    Your billing frequency
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="plan.billing_frequency"
                      onChange={handleChange('plan.billing_frequency')}
                      onBlur={handleBlur('plan.billing_frequency')}
                      required
                      value={values.plan.billing_frequency}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* @TODO - Add optional payment details here */}
            {/* <div className="mt-8 border-t border-gray-200 pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payment Details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Add a payment method for your subscription. This is optional but entering it now will ensure you maintain access even after your trial has ended.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="user.default_payment_method_id" className="block text-sm font-medium leading-5 text-gray-700">
                    Payment Details
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      id="user.default_payment_method_id"
                      onChange={handleChange('user.default_payment_method_id')}
                      onBlur={handleBlur('user.default_payment_method_id')}
                      required
                      value={values.user.default_payment_method_id}
                    />
                  </div>
                </div>
              </div>
            </div> */}
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
                  Create Team
                </button>
              </span>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default TeamRegisterForm
