import React, { useEffect ,useState} from 'react';

const Notification = ({notification}) => {
  const [showing, setShowing] = useState(false);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  } 
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
        {notification}
      </div>
      : null
    }
   </div>
  )
}

export default Notification