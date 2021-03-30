import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Loading from './Loading'

type IProps = {
  action?: 'primary' | 'secondary' | 'delete' | 'default'
  className?: string
  disabled?: boolean
  link?: boolean
  loading?: boolean
  onClick?: () => void
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  text: string
  to?: string
  type?: 'button' | 'submit'
  width?: 'default' | 'full'
}

const Button = ({
  action = 'default',
  className = '',
  disabled = false,
  link = false,
  loading = false,
  onClick,
  size = 'large',
  text,
  to = '',
  type = 'button',
  width = 'default'
}: IProps) => {
  if ((!onClick && !link && type !== 'submit') || (!onClick && link && !to && type !== 'submit')) {
    console.error('Button missing onClick property or valid link property and to property')
  }

  const containerClasses = classNames([
    {'inline-flex rounded-md shadow-sm': className.length === 0 },
    {'inline-flex items-center': width === 'default'},
    {'inline-flex justify-center w-full': width === 'full'},
    {[className]: className.length > 0 },
  ])

  const classes = classNames([
    'border font-medium focus:outline-none transition ease-in-out duration-150',
    {'px-2.5 py-1.5 text-xs leading-4 rounded': size === 'xsmall'},
    {'px-3 py-2 text-sm leading-4 rounded-md sm:text-xs': size === 'small'},
    {'px-4 py-2 text-sm leading-5 rounded-md sm:text-xs sm:leading-4': size === 'medium'},
    {'px-4 py-2 text-base leading-6 rounded-md sm:text-sm sm:leading-5': size === 'large'},
    {'px-6 py-3 text-base leading-6 rounded-md sm:text-sm sm:leading-5': size === 'xlarge'},
    {'inline-flex items-center': width === 'default'},
    {'inline-flex justify-center w-full': width === 'full'},
    {'text-white bg-indigo-600 border-transparent hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700': action === 'primary'},
    {'text-indigo-700 bg-indigo-100 border-transparent hover:bg-indigo-50 focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200': action === 'secondary'},
    {'text-gray-700 bg-white border-gray-300 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50': action === 'default'},
    {'text-white bg-red-600 border-transparent hover:bg-red-500 focus:outline-none focus:shadow-outline-indigo focus:border-red-700 active:bg-red-700': action === 'delete'},
  ])

  const loadingColor = action === 'default' ? '#d2d6dc' : '#fff'

  return (
    <div className={containerClasses}>
      {link && !onClick && (
        <Link
          className={classes}
          to={to}
        >
          { text }
        </Link>
      )}
      {!link && (
        <button
          className={classes}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {!loading && text}
          {loading && (
            <Loading color={loadingColor} size={14} />
          )}
        </button>
      )}
    </div>
  )
}

export default Button
