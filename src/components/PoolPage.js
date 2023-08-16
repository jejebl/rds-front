import React from 'react'
import './PoolPage.css';
import polygon from '../img/Polygon.png';
import realt from '../img/realt.jpg';
import {
  Link
} from "react-router-dom";
import { useState, useEffect} from "react";
import RWAR from "../RWAR.json";
import Pool1 from "../Pool1.json";
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

const PoolPage = () => {
  
  const params = useParams();
  const PoolNb = params.PoolNb;

  const [dflTokens, updatedflTokens] = useState(0);
  const [data, updateData] = useState(false);
  const [totalStacked, updateTotalStacked] = useState(0);
  const [maxStack, updateMaxStack] = useState(0);
  const [myStackPool1, updateMyStackPool1] = useState(0);
  const [myYieldsPool1, updateMyYieldsPool1] = useState(0);
  
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

      const readgetMyStacks = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyStacks',
        args: [address]
      })
      const stack = ethers.utils.formatEther(readgetMyStacks, 18);
      updateMyStackPool1(stack);

      const readgetMyYields = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyYields',
        args: [address]
      })
      const yields = ethers.utils.formatEther(readgetMyYields, 18);
      updateMyYieldsPool1(yields);

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

  useEffect(() => {
    getData();
  }, )


  return (
    <div className='poolpage_container'>
      <div className='poolpage'>
        <div className='poolpage_nameandbutton_container'>
          <div className='poolpage_nameandlogo_container'>
            <div className='poolpage_network'>
              <img alt='polygon' src={polygon}></img>
            </div>
            <p className='poolpage_name'>{PoolNb}</p>
          </div>
        </div>
        <div className='poolpage_description'>
          {data ? 
          <div className='poolpage_info_container'>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>Yields</p>
              <p className='poolpage_info_number'>8%</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>Stacked</p>
              <p className='poolpage_info_number'>{totalStacked}/{maxStack}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My stacks</p>
              <p className='poolpage_info_number'>{myStackPool1}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My RWAR</p>
              <p className='poolpage_info_number'>{dflTokens}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My Yields</p>
              <p className='poolpage_info_number'>{myYieldsPool1} USDT</p>
            </div>
          </div>
          : 'Need to be connected'
          }
        </div>

        <div className='poolpage_name_text'>
          <p>Staking: When you deposit your RWAR tokens into the pool, they are staked to generate yield from real-world assets. This staking mechanism is designed to encourage long-term participation, ensuring the stability and longevity of the pool.</p>

          <p>There is a 2% tax on every deposit. 1.5% goes to the Real-World Asset wallet, directly contributing to the growth of the total value locked (TVL) in the protocol. The remaining 0.5% goes to the affiliate or Marketing Wallet (Please check the Affiliate Program section).</p>

          <p>As with the Transactions Taxes, our reinvestment strategy of the 1.5% tax helps the growth of the TVL by consistently adding real-world assets to the RWA pool. In essence, every staker indirectly benefits from this strategy, which aims to enhance the ecosystem's stability and profitability.</p>

          <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>

          <p>Weekly Rewards: Every Wednesdays, RWAR distributes rewards to its stakers. These rewards are paid in RWAR tokens and are derived from the yield generated by the underlying Real-World Assets. This consistent payout ensures that stakers receive regular returns for their commitment, further enhancing the benefits of being part of the RWAR ecosystem.</p>
        </div>
        
        <div className='poolpage_button_container'>
          <Link to={'/stackPage/Pool1'}>
            <button className='poolpage_button_invest'>
              Stack
            </button>
          </Link>
          <Link to={'/removePage/Pool1'}>
            <button className='poolpage_button_invest'>
              Unstack
            </button>
          </Link>
          <Link to={'/claimPage/Pool1'}>
            <button className='poolpage_button_invest'>
              Claim
            </button>
          </Link>
        </div>
        <p className='poolpage_allocation'>Allocations</p>
        <div className='poolpage_allocation_1_container'>
          <div className='poolpage_allocation_token'>
            <div className='poolpage_allocation_logo'>
              <img alt='RealT' src={realt}></img>
            </div>
            <p className='poolpage_allocation_name'>RealT</p>
          </div>
          <div>
            <p>Allocations</p>
            <p>100%</p>
          </div>
          <div>
            <p>Performance</p>
            <p>8%</p>
          </div>
        </div>



      </div>
      
    </div>
  )
}

export default PoolPage
