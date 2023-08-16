import React from 'react'
import './TransactionToBeConfirmed.css';

const TransactionToBeConfirmed = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='mint' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
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
              <p>{data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
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

            {data.data.name==='changeOwner1' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' to: ' + data.data.destination}</p>
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

            {data.data.name==='changeOwner2' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' to: ' + data.data.destination}</p>
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

            {data.data.name==='changePrice' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' to: ' + ethers.utils.formatEther(data.data.value, 18)}</p>
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

            {data.data.name==='changeReserveWallet' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' to: ' + data.data.destination}</p>
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

            {data.data.name==='changeSafeUSDTWallet' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' to: ' + data.data.destination}</p>
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

            {data.data.name==='transferUSDT' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'Transfer ' + ethers.utils.formatEther(data.data.value, 18) + ' usdt to: ' + data.data.destination}</p>
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
        
            {data.data.name==='transferRWAR' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'Transfer ' + ethers.utils.formatEther(data.data.value, 18) + ' RWAR tokens to: ' + data.data.destination}</p>
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
