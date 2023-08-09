import React from 'react'
import './Profile.css';
import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import DeFiLabs from "../DeFiLabs.json";
import Pool1 from "../Pool1.json";
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

const Profile = () => {
  
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStackPool1, updateMyStackPool1] = useState(0);
  const [ownerAddress1,updateOwnerAddress1] = useState('');
  const [ownerAddress2,updateOwnerAddress2] = useState('');
  const [myYieldsPool1, updateMyYieldsPool1] = useState(0);
  
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

      const readgetMyStacks = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyStacks',
        args: [address]
      })
      const stack = ethers.utils.formatEther(readgetMyStacks, 18);
      updateMyStackPool1(stack);

      const readAddressOwner1 = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'owners',
        args: [0],
      })
      updateOwnerAddress1(readAddressOwner1);

      const readAddressOwner2 = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'owners',
        args: [1],
      })
      updateOwnerAddress2(readAddressOwner2);

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
      updateAddress(addr);
      let contractDfl = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);

      let balanceOfDflTokens = await contractDfl.balanceOf(addr);
      balanceOfDflTokens = ethers.utils.formatEther(balanceOfDflTokens, 18);
      updatedflTokens(balanceOfDflTokens);
      
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);

      let stack = await contractPool1.getMyStacks();
      stack = ethers.utils.formatEther(stack, 18);
      updateMyStackPool1(stack);

      let addressOwner1 = await contractDfl.owners(0);
      updateOwnerAddress1(addressOwner1);
      
      let addressOwner2 = await contractDfl.owners(1);
      updateOwnerAddress2(addressOwner2);
      */

    } catch (error) {
      
    }
  }

useEffect(() => {
  getData();
}, [])


  return (
    <div className='profile_container'>
      {address !== "0x" ?
          <div className='profile'>
            <p className='profile_tokens'>Profile</p>
            <p className='profile_address'>{address}</p>
            <div className='profile_info_container'>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My DFLT</p>
                <p className='profile_info_number'>{dflTokens}</p>
              </div>
            </div>
            
            <div className='profile_info_container'>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My stacks</p>
                <p className='profile_info_number'>{myStackPool1}</p>
              </div>
              {/*
              <div className='profile_description_line'>
                <p className='profile_info_title'>Pool 2 DFLT you stacked</p>
                <p className='profile_info_number'>0</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>Pool 3 DFLT you stacked</p>
                <p className='profile_info_number'>0</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>Pool 4 DFLT you stacked</p>
                <p className='profile_info_number'>0</p>
              </div>
               */}
            </div>
            <div className='profile_info_container'>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My Yields</p>
                <p className='profile_info_number'>{myYieldsPool1}</p>
              </div>
            </div>
            <br></br>
            {address === ownerAddress1 || address === ownerAddress2 ?
              <Link to={'/adminPage'}>
                <button className='profile_button'>Admin</button>
              </Link>
            :''}

          </div>
      : 
        <div className='profile'>
          <p className='profile_address'>Are you logged in?</p>
        </div>
      }

    </div>
  )
}

export default Profile
