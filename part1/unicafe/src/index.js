import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGoodValue = newValue => {
    setGood(newValue)
  }
  const setToNeutralValue = newValue => {
    setNeutral(newValue)
  }
  const setToBadValue = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <Header />
      <Button handleClick={() => setToGoodValue(good + 1)} text="good" />
      <Button handleClick={() => setToNeutralValue(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBadValue(bad + 1)} text="bad" />
      {good > 0 || neutral > 0 || bad > 0
        ?   <Statistics good = {good} neutral = {neutral} bad = {bad} />
        :   <p> No feedback given </p>
      }

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
