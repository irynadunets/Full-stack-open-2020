const initialState = {
    notification: ''
  }

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'SHOW_NOTIFICATION':
      return action.data
      case 'CLEAR_NOTIFICATION':
      return {
      notification: ''
     }
      default:
        return state
    }
  }

export const setNotification = (content) => {
    return {
      type: 'SHOW_NOTIFICATION',
      data: { content }
    }
  }

  export const clearNotification = () => {
      return {
        type: 'CLEAR_NOTIFICATION'
      }
    }

export default notificationReducer
