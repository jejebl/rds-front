import React from 'react'
import './Profile.css';
import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import RDS from "../RDS.json";
import Pool1 from "../Pool1.json";
import Pool2 from "../Pool2.json";
import Pool3 from "../Pool3.json";
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

const Profile = () => {
  
  const [dflTokens, updatedflTokens] = useState(0);
  const [myStackPool1, updateMyStackPool1] = useState(0);
  const [myStackPool2, updateMyStackPool2] = useState(0);
  const [myStackPool3, updateMyStackPool3] = useState(0);
  const [ownerAddress1,updateOwnerAddress1] = useState('');
  const [ownerAddress2,updateOwnerAddress2] = useState('');
  const [myYieldsPool1, updateMyYieldsPool1] = useState(0);
  const [myYieldsPool2, updateMyYieldsPool2] = useState(0);
  const [myYieldsPool3, updateMyYieldsPool3] = useState(0);
  const [amountRDSAffiliate1, updateAmountRDSAffiliate1] = useState(0);
  const [amountRDSAffiliate2, updateAmountRDSAffiliate2] = useState(0);
  const [amountRDSAffiliate3, updateAmountRDSAffiliate3] = useState(0);
  const [affiliateAddress1, updateAffiliateAddress1] = useState([]);
  const [affiliateAddress2, updateAffiliateAddress2] = useState([]);
  const [affiliateAddress3, updateAffiliateAddress3] = useState([]);
  
  const ethers = require("ethers");
  const { address } = useAccount();

  async function getData() {
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
      updateMyStackPool1(stack);

      const readgetMyStacks2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getMyStacks',
        args: [address]
      })
      const stack2 = ethers.utils.formatEther(readgetMyStacks2, 18);
      updateMyStackPool2(stack2);

      const readgetMyStacks3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getMyStacks',
        args: [address]
      })
      const stack3 = ethers.utils.formatEther(readgetMyStacks3, 18);
      updateMyStackPool3(stack3);

      const readAddressOwner1 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [0],
      })
      updateOwnerAddress1(readAddressOwner1);

      const readAddressOwner2 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [1],
      })
      updateOwnerAddress2(readAddressOwner2);

      //Yields

      //Pool 1
      const readgetMyYields = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyYields',
        args: [address]
      })
      const yields = ethers.utils.formatEther(readgetMyYields, 18);
      updateMyYieldsPool1(yields);
      
      //Pool 2
      const readgetMyYields2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getMyYields',
        args: [address]
      })
      const yields2 = ethers.utils.formatEther(readgetMyYields2, 18);
      updateMyYieldsPool2(yields2);
      
      //Pool 3
      const readgetMyYields3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getMyYields',
        args: [address]
      })
      const yields3 = ethers.utils.formatEther(readgetMyYields3, 18);
      updateMyYieldsPool3(yields3);

      //Pool 1
      const readgetAmountAffiliate1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyAffiliateInfoAmount',
        args: [address]
      })
      const amountAffiliate1 = ethers.utils.formatEther(readgetAmountAffiliate1, 18);
      updateAmountRDSAffiliate1(amountAffiliate1);
      console.log(amountAffiliate1);

      const readgetListAffiliate1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getMyAffiliateInfoListAddr',
        args: [address]
      })
      const listAffiliate1 = readgetListAffiliate1;
      updateAffiliateAddress1(listAffiliate1);
      console.log(listAffiliate1)

      //Pool 2
      const readgetAmountAffiliate2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getMyAffiliateInfoAmount',
        args: [address]
      })
      const amountAffiliate2 = ethers.utils.formatEther(readgetAmountAffiliate2, 18);
      updateAmountRDSAffiliate2(amountAffiliate2);

      const readgetListAffiliate2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getMyAffiliateInfoListAddr',
        args: [address]
      })
      const listAffiliate2 = readgetListAffiliate2;
      updateAffiliateAddress2(listAffiliate2);

      //Pool 3
      const readgetAmountAffiliate3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getMyAffiliateInfoAmount',
        args: [address]
      })
      const amountAffiliate3 = ethers.utils.formatEther(readgetAmountAffiliate3, 18);
      updateAmountRDSAffiliate3(amountAffiliate3);

      const readgetListAffiliate3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getMyAffiliateInfoListAddr',
        args: [address]
      })
      const listAffiliate3 = readgetListAffiliate3;
      updateAffiliateAddress3(listAffiliate3);

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
                <p className='profile_info_title'>My DFL</p>
                <p className='profile_info_number'>{dflTokens} DFL</p>
              </div>
            </div>
            
            <div className='profile_info_container'>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My stacks Pool 1</p>
                <p className='profile_info_number'>{myStackPool1}</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My stacks Pool 2</p>
                <p className='profile_info_number'>{myStackPool2}</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My stacks Pool 3</p>
                <p className='profile_info_number'>{myStackPool3}</p>
              </div>
            </div>
            <div className='profile_info_container'>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My Yields Pool 1</p>
                <p className='profile_info_number'>{myYieldsPool1}</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My Yields Pool 2</p>
                <p className='profile_info_number'>{myYieldsPool2}</p>
              </div>
              <div className='profile_description_line'>
                <p className='profile_info_title'>My Yields Pool 3</p>
                <p className='profile_info_number'>{myYieldsPool3}</p>
              </div>
            </div>
            
              <div className='profile_info_container_Affiliate'>
                <div className='profile_description_line_affiliate'>
                  <a href='profile'>
                    <p className='profile_info_title'>DFL with affiliation Pool 1</p>
                    <p className='profile_info_number'>{amountRDSAffiliate1}</p>
                  </a>
                </div>
                <div className='profile_description_line_affiliate'>
                  <p className='profile_info_title'>DFL with affiliation Pool 2</p>
                  <p className='profile_info_number'>{amountRDSAffiliate2}</p>
                </div>
                <div className='profile_description_line_affiliate'>
                  <p className='profile_info_title'>DFL with affiliation Pool 3</p>
                  <p className='profile_info_number'>{amountRDSAffiliate3}</p>
                </div>
              </div>
              <div className='profile_info_container_Affiliate'>
                <div className='profile_description_line_affiliate'>
                  <p className='profile_info_title'>List address affiliated Pool 1</p>
                  {affiliateAddress1.length!==0 && affiliateAddress1.map((value, index) => {
                    return <p className='profile_info_listAffiliateAddress'>{value}</p>;
                  })}
                  {affiliateAddress1.length===0 ?
                    <p className='profile_info_number'>none</p>
                  : '' }
                </div>
                <div className='profile_description_line_affiliate'>
                  <p className='profile_info_title'>List address affiliated Pool 2</p>
                  {affiliateAddress2.length!==0 && affiliateAddress2.map((value, index) => {
                    return <p className='profile_info_listAffiliateAddress'>{value}</p>;
                  })}
                  {affiliateAddress2.length===0 ?
                    <p className='profile_info_number'>none</p>
                  : '' }
                </div>
                <div className='profile_description_line_affiliate'>
                  <p className='profile_info_title'>List address affiliated Pool 3</p>
                  {affiliateAddress3.length!==0 && affiliateAddress3.map((value, index) => {
                    return <p className='profile_info_listAffiliateAddress'>{value}</p>;
                  })}
                  {affiliateAddress3.length===0 ?
                    <p className='profile_info_number'>none</p>
                  : '' }
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
