import React from 'react'


const Button = ({onClick, children, className, type}) => {
  return (
    <button className={className} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button