import React from 'react';
import './Tokens.css';
import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import RWAR from "../RWAR.json";
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

      const readTotalSupply = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
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
        <p className='tokens_name'>RWAR Tokens</p>
        <div className='tokens_description'>
          {data ?
            <div className='tokens_info_container'>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>RWAR for sale</p>
                <p className='tokens_info_number'>{balanceOfDflTokens}/{totalSupply}</p>
              </div>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>1 RWAR</p>
                <p className='tokens_info_number'>{price} USDT</p>
              </div>
              <div className='tokens_description_line'>
                <p className='tokens_info_title'>My RWAR</p>
                <p className='tokens_info_number'>{dflTokens}</p>
              </div>
            </div>
            : 'Need to be connected'
          }
          <p className='tokens_text'>To ensure the sustainability of the RWAR ecosystem, we implement a transaction tax system.
           A 2% tax is applied to every buy operation.
            This tax is used to maintain the stability of the platform and to provide a safety net for unforeseen circumstances or market volatilities.
             The entire 2% of this tax goes to the Reserve Wallet.
              The Reserve Wallet acts as a safeguard, ensuring that during unexpected events or market fluctuations, there are funds set aside to address any immediate needs or challenges.
               This measure is a testament to our commitment to safeguarding our users' interests and ensuring the long-term viability of the RWAR ecosystem.</p>
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
