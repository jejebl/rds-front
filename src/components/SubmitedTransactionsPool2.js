import React from 'react'
import './SubmitedTransactions.css';

const SubmitedTransactionsPool2 = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='changeSafeRDSWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 2: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool2(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='sendYield' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited Pool 2: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool2(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='withdraw' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 2: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' (' + data.data.addr + ')' + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool2(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='renounceOwnership' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 2: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool2(data.data.id)}>
              Delete
            </button>
            </>
            :''}
          </>
          
  )
}

export default SubmitedTransactionsPool2
