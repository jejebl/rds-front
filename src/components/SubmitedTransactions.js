import React from 'react'
import './SubmitedTransactions.css';

const SubmitedTransactions = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='mintForTeam' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited SC DFL: {data.data.name + ' 500 000'}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='mint' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited SC DFL: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='burn' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited SC DFL: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18)}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='withdraw' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited SC DFL: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' (' + data.data.addr + ')' + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransaction(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='renounceOwnership' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited SC DFL: {data.data.name + ' to: ' + data.data.destination}</p>
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
