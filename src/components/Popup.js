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
              if(props.updateBoolTransfer)
              props.updateBoolTransfer(false);
              
              if(props.updateBoolTransferDFL)
              props.updateBoolTransferDFL(false);

              if(props.updateBoolsendYield)
              props.updateBoolsendYield(false);

              if(props.updateBoolSubmitMint)
              props.updateBoolSubmitMint(false);

              if(props.updateBoolChangeOwner)
              props.updateBoolChangeOwner(false);

              if(props.updateBoolSubmitBurn)
              props.updateBoolSubmitBurn(false);

              if(props.updateBoolChangePrice)
              props.updateBoolChangePrice(false);

              if(props.updateBoolStableCoinAddress)
              props.updateBoolStableCoinAddress(false);

              if(props.updateBoolConfirmTransaction)
              props.updateBoolConfirmTransaction(false);

              if(props.updateBoolDeleteTransaction)
              props.updateBoolDeleteTransaction(false);
              
              if(props.updateBoolSubmitChangeOwnerAddressPool1)
              props.updateBoolSubmitChangeOwnerAddressPool1(false);

              if(props.updateBoolUsdtAddressPool1)
              props.updateBoolUsdtAddressPool1(false);
              
              if(props.updateBoolTransferUsdtPool1)
              props.updateBoolTransferUsdtPool1(false);

              window.location.reload();
              }}>Close</button>
          </div>
          :
          <ClipLoader
          color={'#F05285'}
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
