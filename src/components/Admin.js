import React from 'react'
import './Admin.css';
import { useState, useEffect } from "react";
import DeFiLabs from "../DeFiLabs.json";
import tokenerc20 from "../tokenerc20.json";
import Popup from "./Popup";
import TransactionToBeConfirmed from './TransactionToBeConfirmed';
import SubmitedTransactions from './SubmitedTransactions';
import Pool1 from "../Pool1.json";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';

const Admin = () => {
  
  const [dflTokensContract, updatedflTokensContract] = useState(0);
  const [mintDflTokens, updateMintDflTokens] = useState(0);
  const [burnDflTokens, updateBurnDflTokens] = useState(0);
  const [price, updatePrice] = useState(0);
  const [newPrice, updateNewPrice] = useState(0);
  const [addressNewOwner1, updateAddressNewOwner1] = useState('');
  const [addressNewOwner2, updateAddressNewOwner2] = useState('');
  const [ownerAddress1,updateOwnerAddress1] = useState('');
  const [ownerAddress2,updateOwnerAddress2] = useState('');
  const [ownerAddressPool1, updateOwnerAddressPool1] = useState('');
  const [newOwnerAddressPool1, updateNewOwnerAddressPool1] = useState('');
  const [stableCoinAddress, updateStableCoinAddress] = useState('');
  const [newStableCoinAddress, updateNewStableCoinAddress] = useState('');
  const [usdtAddressPool1, updateUsdtAddressPool1] = useState('');
  const [newUsdtAddressPool1, updateNewUsdtAddressPool1] = useState('');
  const [stableCoinsContract, updateStableCoinsContract] = useState(0);
  const [extraUsdtPool1, updateExtraUsdtPool1] = useState(0);
  const [usdtDontClaimedPool1, updateUsdtDontClaimedPool1] = useState(0);
  const [addAffiliateAddressPool1, updateAddAffiliateAddressPool1] = useState('');
  
  const [transferDflTokens, updateTransferDflTokens] = useState('');
  const [addressTransferDflTokens, updateAddressTransferDflTokens] = useState('');
  const [transferStableCoins, updateTransferStableCoins] = useState('');
  const [addressTransferStableCoins, updateAddressTransferStableCoins] = useState('');
  
  const [transferUSDTPool1, updateTransferUSDTPool1] = useState('');
  const [addressTransferUSDTPool1, updateAddressTransferUSDTPool1] = useState('');
  const [DFLleftPool1, updateDFLleftPool1] = useState(0);

  
  const [sendYield, updateSendYield] = useState('');
  const [sendYieldPourcentage, updateSendYieldPourcentage] = useState('');
  const [sendYieldPrice, updateSendYieldPrice] = useState('');
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [boolTransfer, updateBoolTransfer] = useState(false);
  const [boolTransferUsdtPool1, updateBoolTransferUsdtPool1] = useState(false);
  
  const [boolTransferDFL, updateBoolTransferDFL] = useState(false);
  const [boolSendYield, updateBoolsendYield] = useState(false);
  const [boolSubmitMint, updateBoolSubmitMint] = useState(false);
  const [boolSubmitBurn, updateBoolSubmitBurn] = useState(false);
  const [boolSubmitChangeOwner1, updateBoolSubmitChangeOwner1] = useState(false);
  const [boolSubmitChangeOwner2, updateBoolSubmitChangeOwner2] = useState(false);
  const [boolChangePrice, updateBoolChangePrice] = useState(false);
  const [boolChangeStableCoinAddress, updateBoolStableCoinAddress] = useState(false);
  const [boolUsdtAddressPool1, updateBoolUsdtAddressPool1] = useState(false);
  const [boolConfirmTransaction, updateBoolConfirmTransaction] = useState(false);
  const [boolDeleteTransaction, updateBoolDeleteTransaction] = useState(false);
  const [boolSubmitChangeOwnerAddressPool1, updateBoolSubmitChangeOwnerAddressPool1] = useState(false);
  const [boolAddAffiliateAddressPool1, updateboolAddAffiliateAddressPool1] = useState(false);
  const [transactionsToBeConfirmed, updateTransactionsToBeConfirmed] = useState([]);
  const [submitedTransactions, updatesubmitedTransactions] = useState([]);
  
  const ethers = require("ethers");
  const { address } = useAccount();
  

  async function confirmTransaction(i) {
    try {
      updateBoolConfirmTransaction(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      const dataConfirm = await waitForTransaction({
        hash: confirmSent
      })
      console.log(dataConfirm.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);

      let confirm = await contract.confirmTransaction(i);
      await confirm.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't confirm the transaction!");
      updateLoading(false);
      updateBoolConfirmTransaction(false);
      updatePopup(false);
    }
  }

  async function deleteTransaction(i) {
    try {
      updateBoolDeleteTransaction(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestDelete } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      const dataDelete = await waitForTransaction({
        hash: deleteSent
      })
      console.log(dataDelete.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let confirm = await contract.deleteTransaction(i);
      await confirm.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransaction(false);
      updatePopup(false);
    }
  }

  async function mint() {
    if(mintDflTokens!=='')
    try {
      updateBoolSubmitMint(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestMint } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['mint', DeFiLabs.address, ethers.utils.parseUnits(mintDflTokens)],
      });
      let { hash: mintSent } = await writeContract(requestMint)

      const dataMint = await waitForTransaction({
        hash: mintSent
      })
      console.log(dataMint.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);

      let transaction = await contract.submitTransaction('mint', DeFiLabs.address, ethers.utils.parseUnits(mintDflTokens));
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't mint!");
      updateLoading(false);
      updateBoolSubmitMint(false);
      updatePopup(false);
    }
  }

  async function burn() {
    if(burnDflTokens!=='')
    try {
      updateBoolSubmitBurn(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestBurn } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['burn', DeFiLabs.address, ethers.utils.parseUnits(burnDflTokens)],
      });
      let { hash: burnSent } = await writeContract(requestBurn)

      const dataBurn = await waitForTransaction({
        hash: burnSent
      })
      console.log(dataBurn.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('burn', DeFiLabs.address, ethers.utils.parseUnits(burnDflTokens));
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't burn!");
      updateLoading(false);
      updateBoolSubmitBurn(false);
      updatePopup(false);
    }
  }

  async function changePrice() {
    if(newPrice!==0)
    try {
      updateBoolChangePrice(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangePrice } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['changePrice', DeFiLabs.address, ethers.utils.parseUnits(newPrice)],
      });
      let { hash: changePriceSent } = await writeContract(requestChangePrice)

      const dataChangePrice = await waitForTransaction({
        hash: changePriceSent
      })
      console.log(dataChangePrice.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('changePrice', DeFiLabs.address, ethers.utils.parseUnits(newPrice));
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't change the price!");
      updateLoading(false);
      updateBoolChangePrice(false);
      updatePopup(false);
    }
  }

  async function changeOwner1() {
    if(addressNewOwner1!== '')
    try {
      updateBoolSubmitChangeOwner1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeOwner1 } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0],
      });
      let { hash: changeOwner1Sent } = await writeContract(requestChangeOwner1)

      const dataChangeOwner1 = await waitForTransaction({
        hash: changeOwner1Sent
      })
      console.log(dataChangeOwner1.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('changeOwner1', addressNewOwner1, 0);
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwner1(false);
      updatePopup(false);
    }
  }

  async function changeOwner2() {
    if(addressNewOwner2!== '')
    try {
      updateBoolSubmitChangeOwner2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeOwner2 } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0],
      });
      let { hash: changeOwner2Sent } = await writeContract(requestChangeOwner2)

      const dataChangeOwner2 = await waitForTransaction({
        hash: changeOwner2Sent
      })
      console.log(dataChangeOwner2.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('changeOwner2', addressNewOwner2, 0);
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwner2(false);
      updatePopup(false);
    }
  }

  async function changeStableCoinAddress() {
    if(newStableCoinAddress!== '')
    try {
      updateBoolStableCoinAddress(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeStableCoinAddress } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'changeStableCoinAddress',
        args: [newStableCoinAddress],
      });
      let { hash: changeStableCoinAddressSent } = await writeContract(requestChangeStableCoinAddress)

      const dataChangeStableCoinAddress = await waitForTransaction({
        hash: changeStableCoinAddressSent
      })
      console.log(dataChangeStableCoinAddress.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.changeStableCoinAddress(newStableCoinAddress);
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You can't change the stable coin address!");
      updateLoading(false);
      updateBoolStableCoinAddress(false);
      updatePopup(false);
    }
  }

  async function transfer() {
    if(transferStableCoins!== '' && transferStableCoins!=='')
    try {
      updateBoolTransfer(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestTransferStableCoins } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['transferStableCoins', addressTransferStableCoins, ethers.utils.parseUnits(transferStableCoins)],
      });
      let { hash: transferStableCoinsSent } = await writeContract(requestTransferStableCoins)

      const dataTransferStableCoins = await waitForTransaction({
        hash: transferStableCoinsSent
      })
      console.log(dataTransferStableCoins.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('transferStableCoins', addressTransferStableCoins, ethers.utils.parseUnits(transferStableCoins));
      await transaction.wait();
      */

      updateLoading(false);

    } catch (error) {
      alert("You don't have enough stable coins or the address is invalid!");
      updateLoading(false);
      updateBoolTransfer(false);
      updatePopup(false);
    }
  }

  async function transferDFL() {
    if(transferDflTokens!== '' && transferDflTokens!=='')
    try {
      updateBoolTransferDFL(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestTransferDFL } = await prepareWriteContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'submitTransaction',
        args: ['transferDFL', addressTransferDflTokens, ethers.utils.parseUnits(transferDflTokens)],
      });
      let { hash: transferDFLSent } = await writeContract(requestTransferDFL)

      const dataTransferDFL = await waitForTransaction({
        hash: transferDFLSent
      })
      console.log(dataTransferDFL.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(DeFiLabs.address, DeFiLabs.abi, signer);
      let transaction = await contract.submitTransaction('transferDFL', addressTransferDflTokens, ethers.utils.parseUnits(transferDflTokens));
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You don't have enough DFL tokens or the address is invalid!");
      updateLoading(false);
      updateBoolTransferDFL(false);
      updatePopup(false);
    }
  }

  async function sendYieldPool1() {
    if(sendYield!== '' && sendYieldPourcentage!=='' && sendYieldPrice!=='')
    try {
      updateBoolsendYield(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestApprovesendYield } = await prepareWriteContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'approve',
        args: [Pool1.address, ethers.utils.parseUnits(sendYield)],
      });
      let { hash: approvesendYieldSent } = await writeContract(requestApprovesendYield)

      const dataApprovesendYield = await waitForTransaction({
        hash: approvesendYieldSent
      })
      console.log(dataApprovesendYield.status)

      const { request: requestSendYield } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'sendYield',
        args: [ethers.utils.parseUnits(sendYield), ethers.utils.parseUnits(sendYieldPourcentage), ethers.utils.parseUnits(sendYieldPrice)],
      });
      let { hash: SendYieldSent } = await writeContract(requestSendYield)

      const dataSendYield = await waitForTransaction({
        hash: SendYieldSent
      })
      console.log(dataSendYield.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      let contractStableCoin = new ethers.Contract(tokenerc20.address, tokenerc20.abi, signer);
      
      let contractPool1 = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      
      let transaction1 = await contractStableCoin.approve(Pool1.address, ethers.utils.parseUnits(sendYield))
      await transaction1.wait();

      if(transaction1) {
        let transaction = await contractPool1.sendYield(ethers.utils.parseUnits(sendYield), ethers.utils.parseUnits(sendYieldPourcentage), ethers.utils.parseUnits(sendYieldPrice));
        await transaction.wait();
      }*/

      updateLoading(false);

    } catch (error) {
      updateLoading(false);
      updateBoolsendYield(false);
      updatePopup(false);
    }
  }

  async function changeOwnerAddressPool1() {
    if(newOwnerAddressPool1!== '')
    try {
      updateBoolSubmitChangeOwnerAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeOwnerPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'changeOwner',
        args: [newOwnerAddressPool1],
      });
      let { hash: changeOwnerPool1Sent } = await writeContract(requestChangeOwnerPool1)

      const dataChangeOwnerPool1 = await waitForTransaction({
        hash: changeOwnerPool1Sent
      })
      console.log(dataChangeOwnerPool1.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      let transaction = await contract.changeOwner(newOwnerAddressPool1);
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwnerAddressPool1(false);
      updatePopup(false);
    }
  }
  
  async function changeUsdtPool1() {
    if(newUsdtAddressPool1!== '')
    try {
      updateBoolUsdtAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeUsdtAddress } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'changeUsdtAddress',
        args: [newUsdtAddressPool1],
      });
      let { hash: changeUsdtAddressSent } = await writeContract(requestChangeUsdtAddress)

      const dataChangeUsdtAddress = await waitForTransaction({
        hash: changeUsdtAddressSent
      })
      console.log(dataChangeUsdtAddress.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      let transaction = await contract.changeUsdtAddress(newUsdtAddressPool1);
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You can't change the usdt address!");
      updateLoading(false);
      updateBoolUsdtAddressPool1(false);
      updatePopup(false);
    }
  }

  async function transferUsdtPool1() {
    if(transferUSDTPool1!== '' && addressTransferUSDTPool1!=='')
    try {
      updateBoolTransferUsdtPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestTransferUsdtPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'transferUsdt',
        args: [addressTransferUSDTPool1, ethers.utils.parseUnits(transferUSDTPool1)],
      });
      let { hash: transferUsdtPool1Sent } = await writeContract(requestTransferUsdtPool1)

      const dataTransferUsdtPool1 = await waitForTransaction({
        hash: transferUsdtPool1Sent
      })
      console.log(dataTransferUsdtPool1.status)

      /*
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(Pool1.address, Pool1.abi, signer);
      let transaction = await contract.transferUsdt(addressTransferUSDTPool1, ethers.utils.parseUnits(transferUSDTPool1));
      await transaction.wait();*/

      updateLoading(false);

    } catch (error) {
      alert("You don't have enough usdt or the address is invalid!");
      updateLoading(false);
      updateBoolTransferUsdtPool1(false);
      updatePopup(false);
    }
  }

  ///////////////
  async function functionAddAffiliateAddressPool1() {
    if(addAffiliateAddressPool1!== '')
    try {
      updateboolAddAffiliateAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestAddAffiliateAddressPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'addAffiliateAddress',
        args: [addAffiliateAddressPool1],
      });
      let { hash: addAffiliateAddressPool1Sent } = await writeContract(requestAddAffiliateAddressPool1)

      const dataAddAffiliateAddressPool1 = await waitForTransaction({
        hash: addAffiliateAddressPool1Sent
      })
      console.log(dataAddAffiliateAddressPool1.status)

      updateLoading(false);

    } catch (error) {
      alert("You can't add this address!");
      updateLoading(false);
      updateboolAddAffiliateAddressPool1(false);
      updatePopup(false);
    }
  }
  

  async function getData() {
    try {
      const readbalanceOfDflTokensContract = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'balanceOf',
        args: [DeFiLabs.address],
      })
      const balanceOfDflTokensContract = ethers.utils.formatEther(readbalanceOfDflTokensContract, 18);
      updatedflTokensContract(balanceOfDflTokensContract);

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

      const readPrice1 = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'price',
      })
      const readPrice = ethers.utils.formatEther(readPrice1, 18);
      updatePrice(readPrice);

      const readBalanceOfUSDT = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [DeFiLabs.address],
      })
      const balanceOfUSDT = ethers.utils.formatEther(readBalanceOfUSDT, 18);
      updateStableCoinsContract(balanceOfUSDT);

      const readStableCoinAddr = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'stableCoin',
      })
      updateStableCoinAddress(readStableCoinAddr);

      const readAddressOwnerPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'owner',
      })
      updateOwnerAddressPool1(readAddressOwnerPool1);

      const readUsdtAddressPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'usdt',
      })
      updateUsdtAddressPool1(readUsdtAddressPool1);

      const readUSDTDontClaimed = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getUSDTDontClaimed',
      })
      const usdtDontClaimed = ethers.utils.formatEther(readUSDTDontClaimed, 18);
      updateUsdtDontClaimedPool1(usdtDontClaimed);

      const readBalanceOfUsdtPool1 = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [Pool1.address],
      })
      const balanceOfUsdtPool1 = ethers.utils.formatEther(readBalanceOfUsdtPool1, 18);
      updateExtraUsdtPool1(balanceOfUsdtPool1-usdtDontClaimed);

      const readDFLTotal = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'balanceOf',
        args: [Pool1.address],
      })
      const balanceOfDFLPool1 = ethers.utils.formatEther(readDFLTotal, 18);

      const readTotalStacked = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'totalStacked',
      })
      const readTotalStackedPool1 = ethers.utils.formatEther(readTotalStacked, 18);
      updateDFLleftPool1(balanceOfDFLPool1-readTotalStackedPool1);
      console.log(balanceOfDFLPool1)
      console.log(readTotalStackedPool1)

      const readTransactionToBeConf = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      const readSubmitedTransaction = await readContract({
        address: DeFiLabs.address,
        abi: DeFiLabs.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })

      updateTransactionsToBeConfirmed(readTransactionToBeConf);
      updatesubmitedTransactions(readSubmitedTransaction);
    
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    
    <div className='admin_container'>
    {address === ownerAddress1 || address === ownerAddress2 ?
    <>
    <div className='admin'>
      <p className='admin_title'>Admin</p>
      <div className='admin_info_container'>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>DFL Tokens of the smart contract</p>
            <p className='admin_info_number'>{dflTokensContract}</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>Price of DFL Token</p>
            <p className='admin_info_number'>{price} USDT</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of the smart contract</p>
            <p className='admin_info_number'>{stableCoinsContract}</p>
          </div>
        </div>
          
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contract owner's address n°1</p>
            <p className='admin_info_number'>{ownerAddress1}</p>
          </div>
        </div>
            
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contract owner's address n°2</p>
            <p className='admin_info_number'>{ownerAddress2}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>USDT address</p>
            <p className='admin_info_number'>{stableCoinAddress}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool owner's address</p>
            <p className='admin_info_number'>{ownerAddressPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool usdt address</p>
            <p className='admin_info_number'>{usdtAddressPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool USDT don't claimed</p>
            <p className='admin_info_number'>{usdtDontClaimedPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Extra USDT Pool Left</p>
            <p className='admin_info_number'>{extraUsdtPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Extra DFL Pool Left</p>
            <p className='admin_info_number'>{DFLleftPool1}</p>
          </div>
        </div>

      </div>
    </div>
    
    <div className='admin'>

      <div className='admin_confirm'>
        <p className='admin_title'>Transactions to be confirmed</p>
        <>
        {transactionsToBeConfirmed && transactionsToBeConfirmed.map((value, index) => {
          return <TransactionToBeConfirmed data={value} index={index} key={index} confirmTransaction={confirmTransaction} deleteTransaction={deleteTransaction}></TransactionToBeConfirmed>;
        })}
        </>
        <>
        {submitedTransactions && submitedTransactions.map((value, index) => {
          return <SubmitedTransactions data={value} index={index} key={index} deleteTransaction={deleteTransaction}></SubmitedTransactions>;
        })}
        </>
        
        {transactionsToBeConfirmed && transactionsToBeConfirmed.length===0 && submitedTransactions.length===0 ? 
        <>
          <p className='admin_info'>none</p>
        </>
        :''
        }

      </div>
    </div>


      {popup && boolSubmitMint ? 
        <Popup loading={loading} number={mintDflTokens+' DFL tokens!'} action='submit: mint' updatePopup={updatePopup} updateBoolSubmitMint={updateBoolSubmitMint} >
        </Popup>
        :popup && boolSubmitBurn ? 
          <Popup loading={loading} number={burnDflTokens+' DFL tokens!'} action='submit: burn' updatePopup={updatePopup} updateBoolSubmitBurn={updateBoolSubmitBurn} >
          </Popup>
        :popup && boolSubmitChangeOwner1 ? 
        <Popup loading={loading} number={''} action={'submit: change the owner 1 to '+addressNewOwner1} updatePopup={updatePopup} updateBoolSubmitChangeOwner1={updateBoolSubmitChangeOwner1} >
        </Popup>
        :popup && boolSubmitChangeOwner2 ? 
        <Popup loading={loading} number={''} action={'submit: change the owner 2 to '+addressNewOwner2} updatePopup={updatePopup} updateBoolSubmitChangeOwner2={updateBoolSubmitChangeOwner2} >
        </Popup>
        :popup && boolChangePrice ? 
        <Popup loading={loading} number={''} action={'submit: change the price to '+newPrice} updatePopup={updatePopup} updateBoolChangePrice={updateBoolChangePrice} >
        </Popup>
        :popup && boolChangeStableCoinAddress ? 
        <Popup loading={loading} number={''} action={'change the stable coin address to '+newStableCoinAddress} updatePopup={updatePopup} updateBoolStableCoinAddress={updateBoolStableCoinAddress} >
        </Popup>
        :popup && boolTransfer ? 
        <Popup loading={loading} number={transferStableCoins+' stable coins to: ' + addressTransferStableCoins} action='submit: transfer' updatePopup={updatePopup} updateBoolTransfer={updateBoolTransfer} >
        </Popup>
        :popup && boolTransferDFL ? 
        <Popup loading={loading} number={transferDflTokens+' DFL Tokens!'} action='submit: transfer' updatePopup={updatePopup} updateBoolTransferDFL={updateBoolTransferDFL}>
        </Popup>
        :popup && boolSendYield? 
        <Popup loading={loading} number={sendYield +' usdt to users'} action='sent ' updatePopup={updatePopup} updateBoolsendYield={updateBoolsendYield}>
        </Popup>
        : boolConfirmTransaction ?
        <Popup loading={loading} number={''} action={'confirmed the transaction'} updatePopup={updatePopup} updateBoolConfirmTransaction={updateBoolConfirmTransaction} >
        </Popup>
        : boolDeleteTransaction ?
        <Popup loading={loading} number={''} action={'deleted the transaction'} updatePopup={updatePopup} updateBoolDeleteTransaction={updateBoolDeleteTransaction} >
        </Popup>
        :popup && boolSubmitChangeOwnerAddressPool1 ? 
        <Popup loading={loading} number={''} action={'change the pool 1 owner to '+ newOwnerAddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeOwnerAddressPool1={updateBoolSubmitChangeOwnerAddressPool1} >
        </Popup>
        :popup && boolUsdtAddressPool1 ? 
        <Popup loading={loading} number={''} action={'change the usdt address of the pool 1 to '+ newUsdtAddressPool1} updatePopup={updatePopup} updateBoolUsdtAddressPool1={updateBoolUsdtAddressPool1} >
        </Popup>
        :popup && boolTransferUsdtPool1 ? 
        <Popup loading={loading} number={transferUSDTPool1+' usdt to: ' + addressTransferUSDTPool1} action='transfer' updatePopup={updatePopup} updateBoolTransferUsdtPool1={updateBoolTransferUsdtPool1} >
        </Popup>
        :popup && boolAddAffiliateAddressPool1 ? 
        <Popup loading={loading} number='' action={'add ' + addAffiliateAddressPool1 + " on affiliate address list!"} updatePopup={updatePopup} updateboolAddAffiliateAddressPool1={updateboolAddAffiliateAddressPool1} >
        </Popup>
        :''
      }
      
      
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Mint DFL Tokens</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="dfl" type="number" placeholder="Number of tokens" value={mintDflTokens} onChange={e => updateMintDflTokens(e.target.value)}></input>
          <p>DFL Token</p>
        </div>
        <button className="admin_button" onClick={() => mint()}>
          Submit Mint Tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Burn DFL Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="dfl" type="number" placeholder="Number of tokens" value={burnDflTokens} onChange={e => updateBurnDflTokens(e.target.value)}></input>
          <p>DFL Token</p>
        </div>
        <button className="admin_button" onClick={() => burn()}>
          Submit Burn tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Owner 1</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={addressNewOwner1} onChange={e => updateAddressNewOwner1(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwner1()}>
          Submit Change Owner 1
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Owner 2</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={addressNewOwner2} onChange={e => updateAddressNewOwner2(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwner2()}>
          Submit Change Owner 2
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Price</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="price" type="number" placeholder="Price of DFL token" value={newPrice} onChange={e => updateNewPrice(e.target.value)}></input>
          <p>Price DFL token</p>
        </div>
        <button className="admin_button" onClick={() => changePrice()}>
          Submit Change Price
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change USDT Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newStableCoinAddress} onChange={e => updateNewStableCoinAddress(e.target.value)}></input>
          <p>New usdt's address</p>
        </div>
        <button className="admin_button" onClick={() => changeStableCoinAddress()}>
          Change USDT Address
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Transfer USDT</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="stablecoin" type="number" placeholder="Price in usdt" value={transferStableCoins} onChange={e => updateTransferStableCoins(e.target.value)}></input>
          <p>USDT</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="Address" value={addressTransferStableCoins} onChange={e => updateAddressTransferStableCoins(e.target.value)}></input>
          <p>Address</p>
        </div>
        <button className="admin_button" onClick={() => transfer()}>
          Submit Transfer USDT
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Transfer DFL Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="dfl" type="number" placeholder="Number of tokens" value={transferDflTokens} onChange={e => updateTransferDflTokens(e.target.value)}></input>
          <p>DFL Token</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="Address" value={addressTransferDflTokens} onChange={e => updateAddressTransferDflTokens(e.target.value)}></input>
          <p>Address</p>
        </div>
        <button className="admin_button" onClick={() => transferDFL()}>
          Submit Transfer DFL Tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Send Yield to Pool 1</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="stablecoin" type="number" placeholder="Price in USDT" value={sendYield} onChange={e => updateSendYield(e.target.value)}></input>
          <p>USDT</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="pourcentage" type="number" placeholder="Pourcentage" value={sendYieldPourcentage} onChange={e => updateSendYieldPourcentage(e.target.value)}></input>
          <p>Pourcentage</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="price" type="number" placeholder="Price of DFLT" value={sendYieldPrice} onChange={e => updateSendYieldPrice(e.target.value)}></input>
          <p>Price</p>
        </div>
        <button className="admin_button" onClick={() => sendYieldPool1()}>
          Send Yield
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change Owner's address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newOwnerAddressPool1} onChange={e => updateNewOwnerAddressPool1(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwnerAddressPool1()}>
          Change Owner's address
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change USDT Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newUsdtAddressPool1} onChange={e => updateNewUsdtAddressPool1(e.target.value)}></input>
          <p>New usdt's address</p>
        </div>
        <button className="admin_button" onClick={() => changeUsdtPool1()}>
          Change USDT Address
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Transfer USDT</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="stablecoin" type="number" placeholder="Price in usdt" value={transferUSDTPool1} onChange={e => updateTransferUSDTPool1(e.target.value)}></input>
          <p>USDT</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="Address" value={addressTransferUSDTPool1} onChange={e => updateAddressTransferUSDTPool1(e.target.value)}></input>
          <p>Address</p>
        </div>
        <button className="admin_button" onClick={() => transferUsdtPool1()}>
          Transfer USDT
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 add affiliate address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Affiliate Address" value={addAffiliateAddressPool1} onChange={e => updateAddAffiliateAddressPool1(e.target.value)}></input>
          <p>New affiliate address</p>
        </div>
        <button className="admin_button" onClick={() => functionAddAffiliateAddressPool1()}>
          Add Address
        </button>
      </div>
    </div>

  </>
    : '' }
    </div>
  )
}

export default Admin
