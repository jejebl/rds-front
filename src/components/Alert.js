import React from 'react'
import './Alert.css';

const Alert = (props) => {
  return (
    <div className='alert'>
      <div className='alert_inner'>
        {
          <div className='alert_description'>
            <p>{props.action}</p>
            <button className='alert_button' onClick={() => {
              props.updateLoading(false);
              props.updatePopup(false);
              props.updateAlert(false);
              window.location.reload();
              }}>Close</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Alert
