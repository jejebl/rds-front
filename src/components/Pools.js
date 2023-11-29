import React from 'react'
import './Pools.css';
import CheckBox from './CheckBox.js';
import Cookies from 'universal-cookie';
import {
  Link
} from "react-router-dom";

const Pools = () => {

  const cookies = new Cookies(null, { path: '/' });
  
  const [checkbox, updateCheckbox] = React.useState('');

  return (
    <div className='pools_container'>

      {cookies.get('Pool 1')==="Pool 1" ?

        <div className='pool'>
          <Link to={'/poolPage/Pool 1'}>
          <p className='pools_name'>Pool 1</p>
          <p className='pools_yield'>Yield 8%</p>
          <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
          </Link>
        </div> 

      :

        <div className='pool' onClick={() => {
          updateCheckbox('Pool 1');
        }}>
          <p className='pools_name'>Pool 1</p>
          <p className='pools_yield'>Yield 8%</p>
          <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
        </div> 
        
      }

      {cookies.get('Pool 2')==="Pool 2" ?

      <div className='pool'>
        <Link to={'/poolPage/Pool 2'}>
        <p className='pools_name'>Pool 2</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
        </Link>
      </div> 

      :

      <div className='pool' onClick={() => {
        updateCheckbox('Pool 2');
      }}>
        <p className='pools_name'>Pool 2</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
      </div> 

      }

      {cookies.get('Pool 3')==="Pool 3" ?

      <div className='pool'>
        <Link to={'/poolPage/Pool 3'}>
        <p className='pools_name'>Pool 3</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
        </Link>
      </div> 

      :

      <div className='pool' onClick={() => {
        updateCheckbox('Pool 3');
      }}>
        <p className='pools_name'>Pool 3</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Stake your tokens in this pool to generate around 8% return. This pool is made up of several real-world-asset projects.</p>
      </div> 

      }

      {checkbox==="Pool 1" ?
        <CheckBox page={"Pool 1"} updateCheckbox={updateCheckbox}>
        </CheckBox>
        : checkbox==="Pool 2" ?
        <CheckBox page={"Pool 2"} updateCheckbox={updateCheckbox}>
        </CheckBox>
        : checkbox==="Pool 3" ?
        <CheckBox page={"Pool 3"} updateCheckbox={updateCheckbox}>
        </CheckBox>
        :''
      }
      
    </div>
  )
}

export default Pools
