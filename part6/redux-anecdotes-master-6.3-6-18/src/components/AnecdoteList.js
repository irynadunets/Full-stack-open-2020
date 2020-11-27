import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  let anecdotes = useSelector(state => state.anecdotes)
  let search = useSelector(state => state.filter)
  let text = search.text || ''
  anecdotes = anecdotes.sort((a, b) => a.votes - b.votes).flat()

   const vote = (id, content) => {
     dispatch(addVote(id))
     dispatch(setNotification(`you voted '${content}'`, 10))
   }

  return (
    <ul>
    {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(text.toLowerCase()))
      .map(anecdote =>
  <li key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </li>
)}
    </ul>
  )
}
export default AnecdoteList
