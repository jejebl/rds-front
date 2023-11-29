import React from 'react';
import './Stack.css';
import { useState, useEffect } from "react";
import polygon from '../img/Polygon.png';
import RDS from "../RDS.json";
import Pool1 from "../Pool1.json";
import Pool2 from "../Pool2.json";
import Pool3 from "../Pool3.json";
import Popup from "./Popup.js";
import Alert from "./Alert.js";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Stack = () => {

  const cookies = new Cookies(null, { path: '/' });
  
  const params = useParams();
  const PoolNb = params.name;
  const addressMarketingSafeWallet = "0x671bbd03D1fbcA8A2aB46eC1a250B19a224Bbf82";

  if(cookies.get(PoolNb)!=="Pool 1" && cookies.get(PoolNb)!=="Pool 2" && cookies.get(PoolNb)!=="Pool 3"){
    window.location.assign("/");
  }

  const [formParams, updateFormParams] = useState({ dfl: 0, addr: ""});
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [totalStacked, updateTotalStacked] = useState(0);
  //const [maxStack, updateMaxStack] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [alert, updateAlert] = useState(false);

  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
    
    if(PoolNb==='Pool 1'){
      try {

        const readBalanceOfMyDflTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
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
/*
        const readMaxStack = await readContract({
          address: Pool1.address,
          abi: Pool1.abi,
          functionName: 'maxStack',
        })
        const maxStack = ethers.utils.formatEther(readMaxStack, 18);
        updateMaxStack(maxStack);*/

        updateData(true);
      } catch (error) {
        
      }
    }
    

    else if(PoolNb==='Pool 2'){
      try {

        const readBalanceOfMyDflTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
          functionName: 'balanceOf',
          args: [address],
        })
        const balanceOfMyDflTokens = ethers.utils.formatEther(readBalanceOfMyDflTokens, 18);
        updatedflTokens(balanceOfMyDflTokens);

        const readGetMyStacks = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'getMyStacks',
          args: [address]
        })
        updateMyStack(ethers.utils.formatEther(readGetMyStacks, 18));

        const readTotalStacked = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'totalStacked',
        })
        const totalStacked = ethers.utils.formatEther(readTotalStacked, 18);
        updateTotalStacked(totalStacked);
/*
        const readMaxStack = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'maxStack',
        })
        const maxStack = ethers.utils.formatEther(readMaxStack, 18);
        updateMaxStack(maxStack);*/

        updateData(true);
      } catch (error) {
        
      }
    }

    else if(PoolNb==='Pool 3'){
      try {

        const readBalanceOfMyDflTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
          functionName: 'balanceOf',
          args: [address],
        })
        const balanceOfMyDflTokens = ethers.utils.formatEther(readBalanceOfMyDflTokens, 18);
        updatedflTokens(balanceOfMyDflTokens);

        const readGetMyStacks = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'getMyStacks',
          args: [address]
        })
        updateMyStack(ethers.utils.formatEther(readGetMyStacks, 18));

        const readTotalStacked = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'totalStacked',
        })
        const totalStacked = ethers.utils.formatEther(readTotalStacked, 18);
        updateTotalStacked(totalStacked);
