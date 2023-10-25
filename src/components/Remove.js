import React from 'react';
import './Stack.css';
import { useState, useEffect } from "react";
import polygon from '../img/Polygon.png';
import RDS from "../RDS.json";
import Pool1 from "../Pool1.json";
import Pool2 from "../Pool2.json";
import Pool3 from "../Pool3.json";
import PopupUnstack from "./PopupUnstack";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Remove = () => {

  const cookies = new Cookies(null, { path: '/' });

  const params = useParams();
  const PoolNb = params.name;
  console.log(PoolNb);

  if(cookies.get(PoolNb)!=="Pool 1" && cookies.get(PoolNb)!=="Pool 2" && cookies.get(PoolNb)!=="Pool 3"){
    window.location.assign("/");
  }

  const [formParams, updateFormParams] = useState({ rds: ''});
  const [rdsTokens, updaterdsTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [totalStacked, updateTotalStacked] = useState(0);
  //const [maxStack, updateMaxStack] = useState(0);
  const [unstacked, updateUnstacked] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [alert, updateAlert] = useState(false);

  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {

    if(PoolNb==='Pool 1'){
      try {

        const readBalanceOfMyrdsTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
          functionName: 'balanceOf',
          args: [address],
        })
        const balanceOfMyrdsTokens = ethers.utils.formatEther(readBalanceOfMyrdsTokens, 18);
        updaterdsTokens(balanceOfMyrdsTokens);

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

        const readBalanceOfMyrdsTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
          functionName: 'balanceOf',
          args: [address],
        })
        const balanceOfMyrdsTokens = ethers.utils.formatEther(readBalanceOfMyrdsTokens, 18);
        updaterdsTokens(balanceOfMyrdsTokens);

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

        const readBalanceOfMyrdsTokens = await readContract({
          address: RDS.address,
          abi: RDS.abi,
          functionName: 'balanceOf',
          args: [address],
        })
        const balanceOfMyrdsTokens = ethers.utils.formatEther(readBalanceOfMyrdsTokens, 18);
        updaterdsTokens(balanceOfMyrdsTokens);

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
  
  async function remove() {
    if(formParams.rds!==''){

      
      if(PoolNb==='Pool 1'){
        try {
          updateLoading(true);
          updatePopup(true);
    
          const { request: requestRemove } = await prepareWriteContract({
            address: Pool1.address,
            abi: Pool1.abi,
            functionName: 'remove',
            args: [ethers.utils.parseUnits(formParams.rds)],
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
    
          const { request: requestRemove } = await prepareWriteContract({
            address: Pool2.address,
            abi: Pool2.abi,
            functionName: 'remove',
            args: [ethers.utils.parseUnits(formParams.rds)],
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
    
          const { request: requestRemove } = await prepareWriteContract({
            address: Pool3.address,
            abi: Pool3.abi,
            functionName: 'remove',
            args: [ethers.utils.parseUnits(formParams.rds)],
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
    
          updateLoading(false);
    
        } catch (error) {
          updateAlert(true);
          console.log("ERROR: " + error)
        }
      }
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
                <p className='stack_info_title'>My RDS</p>
                <p className='stack_info_number'>{rdsTokens}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
        </div>
      </div>

      <div className='stack_form_container'>

        <div className='stack_exchange_container'>
          <div className='stack_input_container'>
            <input className="stack_input" id="rds" type="number" placeholder="Number of tokens" value={formParams.rds} onChange={e => updateFormParams({...formParams, rds: e.target.value})}></input>
            <p>Renditus</p>
          </div>
          <br></br>
          <p className='invest_info_title'>After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>
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
        <Alert action="You don't have enough RDS stacked!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Remove
