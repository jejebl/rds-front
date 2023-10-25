import React from 'react'
import './PoolPage.css';
import polygon from '../img/Polygon.png';
import realt from '../img/realt.jpg';
import {
  Link
} from "react-router-dom";
import { useState, useEffect} from "react";
import RDS from "../RDS.json";
import Pool1 from "../Pool1.json";
import Pool2 from "../Pool2.json";
import Pool3 from "../Pool3.json";
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import Cookies from 'universal-cookie';

const PoolPage = () => {

  const cookies = new Cookies(null, { path: '/' });
  
  const params = useParams();
  const PoolNb = params.PoolNb;
  console.log(PoolNb)

  if(cookies.get(PoolNb)!=="Pool 1" && cookies.get(PoolNb)!=="Pool 2" && cookies.get(PoolNb)!=="Pool 3"){
    window.location.assign("/");
  }

  const [dflTokens, updatedflTokens] = useState(0);
  const [data, updateData] = useState(false);
  const [totalStacked, updateTotalStacked] = useState(0);
  //const [maxStack, updateMaxStack] = useState(0);
  const [myStackPool, updateMyStackPool] = useState(0);
  const [myYieldsPool, updateMyYieldsPool] = useState(0);
  
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

        const readgetMyStacks = await readContract({
          address: Pool1.address,
          abi: Pool1.abi,
          functionName: 'getMyStacks',
          args: [address]
        })
        const stack = ethers.utils.formatEther(readgetMyStacks, 18);
        updateMyStackPool(stack);

        const readgetMyYields = await readContract({
          address: Pool1.address,
          abi: Pool1.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);

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

        const readgetMyStacks = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'getMyStacks',
          args: [address]
        })
        const stack = ethers.utils.formatEther(readgetMyStacks, 18);
        updateMyStackPool(stack);

        const readgetMyYields = await readContract({
          address: Pool2.address,
          abi: Pool2.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);

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

        const readgetMyStacks = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'getMyStacks',
          args: [address]
        })
        const stack = ethers.utils.formatEther(readgetMyStacks, 18);
        updateMyStackPool(stack);

        const readgetMyYields = await readContract({
          address: Pool3.address,
          abi: Pool3.abi,
          functionName: 'getMyYields',
          args: [address]
        })
        const yields = ethers.utils.formatEther(readgetMyYields, 18);
        updateMyYieldsPool(yields);

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
              <p className='poolpage_info_number'>{totalStacked}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My stacks</p>
              <p className='poolpage_info_number'>{myStackPool}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My Renditus</p>
              <p className='poolpage_info_number'>{dflTokens}</p>
            </div>
            <div className='poolpage_description_line'>
              <p className='poolpage_info_title'>My Yields</p>
              <p className='poolpage_info_number'>{myYieldsPool}</p>
            </div>
          </div>
          : 'Need to be connected'
          }
        </div>
        
        <p className='poolpage_address'>Import the receipt token in your wallet with this address:</p>
        {PoolNb==='Pool 1' ?
        <p className='poolpage_address'>{Pool1.address}</p>
        : PoolNb==='Pool 2' ?
        <p className='poolpage_address'>{Pool2.address}</p>
        : PoolNb==='Pool 3' ?
        <p className='poolpage_address'>{Pool3.address}</p>
        :''}

        {PoolNb==='Pool 1' ? 
        <div className='poolpage_name_text'>
          <p>Staking: When you deposit your RDS tokens into the pool, they are staked to generate yield from real-world assets. This staking mechanism is designed to encourage long-term participation, ensuring the stability and longevity of the pool.</p>
          <p>There is a 3% tax on every deposit. 2% goes to the Reserve. The remaining 1% goes to the affiliate or Marketing Wallet (Please check the Affiliate Program section).</p>
          <br></br>
          <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>
          <br></br>
          <p>Weekly Rewards: Every 2 weeks, Renditus distributes rewards to its stakers. These rewards are paid in RDS tokens and are derived from the yield generated by the underlying Real-World Assets. This consistent payout ensures that stakers receive regular returns for their commitment, further enhancing the benefits of being part of the Renditus ecosystem.</p>
        </div>
        : PoolNb==='Pool 2' ? 
        <div className='poolpage_name_text'>
          <p>Staking: When you deposit your RDS tokens into the pool, they are staked to generate yield from real-world assets. This staking mechanism is designed to encourage long-term participation, ensuring the stability and longevity of the pool.</p>
          <p>There is a 3% tax on every deposit. 2% goes to the Reserve. The remaining 1% goes to the affiliate or Marketing Wallet (Please check the Affiliate Program section).</p>
          <br></br>
          <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>
          <br></br>
          <p>Weekly Rewards: Every 2 weeks, Renditus distributes rewards to its stakers. These rewards are paid in RDS tokens and are derived from the yield generated by the underlying Real-World Assets. This consistent payout ensures that stakers receive regular returns for their commitment, further enhancing the benefits of being part of the Renditus ecosystem.</p>
        </div>
        : PoolNb==='Pool 3' ?
        <div className='poolpage_name_text'>
          <p>Staking: When you deposit your RDS tokens into the pool, they are staked to generate yield from real-world assets. This staking mechanism is designed to encourage long-term participation, ensuring the stability and longevity of the pool.</p>
          <p>There is a 3% tax on every deposit. 2% goes to the Reserve. The remaining 1% goes to the affiliate or Marketing Wallet (Please check the Affiliate Program section).</p>
          <br></br>
          <p>Lock-in Period: After making a deposit, your tokens are locked in for a period of 30 days. This means you cannot unstake or withdraw them during this time.</p>
          <br></br>
          <p>Weekly Rewards: Every 2 weeks, Renditus distributes rewards to its stakers. These rewards are paid in RDS tokens and are derived from the yield generated by the underlying Real-World Assets. This consistent payout ensures that stakers receive regular returns for their commitment, further enhancing the benefits of being part of the Renditus ecosystem.</p>
        </div>
        :''}
        
        <div className='poolpage_button_container'>
          <Link to={'/stackPage/' + PoolNb}>
            <button className='poolpage_button_invest'>
              Stack
            </button>
          </Link>
          <Link to={'/removePage/' + PoolNb}>
            <button className='poolpage_button_invest'>
              Unstack
            </button>
          </Link>
          <Link to={'/claimPage/' + PoolNb}>
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
