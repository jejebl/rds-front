import React from 'react';
import './Stack.css';
import { useState, useEffect } from "react";
import polygon from '../img/Polygon.png';
import DeFiLabs from "../DeFiLabs.json";
import Pool1 from "../Pool1.json";
import PopupUnstack from "./PopupUnstack";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';


const Remove = () => {
  const [formParams, updateFormParams] = useState({ dfl: ''});
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [totalStacked, updateTotalStacked] = useState(0);
  const [maxStack, updateMaxStack] = useState(0);
  const [unstacked, updateUnstacked] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [alert, updateAlert] = useState(false);

  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
    try {

      const readBalanceOfMyDflTokens = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'balanceOf',
        args: [address],
      })
      const balanceOfMyDflTokens = ethers.utils.formatEther(readBalanceOfMyDflTokens, 18);
      updatedflTokens(balanceOfMyDflTokens);

      const readGetMyStacks = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyStacks',
        args: [address]
      })
      updateMyStack(ethers.utils.formatEther(readGetMyStacks, 18));

      const readTotalStacked = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'totalStacked',
      })
      const totalStacked = ethers.utils.formatEther(readTotalStacked, 18);
      updateTotalStacked(totalStacked);

      const readMaxStack = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'maxStack',
      })
      const maxStack = ethers.utils.formatEther(readMaxStack, 18);
      updateMaxStack(maxStack);

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.getAddress();
      const addr = await signer.getAddress();
      let contractDfl = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);

      let balanceOfMyDflTokens = await contractDfl.balanceOf(addr);
      balanceOfMyDflTokens = ethers.utils.formatEther(balanceOfMyDflTokens, 18);
      updatedflTokens(balanceOfMyDflTokens);
      
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      
      let stack = await contractPool1.getMyStacks();
      stack = ethers.utils.formatEther(stack, 18);
      updateMyStack(stack);
      */

      updateData(true);
    } catch (error) {
      
    }
  }
  
  async function remove() {
    if(formParams.dfl!=='')
    try {
      updateLoading(true);
      updatePopup(true);

      const { request: requestRemove } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'remove',
        args: [ethers.utils.parseUnits(formParams.dfl)],
      });
      let { hash: removeSent } = await writeContract(requestRemove)

      const dataRemove = await waitForTransaction({
        hash: removeSent
      })
      if(dataRemove.logs.length>1){
        updateUnstacked(ethers.utils.formatEther(dataRemove.logs[0].data, 18));
      } else {
        updateUnstacked(0)
      }

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      
      let transaction = await contractPool1.remove(ethers.utils.parseUnits(formParams.dfl));
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      //alert("You don't have enough DFL!");
      updateAlert(true);
      console.log("ERROR: " + error)
    }
  }

  
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='stack_container'>
      <div className='stack_description_container'>
        <div className='stack_nameandlogo_container'>
          <div className='stack_network'>
            <img alt='polygon' src={polygon}></img>
          </div>
          <p className='stack_name'>Pool 1</p>
        </div>
        <div className='stack_description'>
          {data ?
            <div className='stack_info_container'>
              <div className='stack_description_line'>
                <p className='stack_info_title'>Yields</p>
                <p className='stack_info_number'>8%</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>Stacked</p>
                <p className='stack_info_number'>{totalStacked}/{maxStack}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My stacks</p>
                <p className='stack_info_number'>{myStack}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My DFLT</p>
                <p className='stack_info_number'>{dflTokens}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
          <div className='stack_text'>
            <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 7 days. This means you cannot unstake or withdraw them during this time.</p>
            <p>Unstaking Taxes: If you choose to unstake your tokens after the lock-in period but before 30 days have passed, a tax will be applied. These taxes are not just a mechanism to maintain liquidity but also a means to support the project's long-term vision. They discourage short-term plays and ensure that the ecosystem is geared towards genuine, long-term participants.</p>
            <p>The tax structure is as follows:</p>
            <p>7 to 14 days: 20%.</p>
            <p>14 to 21 days: 10%.</p>
            <p>21 to 30 days: 5%.</p>
            <p>Full Unstaking: After 30 days from the initial deposit, you can unstake 100% of your tokens without any taxes.</p>
          </div>
        </div>
      </div>

      <div className='stack_form_container'>

        <div className='stack_exchange_container'>
          <div className='stack_input_container'>
            <input className="stack_input" id="dfl" type="number" placeholder="Number of tokens" value={formParams.dfl} onChange={e => updateFormParams({...formParams, dfl: e.target.value})}></input>
            <p>DFLT</p>
          </div>
        </div>
        
        {popup ? 
        <PopupUnstack loading={loading} unstacked={unstacked} updatePopup={updatePopup}>
        </PopupUnstack>
        : data ?
          <button className="stack_button_exchange" onClick={() => remove()}>
            Unstack
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You don't have enough dfl tokens!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Remove
