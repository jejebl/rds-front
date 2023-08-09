import React from 'react';
import './Tokens.css';
import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import DeFiLabs from "../DeFiLabs.json";
import { useAccount } from 'wagmi'
import { readContract  } from '@wagmi/core'


const Tokens = () => {
  const [dflTokens, updatedflTokens] = useState(0);
  const [balanceOfDflTokens, updateBalanceOfDflTokens] = useState(0);
  const [totalSupply, updateTotalSupply] = useState(0);
  const [price, updatePrice] = useState(0);
  const [data, updateData] = useState(false);
  const ethers = require("ethers");

  const { address } = useAccount()
  
  async function getData() {
    try {
      const readPrice1 = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'price',
      })
      const readPrice = ethers.utils.formatEther(readPrice1, 18);
      updatePrice(readPrice);

      const readBalanceDFL = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'balanceOf',
        args: [DeFiLabs.address],
      })
      const balanceOfDflTokens = ethers.utils.formatEther(readBalanceDFL, 18);
      updateBalanceOfDflTokens(balanceOfDflTokens);

      const readBalanceOfMyDflTokens = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'balanceOf',
        args: [address],
      })
      const balanceOfMyDflTokens = ethers.utils.formatEther(readBalanceOfMyDflTokens, 18);
      updatedflTokens(balanceOfMyDflTokens);

      const readTotalSupply = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'totalSupply',
      })
      const totalSupply = ethers.utils.formatEther(readTotalSupply, 18);
      updateTotalSupply(totalSupply);

      updateData(true);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, );

  return (
    <div className='tokens_container'>
      <div className='tokens_description_container'>
        <p className='tokens_name'>DeFi Labs Tokens</p>
        <div className='tokens_description'>
          {data ?
            <div className='tokens_info_container'>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>DFLT for sale</p>
                <p className='tokens_info_number'>{balanceOfDflTokens}/{totalSupply}</p>
              </div>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>1 DFLT</p>
                <p className='tokens_info_number'>{price} USDT</p>
              </div>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>My DFLT</p>
                <p className='tokens_info_number'>{dflTokens}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
          <p className='tokens_text'>The DFL platform stands out in the DeFi landscape with its unique offering of a single token, DFL, 
            and a single pool to generate yield. The value of DFL is dynamic and is set to evolve over time, influenced by the
             maximum supply and the demand from those seeking to join the RWA pool. The platform operates on a simple principle:
              the more DFL tokens you stake, the more passive income you stand to generate.</p>
          <div className='tokens_button_container'>
            <Link to={'/investPage/DFL Pool'}>
              <button className='tokens_button'>Buy</button>
            </Link>
            
            <Link to={'/sellPage/DFL Pool'}>
              <button className='tokens_button'>Sell</button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tokens
