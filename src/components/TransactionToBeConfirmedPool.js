import React from 'react'
import './TransactionToBeConfirmed.css';

const TransactionToBeConfirmedPool = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='changeOwner1' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' Pool 1 to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='changeOwner2' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' Pool 1 to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='changeRwarWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' Pool 1 to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='changeMarketingWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' Pool 1 to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='sendYield' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='addAffiliateAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}



          </>
          
  )
}

export default TransactionToBeConfirmedPool
