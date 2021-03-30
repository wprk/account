import React from 'react'
import classNames from 'classnames'
import InitialsAvatar from 'react-avatar'

type size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

interface IProps {
  className?: string
  name?: string
  photo?: string
  size?: size
}

const Avatar = ({ className = '', name = '', photo = '', size = 'medium' }: IProps) => {
  const getSizeAsRem = (size: size) => {
    switch(size) {
      case 'xsmall':
        return '1rem';
      case 'small':
        return '1.5rem';
      case 'medium':
        return '2rem';
      case 'large':
        return '2.25rem';
      case 'xlarge':
        return '3rem';
    }
  }

  return (
    <div>
      {photo && (
        <img
          alt={`${name} Logo`}
          className={classNames([
            'inline-block rounded-full',
            {'h-4 w-4': size === 'xsmall'},
            {'h-6 w-6': size === 'small'},
            {'h8 w-8': size === 'medium'},
            {'h-9 w-9': size === 'large'},
            {'h-12 w-12': size === 'xlarge'},
            {[className]: className.length > 0 },
          ])}
          src={photo}
        />
      )}
      {!photo && (
        // tslint:disable-next-line
        <InitialsAvatar
          alt={`${name} Logo`}
          className="rounded-full"
          color="#e5edff"
          fgColor="#5850ec"
          name={name}
          size={`${getSizeAsRem(size)}`}
          textSizeRatio={2.2}
        />
      )}
    </div>
  )
}

export default Avatar
