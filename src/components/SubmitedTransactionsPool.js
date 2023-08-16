import React from 'react'
import './SubmitedTransactions.css';

const SubmitedTransactionsPool = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='changeOwner1' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeOwner2' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeRwarWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='changeMarketingWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='submited_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='sendYield' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}

            {data.data.name==='addAffiliateAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>Transaction submited Pool 1: {data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <button className="deleted_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
              Delete
            </button>
            </>
            :''}



          </>
          
  )
}

export default SubmitedTransactionsPool
