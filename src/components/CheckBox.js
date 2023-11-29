import React from 'react'
import './CheckBox.css';
import Cookies from 'universal-cookie';
import {
  Link
} from "react-router-dom";

const CheckBox = (props) => {

  let page = props.page;

  const cookies = new Cookies(null, { path: '/' });

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='checkbox'>
      <div className='checkbox_container'>
          <div className='checkbox_description'>
            <p className='checkbox_title'>{page}</p>
            <p className='checkbox_text'>
              By checking this box, you accept the risks, you know what you're doing and you understand what you're staking your tokens in.
            </p>
            <div className='checkbox_linecheck'>
              <input type="checkbox" id="check" checked={checked} onChange={handleChange} />
              <label for="check">
                I understand
              </label>
            </div>

            {checked ? 
              
              <Link to={`/poolPage/${page}`}>
              <button className="checkbox_button" onClick={() => {
                cookies.set(page, page); 
                props.updateCheckbox('');
              }}>
                  Accept
              </button>
              </Link>
            :
              <button className="checkbox_button" onClick={() => {
                props.updateCheckbox('');
              }}>
                Close
              </button>
            }

            
            
          </div>
      </div>
    </div>
  )
}

export default CheckBox
