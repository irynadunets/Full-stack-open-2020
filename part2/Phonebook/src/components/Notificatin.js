import React from 'react'

const Notificatin = ({ message }) => {
  if (message === '') {
    return null
  }
console.log(message)
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

export default Notificatin
