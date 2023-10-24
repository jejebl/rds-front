import React from 'react'
import './TransactionToBeConfirmed.css';

const TransactionToBeConfirmedPool1 = (data) => {
  
  const ethers = require("ethers");
  return (
          <>

            {data.data.name==='changeSafeRDSWalletAddress' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' Pool 1 to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool1(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool1(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='sendYield' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{data.data.name + ' '  + ethers.utils.formatEther(data.data.value, 18) + ' RDS to Pool 1 : ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool1(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool1(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='withdraw' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'Pool 1 ' + data.data.name + ' ' + ethers.utils.formatEther(data.data.value, 18) + ' (' + data.data.addr + ')' + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool1(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool1(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

            {data.data.name==='renounceOwnership' && !data.data.executed && !data.data.deleted ? 
            <>
            <div className='confirmed_info'>
              <p>{'Pool 1 ' + data.data.name + ' to: ' + data.data.destination}</p>
            </div>
            <div className='confirmed_button_container'>
              <button className="confirmed_button" onClick={() => data.confirmTransactionPool1(data.data.id)}>
                Confirm
              </button>
              <button className="confirmed_button" onClick={() => data.deleteTransactionPool1(data.data.id)}>
                Delete
              </button>
            </div>
            </>
            :''}

          </>
          
  )
}

export default TransactionToBeConfirmedPool1
