import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const [showing, setShowing] = useState(false);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notification)

  useEffect(() => {
    let setTimeout = window.setTimeout || global.setTimeout
      if(notification!==''){
        setShowing(true);
      }
    let timer = setTimeout(() => {
      setShowing(false);
    }, 5000);
  }, [notification]);

  return (
    <div>
    { showing ?
      <div style={style}>
        {notification.content}
      </div>
      : null
    }
   </div>
  )
}

export default Notification
