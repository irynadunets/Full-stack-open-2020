import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.addVote(anecdote.id)
    props.setNotification(`You voted '${anecdote.content}'`, 10)
  }

  return (
    <ul>
    {props.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
      .includes(props.filter.toLowerCase())).map(anecdote =>
  <li key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </li>
)}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.sort((a, b) => a.votes - b.votes).flat(),
    filter: state.filter.text||''
  }
}


const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
