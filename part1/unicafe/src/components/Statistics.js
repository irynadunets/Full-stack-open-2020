import React from 'react'
import Statistic from './Statistic'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good+neutral+bad} />
        <Statistic text="average" value={((good + neutral + bad)/3).toFixed(1)} />
        <Statistic text="positive" value={(good * 100/(good + neutral + bad)).toFixed(1) + '%'} />
      </tbody>
    </table>
    </div>
  )
}

export default Statistics
