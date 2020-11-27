import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const [showing, setShowing] = useState(false);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    let setTimeout = window.setTimeout || global.setTimeout
      if(props.notification!==''){
        setShowing(true);
      }
    let timer = setTimeout(() => {
      setShowing(false);
    }, 5000);
  }, [props.notification]);

  return (
    <div>
    { showing ?
      <div style={style}>
        {props.notification.content}
      </div>
      : null
    }
   </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
