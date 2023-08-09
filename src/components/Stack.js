import React from 'react';
import './Stack.css';
import { useState, useEffect } from "react";
import polygon from '../img/Polygon.png';
import DeFiLabs from "../DeFiLabs.json";
import Pool1 from "../Pool1.json";
import Popup from "./Popup";
import Alert from "./Alert";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';


const Stack = () => {
  const [formParams, updateFormParams] = useState({ dfl: '', addr: ''});
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStack, updateMyStack] = useState(0);
  const [totalStacked, updateTotalStacked] = useState(0);
  const [maxStack, updateMaxStack] = useState(0);
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

      updateData(true);
    } catch (error) {
      
    }
  }
  
  async function stack() {
    if(formParams.dfl!=='')
    try {
      updateLoading(true);
      updatePopup(true);

      const { request: config } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
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
        args: [ethers.utils.parseUnits(formParams.dfl), formParams.addr],
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
            <p>When you deposit your DFL tokens into the pool, they are staked to generate yield from real-world assets. This staking mechanism is designed to encourage long-term participation, ensuring the stability and longevity of the pool.</p>

            <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 7 days. This means you cannot unstake or withdraw them during this time.</p>

            <p>Unstaking Taxes: If you choose to unstake your tokens after the lock-in period but before 30 days have passed, a tax will be applied. These taxes are not just a mechanism to maintain liquidity but also a means to support the project's long-term vision. They discourage short-term plays and ensure that the ecosystem is geared towards genuine, long-term participants. The tax structure is as follows:</p>
            <p>7 to 14 days: 20%.</p>
            <p>14 to 21 days: 10%.</p>
            <p>21 to 30 days: 5%.</p>
            <p>Full Unstaking: After 30 days from the initial deposit, you can unstake 100% of your tokens without any taxes.</p>

            <p>Weekly Rewards: Every Wednesday, DFL distributes rewards to its stakers. These rewards are paid in DFL tokens and are derived from the yield generated by the underlying Real-World Assets (RWA). This consistent payout ensures that stakers receive regular returns for their commitment, further enhancing the benefits of being part of the DFL ecosystem.</p>

            <p>The tax percentages and time frames are meticulously designed to incentivize longer-term staking. The gradual reduction in taxes over time not only reflects the value of commitment to the pool but also aligns with DFL's mission of fostering a community that believes in the project's long-term vision.</p>
          </div>
        </div>
      </div>

      <div className='stack_form_container'>

        <div className='stack_exchange_container'>
          <div className='stack_input_container'>
            <input className="stack_input" id="dfl" type="number" placeholder="Number of tokens" value={formParams.dfl} onChange={e => updateFormParams({...formParams, dfl: e.target.value})}></input>
            <p>DFLT</p>
          </div>
          <div className='stack_input_container'>
            <input className="stack_input" id="addr" type="address" placeholder="Affiliate address" value={formParams.addr} onChange={e => updateFormParams({...formParams, addr: e.target.value})}></input>
            <p>Affiliate address</p>
          </div>
        </div>
        
        {popup ? 
        <Popup loading={loading} number={formParams.dfl +' DFLT!'} action='stacked' updatePopup={updatePopup}>
        </Popup>
        : data ?
          <button className="stack_button_exchange" onClick={() => stack()}>
            Stack
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

export default Stack
