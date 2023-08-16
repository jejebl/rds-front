import React from 'react'
import './Sell.css';
import { useState, useEffect } from "react";
import { LuMoveVertical } from "react-icons/lu";
import { IconContext } from "react-icons";
import RWAR from "../RWAR.json";
import tokenerc20 from "../tokenerc20.json";
import Popup from "./Popup";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';


const Sell = () => {
  const [formParams, updateFormParams] = useState({ stablecoin: '', dfl: ''});
  const [dflTokens, updatedflTokens] = useState(0);
  const [price, updatePrice] = useState(0);
  const [stableCoin, updatedStableCoin] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [alert, updateAlert] = useState(false);
  
  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
    try {

      const readPrice1 = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'price',
      })
      const readPrice = ethers.utils.formatEther(readPrice1, 18);
      updatePrice(readPrice);

      const readBalanceOfMyDflTokens = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [address],
      })
      const balanceOfMyDflTokens = ethers.utils.formatEther(readBalanceOfMyDflTokens, 18);
      updatedflTokens(balanceOfMyDflTokens);

      const readBalanceOfUSDT = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [address],
      })
      const balanceOfUSDT = ethers.utils.formatEther(readBalanceOfUSDT, 18);
      updatedStableCoin(balanceOfUSDT);

      updateData(true);
    } catch (error) {
      
    }
  }

  async function sell() {
    if(formParams.stablecoin!== '' && formParams.dfl!=='')
    try {
      updateLoading(true);
      updatePopup(true);

      const { request: config } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'sell',
        args: [ethers.utils.parseUnits(formParams.dfl)],
      });
      const { hash: approveSell } = await writeContract(config)

      const dataSell = await waitForTransaction({
        hash: approveSell
      })
      console.log(dataSell.status)

      updateLoading(false);

    } catch (error) {
      //alert("You don't have enough stable coins or you don't approve enough stable coins to be used!");
      updateAlert(true);
      console.log("ERROR: " + error)
    }
  }
  
  useEffect(() => {
    getData();
  }, )

  return (
    <div className='sell_container'>
      <div className='sell_description_container'>
        <p className='sell_name'>RWAR Tokens</p>
        <div className='sell_description'>
          {data ?
            <div className='sell_info_container'>
              <div className='sell_description_line'>
                <p className='sell_info_title'>1 RWAR</p>
                <p className='sell_info_number'>{price} USDT</p>
              </div>
              <div className='sell_description_line'>
                <p className='sell_info_title'>My RWAR</p>
                <p className='sell_info_number'>{dflTokens}</p>
              </div>
              <div className='sell_description_line'>
                <p className='sell_info_title'>My USDT</p>
                <p className='sell_info_number'>{stableCoin}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
        </div>
      </div>

      <div className='sell_form_container'>

        <div className='sell_exchange_container'>
          <div className='sell_input_container'>
            <input className="sell_input" id="dfl" type="number" placeholder="Number of tokens" value={formParams.dfl} onChange={e => updateFormParams({...formParams, dfl: e.target.value, stablecoin: (e.target.valueAsNumber*price).toString() })}></input>
            <p>RWAR</p>
          </div>
          <IconContext.Provider value={{ className: "sell_arrows_icon" }}>
            <LuMoveVertical />
          </IconContext.Provider>
          <div className='sell_input_container'>
            <input className="sell_input" id="stablecoin" type="number" placeholder="Price in USDT" value={formParams.stablecoin} onChange={e => updateFormParams({...formParams, stablecoin: e.target.value, dfl: (e.target.valueAsNumber/price).toString() })}></input>
            <p>USDT</p>
          </div>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={formParams.dfl +' RWAR Tokens!'} action='sold' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="sell_button_exchange" onClick={() => sell()}>
            Sell
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You don't have enough RWAR tokens!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Sell
