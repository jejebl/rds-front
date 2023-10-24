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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Integer diam sem, ullamcorper in semper ac, bibendum venenatis nibh. Ut interdum blandit odio ac laoreet. 
              Nunc iaculis odio ac nisl semper mollis. Vivamus at urna eu dolor placerat placerat. 
              Curabitur nibh tortor, semper a faucibus at, dapibus ut erat. In massa lacus, convallis convallis velit ac, hendrerit sagittis metus. 
              Maecenas nec placerat felis. Etiam sed neque sit amet lorem pretium gravida nec a dolor. Ut eu maximus mauris, sit amet venenatis quam. 
              Fusce rhoncus sed orci ut dignissim. Vestibulum faucibus, nibh lacinia aliquet dapibus, lorem erat pretium nisl, in scelerisque ex magna in mauris. 
              Proin interdum quam gravida varius eleifend. Nam eu sem et massa dignissim finibus non varius ante. Nullam sagittis dui non scelerisque dapibus. 
              Praesent viverra at magna sit amet pretium. Nunc condimentum neque nec libero sollicitudin lobortis.
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
