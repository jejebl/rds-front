import React from 'react'
import './TransactionToBeConfirmed.css';

const TransactionToBeConfirmed = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='mintForTeam' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'SC DFL ' + data.data.name + ' 500 000'}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransaction(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransaction(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='mint' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'SC DFL ' + data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransaction(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransaction(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='burn' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'SC DFL ' + data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransaction(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransaction(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='withdraw' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'SC DFL ' + data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' (' + data.data.addr + ')' + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransaction(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransaction(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='renounceOwnership' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'SC DFL ' + data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransaction(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransaction(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}
          </>
          
  )
}

export default TransactionToBeConfirmed
