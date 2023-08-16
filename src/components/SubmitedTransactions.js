import React from 'react'
import './SubmitedTransactions.css';

const SubmitedTransactions = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='mint' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='burn' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeOwner1' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeOwner2' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changePrice' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited: {data.data.name + ' to: ' + ethers.utils.formatEther(data.data.value, 18)}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeReserveWallet' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeSafeUSDTWallet' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='transferUSDT' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited: {'Transfer ' + ethers.utils.formatEther(data.data.value, 18) + ' usdt to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}
        
            {data.data.name==='transferRWAR' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited: {'Transfer ' + ethers.utils.formatEther(data.data.value, 18) + ' RWAR tokens to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

          </>
          
  )
}

export default SubmitedTransactions
