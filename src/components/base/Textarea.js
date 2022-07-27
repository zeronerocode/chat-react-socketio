import React from 'react'

const Textarea = ({className,onChange,name, placeholder, value, rows}) => {
  return (
    <textarea 
    className={className} 
    onChange={onChange} 
    name={name}
    rows={rows} 
    value={value} 
    placeholder={placeholder}>
    </textarea>
  )
}

export default Textarea