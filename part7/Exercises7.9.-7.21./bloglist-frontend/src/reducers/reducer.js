import blogService from '../services/blogs'
import userService from '../services/users'
import { combineReducers } from 'redux'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return [...state, action.data]
  default:
    return state
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return [...state, action.data]
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer
})


export default reducer
