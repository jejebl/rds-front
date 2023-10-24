import React from 'react'
import './Popup.css';
import ClipLoader from "react-spinners/ClipLoader";

const PopupUnstack = (props) => {
  return (
    <div className='popup'>
      <div className='popup_inner'>
        {!props.loading ?  
          <div className='popup_description'>
            <p>You recovered {props.unstacked} tokens!</p>
            <button className='popup_button' onClick={() => {
              props.updatePopup(false);
              window.location.reload();
              }}>Close</button>
          </div>
          :
          <ClipLoader
          color={'#0074d9'}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        }
      </div>
    </div>
  )
}

export default PopupUnstack
