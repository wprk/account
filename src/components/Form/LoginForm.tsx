import React from 'react'
import { Form, Formik, FormikProps } from 'formik'

import Button from '../Button'
import MyTextField from './MyTextInput'
import MyCheckbox from './MyCheckbox'
import MyFormError from './MyFormError'

interface IProps {
  authError: string | null,
  onSubmit: (
    email: string,
    password: string,
    remember: boolean
  ) => void
}

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

const LoginForm = ({ authError, onSubmit }: IProps) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      remember: false,
    }}
    onSubmit={(values: LoginFormValues) => {
      onSubmit(values.email, values.password, values.remember)
    }}
  >
    {(props: FormikProps<LoginFormValues>) => (
      <Form>
        {authError && (
          <div className="mb-4">
            <MyFormError id="auth-error" error={authError} />
          </div>
        )}
        
        <div>
          <MyTextField
            label="Email address"
            name="email"
            required
            type="email"
          />
        </div>

        <div className="mt-6">
          <MyTextField
            label="Password"
            name="password"
            required
            type="password"
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <MyCheckbox name="remember">
            <span>Remember me</span>
          </MyCheckbox>

          <div className="text-sm leading-5">
            {/* <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Forgot your password?
            </Link> */}
          </div>
        </div>

        <div className="mt-6">
          <Button
            action="primary"
            text="Sign in"
            type="submit"
            width="full"
          />
        </div>
      </Form>
    )}
  </Formik>
)

export default LoginForm
