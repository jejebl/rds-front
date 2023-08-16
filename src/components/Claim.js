import React from 'react';
import './Stack.css';
import { useState, useEffect } from "react";
import polygon from '../img/Polygon.png';
import RWAR from "../RWAR.json";
import Pool1 from "../Pool1.json";
import Popup from "./Popup";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';


const Remove = () => {
  const [formParams, updateFormParams] = useState({usdt: ''});
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [myYieldsPool1, updateMyYieldsPool1] = useState(0);
  const [alert, updateAlert] = useState(false);

  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
    try {

      const readBalanceOfMyDflTokens = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
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

      const readgetMyYields = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyYields',
        args: [address]
      })
      const yields = ethers.utils.formatEther(readgetMyYields, 18);
      updateMyYieldsPool1(yields);

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.getAddress();
      const addr = await signer.getAddress();
      let contractDfl = new ethers.Contract(RWAR.address, RWAR.abi, signer);

      let balanceOfMyDflTokens = await contractDfl.balanceOf(addr);
      balanceOfMyDflTokens = ethers.utils.formatEther(balanceOfMyDflTokens, 18);
      updatedflTokens(balanceOfMyDflTokens);
      
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      
      let stack = await contractPool1.getMyStacks();
      stack = ethers.utils.formatEther(stack, 18);
      updateMyStack(stack);
      
      let yields = await contractPool1.getMyYields();
      yields = ethers.utils.formatEther(yields, 18);
      updateMyYieldsPool1(yields);
      */

      updateData(true);
    } catch (error) {
      
    }
  }
  async function claim() {
    if(formParams.usdt!=='')
    try {
      updateLoading(true);
      updatePopup(true);

      const { request: requestClaim } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'claim',
        args: [ethers.utils.parseUnits(formParams.usdt)],
      });
      let { hash: claimSent } = await writeContract(requestClaim)

      const dataClaim = await waitForTransaction({
        hash: claimSent
      })
      console.log(dataClaim.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.getAddress();
      
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      let claim = await contractPool1.claim(ethers.utils.parseUnits(formParams.usdt));
      await claim.wait();
      */


      updateLoading(false);

    } catch (error) {
      //alert("You don't have enough RWAR!");
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
                <p className='stack_info_title'>My Yields</p>
                <p className='stack_info_number'>{myYieldsPool1}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My stacks</p>
                <p className='stack_info_number'>{myStack}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My RWAR</p>
                <p className='stack_info_number'>{dflTokens}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
        </div>
      </div>

      <div className='stack_form_container'>

        <div className='stack_exchange_container'>
          <div className='stack_input_container'>
            <input className="stack_input" id="usdt" type="number" placeholder="USDT" value={formParams.usdt} onChange={e => updateFormParams({usdt: e.target.value})}></input>
            <p>USDT</p>
          </div>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={'USDT!'} action='claimed' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="stack_button_exchange" onClick={() => claim()}>
            Claim
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You can't claim!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Remove
