import React from 'react';
import './Invest.css';
import { useState, useEffect } from "react";
import { LuMoveVertical } from "react-icons/lu";
import { IconContext } from "react-icons";
import RWAR from "../RWAR.json";
import tokenerc20 from "../tokenerc20.json";
import Popup from "./Popup";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';
import SafeAppsSDK, { TransactionStatus } from "@safe-global/safe-apps-sdk";


const Invest = () => {
  const [formParams, updateFormParams] = useState({ stablecoin: '', dfl: ''});
  const [dflTokens, updatedflTokens] = useState(0);
  const [balanceOfDflTokens, updateBalanceOfDflTokens] = useState(0);
  const [totalSupply, updateTotalSupply] = useState(0);
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

      const readBalanceDFL = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [RWAR.address],
      })
      const balanceOfDflTokens = ethers.utils.formatEther(readBalanceDFL, 18);
      updateBalanceOfDflTokens(balanceOfDflTokens);

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

      const readTotalSupply = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'totalSupply',
      })
      const totalSupply = ethers.utils.formatEther(readTotalSupply, 18);
      updateTotalSupply(totalSupply);

      updateData(true);
    } catch (error) {
      
    }
  }


  
  async function buy() {
    if(formParams.stablecoin!== '' && formParams.dfl!=='')
    try {
      updateLoading(true);
      updatePopup(true);
      
      const { request: config } = await prepareWriteContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'approve',
        args: [RWAR.address, ethers.utils.parseUnits(formParams.stablecoin)],
      });
      const { hash: approveSent } = await writeContract(config)

      /*if(!isSafe) {
        //The usual case, outside of a Safe environment 
        const receipt = await waitForTransaction({hash: approveSent});
     }
     else {
        // The hash will be a safeHash, which needs to be resolved to an on chain one*/
        /*
        const sdk = new SafeAppsSDK({
          debug: true,
        });
        console.log(sdk)
        
        let bool = true;
        while (bool) {
            // The SDK will be pinged until a txHash is available and the txStatus is in an end-state
            const queued = await sdk.txs.getBySafeTxHash(approveSent);
            console.log(queued)
            if (
             queued.txStatus === TransactionStatus.AWAITING_CONFIRMATIONS ||
             queued.txStatus === TransactionStatus.AWAITING_EXECUTION
            ) {
              // Mimic a status watcher by checking once every 5 seconds
              console.log('1')
              window.setTimeout(() => {
                console.log("Delayed for 5 seconds.");
              }, 5000);
            }
            else {
              // The txStatus is in an end-state (e.g. success) so we probably have a valid, on chain txHash
              console.log('2')
              const receipt = await waitForTransaction({ hash: queued.txHash});
              bool = false;
              return receipt;
            }
        }*/
    
     const dataApprove = await waitForTransaction({
        hash: approveSent
      })


      const { request: requestBuy } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'buy',
        args: [ethers.utils.parseUnits(formParams.stablecoin)],
      });
      let { hash: buySent } = await writeContract(requestBuy)

      const dataBuy = await waitForTransaction({
        hash: buySent
      })
      console.log(dataBuy.status)

      updateLoading(false);
      
      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(RWAR.address, RWAR.abi, signer);
      
      let contractStableCoin = new ethers.Contract(tokenerc20.address, tokenerc20.abi, signer);
      //let transaction1 = await contractStableCoin.transfer(to, amount);
      let transaction1 = await contractStableCoin.approve(RWAR.address, ethers.utils.parseUnits(formParams.stablecoin))
      await transaction1.wait();

      if(transaction1) {
        let transaction = await contract.buy(ethers.utils.parseUnits(formParams.stablecoin));
        await transaction.wait();
      }*/

    } catch (error) {
      //alert("You don't have enough stable coins or you don't approve enough stable coins to be used!");
      updateAlert(true);
      console.log("ERROR: " + error)
    }
  }

  
  useEffect(() => {
    getData();
  },)

  return (
    <div className='invest_container'>
      <div className='invest_description_container'>
        <p className='invest_name'>RWAR Tokens</p>
        <div className='invest_description'>
          {data ?
            <div className='invest_info_container'>
              <div className='invest_description_line'>
                <p className='invest_info_title'>RWAR for sale</p>
                <p className='invest_info_number'>{balanceOfDflTokens}/{totalSupply}</p>
              </div>
              <div className='invest_description_line'>
                <p className='invest_info_title'>1 RWAR</p>
                <p className='invest_info_number'>{price} USDT</p>
              </div>
              <div className='invest_description_line'>
                <p className='invest_info_title'>My RWAR</p>
                <p className='invest_info_number'>{dflTokens}</p>
              </div>
              <div className='invest_description_line'>
                <p className='invest_info_title'>My USDT</p>
                <p className='invest_info_number'>{stableCoin}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
        </div>
      </div>

      <div className='invest_form_container'>

        <div className='invest_exchange_container'>
          <div className='invest_input_container'>
            <input className="invest_input" id="stablecoin" type="number" placeholder="Price in USDT" value={formParams.stablecoin} onChange={e => updateFormParams({stablecoin: e.target.value, dfl: ((e.target.valueAsNumber*98/100) / price).toString() })}></input>
            <p>USDT</p>
          </div>
          <IconContext.Provider value={{ className: "invest_arrows_icon" }}>
            <LuMoveVertical />
          </IconContext.Provider>
          <div className='invest_input_container'>
            <input className="invest_input" id="dfl" type="number" placeholder="Number of tokens" value={formParams.dfl} onChange={e => updateFormParams({dfl: e.target.value, stablecoin: (e.target.valueAsNumber*price/98*100).toString() })}></input>
            <p>RWAR</p>
          </div>
          <br></br>
          <p className='invest_info_title'>2% tax go to the reserve</p>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={formParams.dfl +' RWAR!'} action='bought' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="invest_button_exchange" onClick={() => buy()}>
            Buy
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You don't have enough usdt or you don't approve enough usdt to be used!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Invest
