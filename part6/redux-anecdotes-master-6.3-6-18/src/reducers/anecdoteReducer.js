import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
      case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return [...state, action.data]
      case 'ADD_VOTE':
        const id = action.data.id
        const anecdoteToChange = state.flat().find(n => n.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        return state.flat().map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
      default:
        return state
    }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

  export const addVote = (id) => {
    return async dispatch => {      
      const newAnecdote = await anecdoteService.addVote(id)
      dispatch({
        type: 'ADD_VOTE',
        data: { id }
      })
  }
}

  export const initializeAnecdotes = () => {
    return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
