import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './components/Button'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [max, setMax] = useState(0)

  const setToSelected = newValue => {
    setSelected(newValue)
  }

  const setToVote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setToMax(copy)
    setPoints(copy)    
  }

  const setToMax = (points) => {
    setMax(Math.max.apply(null,points))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => setToVote(selected)} text="vote" />
      <Button handleClick={() => setToSelected(Math.floor(Math.random() * Math.floor(5)))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[points.indexOf(max)]}</div>
      <p>has {max} votes</p>
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))
