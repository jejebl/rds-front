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


const Remove = () => {

  const cookies = new Cookies(null, { path: '/' });

  const params = useParams();
  const PoolNb = params.name;
  console.log(PoolNb);

  if(cookies.get(PoolNb)!=="Pool 1" && cookies.get(PoolNb)!=="Pool 2" && cookies.get(PoolNb)!=="Pool 3"){
    window.location.assign("/");
  }

  const [formParams, updateFormParams] = useState({usdt: ''});
  const [rdsTokens, updaterdsTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [data, updateData] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [myYieldsPool, updateMyYieldsPool] = useState(0);
  const [alert, updateAlert] = useState(false);

  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
    if(PoolNb==="Pool 1"){
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
  
        const readgetMyYields = await readContract({
          address: Pool1.address,
          abi: Pool1.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);
  
        updateData(true);
      } catch (error) {
        
      }
    }

    else if(PoolNb==="Pool 2"){
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
  
        const readgetMyYields = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);
  
        updateData(true);
      } catch (error) {
        
      }
    }

    else if(PoolNb==="Pool 3"){
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
  
        const readgetMyYields = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);
  
        updateData(true);
      } catch (error) {
        
      }
    }
    
  }
  async function claim() {
    if(formParams.usdt!==''){

      if(PoolNb==="Pool 1"){
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
          updateLoading(false);
    
        } catch (error) {
          updateAlert(true);
          console.log("ERROR: " + error)
        }
      }

      else if(PoolNb==="Pool 2"){
        try {
          updateLoading(true);
          updatePopup(true);
    
          const { request: requestClaim } = await prepareWriteContract({
            address: Pool2.address,
            abi: Pool2.abi,
            functionName: 'claim',
            args: [ethers.utils.parseUnits(formParams.usdt)],
          });
          let { hash: claimSent } = await writeContract(requestClaim)
    
          const dataClaim = await waitForTransaction({
            hash: claimSent
          })
          console.log(dataClaim.status)
          updateLoading(false);
    
        } catch (error) {
          updateAlert(true);
          console.log("ERROR: " + error)
        }
      }

      else if(PoolNb==="Pool 3"){
        try {
          updateLoading(true);
          updatePopup(true);
    
          const { request: requestClaim } = await prepareWriteContract({
            address: Pool3.address,
            abi: Pool3.abi,
            functionName: 'claim',
            args: [ethers.utils.parseUnits(formParams.usdt)],
          });
          let { hash: claimSent } = await writeContract(requestClaim)
    
          const dataClaim = await waitForTransaction({
            hash: claimSent
          })
          console.log(dataClaim.status)
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
                <p className='stack_info_title'>My Yields</p>
                <p className='stack_info_number'>{myYieldsPool}</p>
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
            <input className="stack_input" id="usdt" type="number" placeholder="DFL" value={formParams.usdt} onChange={e => updateFormParams({usdt: e.target.value})}></input>
            <p>DFL</p>
          </div>
          <br></br>
          <p className='invest_info_title'>Every 2 weeks you can claim your yields in DFL tokens.</p>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={'some DFL!'} action='claimed' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="stack_button_exchange" onClick={() => claim()}>
            Claim
          </button>
          : ''
        }

        {alert ? 
        <Alert action="You can't claim this amount!" updatePopup={updatePopup} updateLoading={updateLoading} updateAlert={updateAlert}>
        </Alert>
        : ""
        }

      </div>
    </div>
  )
}

export default Remove
