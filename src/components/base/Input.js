import React from 'react'

const Input = ({className, type, onChange, name, placeholder, value}) => {
  return (
    <input className={className} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder}/>
  )
}

export default Input