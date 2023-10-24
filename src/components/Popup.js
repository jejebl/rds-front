import React from 'react'
import './Popup.css';
import ClipLoader from "react-spinners/ClipLoader";

const Popup = (props) => {
  return (
    <div className='popup'>
      <div className='popup_inner'>
        {!props.loading ?  
          <div className='popup_description'>
            <p>You {props.action} {props.number}</p>
            <button className='popup_button' onClick={() => {
              props.updatePopup(false);

              if(props.updateBoolsendYieldPool1)
              props.updateBoolsendYieldPool1(false);

              if(props.updateBoolSubmitMintForTeam)
              props.updateBoolSubmitMintForTeam(false);

              if(props.updateBoolSubmitBurn)
              props.updateBoolSubmitBurn(false);

              if(props.updateBoolSubmitMint)
              props.updateBoolSubmitMint(false);
            
              if(props.updateBoolSubmitWithdraw)
              props.updateBoolSubmitWithdraw(false);
            
              if(props.updateBoolRenounce)
              props.updateBoolRenounce(false);

              if(props.updateBoolConfirmTransaction)
              props.updateBoolConfirmTransaction(false);

              if(props.updateBoolDeleteTransaction)
              props.updateBoolDeleteTransaction(false);

              if(props.updateBoolConfirmTransactionPool1)
              props.updateBoolConfirmTransactionPool1(false);

              if(props.updateBoolDeleteTransactionPool1)
              props.updateBoolDeleteTransactionPool1(false);

              if(props.updateBoolSubmitChangeSafeRDSWalletAddressPool1)
              props.updateBoolSubmitChangeSafeRDSWalletAddressPool1(false);

              if(props.updateBoolsendYieldPool1)
              props.updateBoolsendYieldPool1(false);
            
              if(props.updateBoolSubmitWithdrawPool1)
              props.updateBoolSubmitWithdrawPool1(false);
              
              if(props.updateBoolRenouncePool1)
              props.updateBoolRenouncePool1(false);

              if(props.updateBoolConfirmTransactionPool2)
              props.updateBoolConfirmTransactionPool2(false);

              if(props.updateBoolDeleteTransactionPool2)
              props.updateBoolDeleteTransactionPool2(false);

              if(props.updateBoolSubmitChangeSafeRDSWalletAddressPool2)
              props.updateBoolSubmitChangeSafeRDSWalletAddressPool2(false);

              if(props.updateBoolsendYieldPool2)
              props.updateBoolsendYieldPool2(false);
            
              if(props.updateBoolSubmitWithdrawPool2)
              props.updateBoolSubmitWithdrawPool2(false);
              
              if(props.updateBoolRenouncePool2)
              props.updateBoolRenouncePool2(false);

              if(props.updateBoolConfirmTransactionPool3)
              props.updateBoolConfirmTransactionPool3(false);

              if(props.updateBoolDeleteTransactionPool3)
              props.updateBoolDeleteTransactionPool3(false);
            
              if(props.updateBoolSubmitChangeSafeRDSWalletAddressPool3)
              props.updateBoolSubmitChangeSafeRDSWalletAddressPool3(false);
            
              if(props.updateBoolsendYieldPool3)
              props.updateBoolsendYieldPool3(false);
            
              if(props.updateBoolSubmitWithdrawPool3)
              props.updateBoolSubmitWithdrawPool3(false);
              
              if(props.updateBoolRenouncePool3)
              props.updateBoolRenouncePool3(false);

              window.location.reload();
              }}>Close</button>
          </div>
          :
          <ClipLoader
          color={'#0074d9'}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        }
      </div>
    </div>
  )
}

export default Popup