/*
        const readMaxStack = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'maxStack',
        })
        const maxStack = ethers.utils.formatEther(readMaxStack, 18);
        updateMaxStack(maxStack);*/

        updateData(true);
      } catch (error) {
        
      }
    }
  }
  
  async function stack() {
    if(formParams.dfl!==0 && formParams.addr!==address){
      let affiliate = formParams.addr;
      if(!ethers.utils.isAddress(formParams.addr)){
        affiliate=addressMarketingSafeWallet;
      }
      try {

        if(PoolNb==='Pool 1'){
          try {
            updateLoading(true);
            updatePopup(true);
      
            const { request: config } = await prepareWriteContract({
              address: RDS.address,
              abi: RDS.abi,
              functionName: 'approve',
              args: [Pool1.address, ethers.utils.parseUnits(formParams.dfl)],
            });
            const { hash: approveSent } = await writeContract(config)
      
            const dataApprove = await waitForTransaction({
              hash: approveSent
            })
            console.log(dataApprove.status)
      
            const { request: requestStack } = await prepareWriteContract({
              address: Pool1.address,
              abi: Pool1.abi,
              functionName: 'stack',
              args: [ethers.utils.parseUnits(formParams.dfl), affiliate],
            });
            let { hash: stackSent } = await writeContract(requestStack)
      
            const dataStack = await waitForTransaction({
              hash: stackSent
            })
            console.log(dataStack.status)
      
            updateLoading(false);
      
          } catch (error) {
            updateAlert(true);
            console.log("ERROR: " + error)
          }
        }
  
        else if(PoolNb==='Pool 2'){
          try {
            updateLoading(true);
            updatePopup(true);
      
            const { request: config } = await prepareWriteContract({
              address: RDS.address,
              abi: RDS.abi,
              functionName: 'approve',
              args: [Pool2.address, ethers.utils.parseUnits(formParams.dfl)],
            });
            const { hash: approveSent } = await writeContract(config)
      
            const dataApprove = await waitForTransaction({
              hash: approveSent
            })
            console.log(dataApprove.status)
      
            const { request: requestStack } = await prepareWriteContract({
              address: Pool2.address,
              abi: Pool2.abi,
              functionName: 'stack',
              args: [ethers.utils.parseUnits(formParams.dfl), affiliate],
            });
            let { hash: stackSent } = await writeContract(requestStack)
      
            const dataStack = await waitForTransaction({
              hash: stackSent
            })
            console.log(dataStack.status)
      
            updateLoading(false);
      
          } catch (error) {
            updateAlert(true);
            console.log("ERROR: " + error)
          }
        }
  
        else if(PoolNb==='Pool 3'){
          try {
            updateLoading(true);
            updatePopup(true);
      
            const { request: config } = await prepareWriteContract({
              address: RDS.address,
              abi: RDS.abi,
              functionName: 'approve',
              args: [Pool3.address, ethers.utils.parseUnits(formParams.dfl)],
            });
            const { hash: approveSent } = await writeContract(config)
      
            const dataApprove = await waitForTransaction({
              hash: approveSent
            })
            console.log(dataApprove.status)
      
            const { request: requestStack } = await prepareWriteContract({
              address: Pool3.address,
              abi: Pool3.abi,
              functionName: 'stack',
              args: [ethers.utils.parseUnits(formParams.dfl), affiliate],
            });
            let { hash: stackSent } = await writeContract(requestStack)
      
            const dataStack = await waitForTransaction({
              hash: stackSent
            })
            console.log(dataStack.status)
      
            updateLoading(false);
      
          } catch (error) {
            updateAlert(true);
            console.log("ERROR: " + error)
          }
        }
        
      } catch (error) {
        updateAlert(true);
        console.log("ERROR: " + error)
      }
      
    }
    
  }

  
  useEffect(() => {
    getData();
  }, )

  return (
    <div className='stack_container'>
      <div className='stack_description_container'>
        <div className='stack_nameandlogo_container'>
          <div className='stack_network'>
            <img alt='polygon' src={polygon}></img>
          </div>
          <p className='stack_name'>{PoolNb}</p>
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
                <p className='stack_info_number'>{totalStacked}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My stacks</p>
                <p className='stack_info_number'>{myStack}</p>
              </div>
              <div className='stack_description_line'>
                <p className='stack_info_title'>My DFL</p>
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
            <input className="stack_input" id="dfl" type="number" placeholder="Number of tokens" value={formParams.dfl} onChange={e => updateFormParams({...formParams, dfl: e.target.value})}></input>
            <p>DFL</p>
          </div>
          <br></br>
          <div className='stack_input_container'>
            <input className="stack_input" id="addr" type="string" placeholder="Affiliate address" value={formParams.addr} onChange={e => updateFormParams({...formParams, addr: e.target.value})}></input>
            <p>Affiliate address</p>
          </div>
          <br></br>
          <p className='invest_info_title'>You cannot enter more than 15 digits after the decimal point.</p>
          <p className='invest_info_title'>After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>
          <p className='invest_info_title'>3% tax go to the marketing, the affiliate address and the reserve.</p>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={(formParams.dfl*97/100).toString() +' DFL!'} action='stacked' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="stack_button_exchange" onClick={() => stack()}>
            Stack
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You don't have enough DFL tokens!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Stack
