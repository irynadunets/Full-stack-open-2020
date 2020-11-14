import React from 'react'

const Total = ({parts}) => {
  const total = parts.reduce((totall, part) => {
    return totall + part.exercises
}, 0)
  return (
      <h3>Total of {total} exercises </h3>
  )
}

export default Total
