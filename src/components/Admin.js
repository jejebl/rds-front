import React from 'react'
import './Admin.css';
import { useState, useEffect } from "react";
import RWAR from "../RWAR.json";
import tokenerc20 from "../tokenerc20.json";
import Popup from "./Popup";
import TransactionToBeConfirmed from './TransactionToBeConfirmed';
import TransactionToBeConfirmedPool from './TransactionToBeConfirmedPool';
import SubmitedTransactions from './SubmitedTransactions';
import SubmitedTransactionsPool from './SubmitedTransactionsPool';
import Pool1 from "../Pool1.json";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';

const Admin = () => {

  //Address of the Safe Wallet
  const addressUSDTSafeWallet = "0xcbFD67144Fbc2B32b26D10d59E289D934ea045e2";
  const addressReserveSafeWallet = "0x0fB9838Ef019a9e546b56bd5726025aC8662eE37";
  const addressTeamSafeWallet = "0x9F5396C7e899ff967222F2Be35BD3f3aB9331031";
  const addressDevelopmentSafeWallet = "0x434b991915465B8175bfCcfD806CB29078680951";
  const addressMarketingSafeWallet = "0x671bbd03D1fbcA8A2aB46eC1a250B19a224Bbf82";
  const addressPublicRWARSafeWallet = "0x031B67aD424DA58b2c8C9004D0Bf5B964Cf5351d";
  const addressPrivateRWARSafeWallet = "0x7106944B77ac18ae1f31e63c164e37Ca334E68d1";

  //USDT of the Safe Wallet
  const [usdtUSDTWalletSafe, updateUsdtWalletSafe] = useState(0);
  const [usdtReserveWalletSafe, updateUsdtReserveWalletSafe] = useState(0);
  const [usdtDevelopmentWalletSafe, updateUsdtDevelopmentWalletSafe] = useState(0);
  const [usdtTeamWalletSafe, updateUsdtTeamWalletSafe] = useState(0);

  //RWAR of the Safe Wallet
  const [rwarReserveWalletSafe, updateRwarReserveWalletSafe] = useState(0);
  const [rwarDevelopmentWalletSafe, updateRwarDevelopmentWalletSafe] = useState(0);
  const [rwarTeamWalletSafe, updateRwarTeamWalletSafe] = useState(0);
  const [rwarMarketingWalletSafe, updateRwarMarketingWalletSafe] = useState(0);
  const [rwarPublicRWARWalletSafe, updateRwarPublicRWARWalletSafe] = useState(0);
  const [rwarPrivateRWARWalletSafe, updateRwarPrivateRWARWalletSafe] = useState(0);

  
  
  const [RWARTokensContract, updateRWARTokensContract] = useState(0);
  const [mintRWARTokens, updateMintRWARTokens] = useState(0);
  const [burnRWARTokens, updateBurnRWARTokens] = useState(0);
  const [price, updatePrice] = useState(0);
  const [newPrice, updateNewPrice] = useState(0);
  const [addressNewOwner1, updateAddressNewOwner1] = useState('');
  const [addressNewOwner2, updateAddressNewOwner2] = useState('');
  const [ownerAddress1,updateOwnerAddress1] = useState('');
  const [ownerAddress2,updateOwnerAddress2] = useState('');
  const [owner1AddressPool1, updateOwner1AddressPool1] = useState('');
  const [newOwner1AddressPool1, updateNewOwner1AddressPool1] = useState('');
  const [owner2AddressPool1, updateOwner2AddressPool1] = useState('');
  const [newOwner2AddressPool1, updateNewOwner2AddressPool1] = useState('');

  
  const [rwarWalletAddressPool1, updateRWARWalletAddressPool1] = useState('');
  const [newRWARWalletAddressPool1, updateNewRWARWalletAddressPool1] = useState('');
  const [marketingWalletAddressPool1, updateMarketingWalletAddressPool1] = useState('');
  const [newMarketingWalletAddressPool1, updateNewMarketingWalletAddressPool1] = useState('');


  const [usdtAddressRWAR, updateUsdtAddressRWAR] = useState('');
  const [newUsdtAddressRWAR, updateNewUsdtAddressRWAR] = useState('');
  const [reserveWalletAddressRWAR, updateReserveWalletAddressRWAR] = useState('');
  const [newReserveWalletAddressRWAR, updateNewReserveWalletAddressRWAR] = useState('');
  const [safeUSDTWalletAddressRWAR, updateSafeUSDTWalletAddressRWAR] = useState('');
  const [newSafeUSDTWalletAddressRWAR, updateNewSafeUSDTWalletAddressRWAR] = useState('');
  
  const [usdtAddressPool1, updateUsdtAddressPool1] = useState('');
  const [newUsdtAddressPool1, updateNewUsdtAddressPool1] = useState('');
  const [usdtPool1, updateUSDTPool1] = useState(0);
  //const [usdtDontClaimedPool1, updateUsdtDontClaimedPool1] = useState(0);
  const [addAffiliateAddressPool1, updateAddAffiliateAddressPool1] = useState('');
  
  const [transferRWARTokens, updateTransferRWARTokens] = useState('');
  const [addressTransferRWARTokens, updateAddressTransferRWARTokens] = useState('');
  const [transferStableCoins, updateTransferStableCoins] = useState('');
  const [addressTransferStableCoins, updateAddressTransferStableCoins] = useState('');
  
  const [balanceRWARPool, updateBalanceRWARPool] = useState(0);
  const [rwarTotalStackedPool1, updateRWARTotalStackedPool1] = useState(0);
  

  const [totalStacked7Days, updateTotalStacked7Days] = useState(0);
  

  const [sendYield, updateSendYield] = useState('');
  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);
  const [boolTransfer, updateBoolTransfer] = useState(false);
  
  const [boolTransferRWAR, updateBoolTransferRWAR] = useState(false);
  const [boolSendYield, updateBoolsendYield] = useState(false);
  const [boolSubmitMint, updateBoolSubmitMint] = useState(false);
  const [boolSubmitBurn, updateBoolSubmitBurn] = useState(false);
  const [boolSubmitChangeOwner1, updateBoolSubmitChangeOwner1] = useState(false);
  const [boolSubmitChangeOwner2, updateBoolSubmitChangeOwner2] = useState(false);
  const [boolChangePrice, updateBoolChangePrice] = useState(false);
  const [boolChangeUsdtAddressRWAR, updateBoolChangeUsdtAddressRWAR] = useState(false);
  const [boolChangeReserveWalletAddressRWAR, updateBoolChangeReserveWalletAddressRWAR] = useState(false);
  const [boolChangeSafeUSDTWalletAddressRWAR, updateBoolChangeSafeUSDTWalletAddressRWAR] = useState(false);
  const [boolUsdtAddressPool1, updateBoolUsdtAddressPool1] = useState(false);
  const [boolSubmitChangeOwner1AddressPool1, updateBoolSubmitChangeOwner1AddressPool1] = useState(false);
  const [boolSubmitChangeOwner2AddressPool1, updateBoolSubmitChangeOwner2AddressPool1] = useState(false);
  
  const [boolSubmitChangeRWARWalletAddressPool1, updateBoolSubmitChangeRWARWalletAddressPool1] = useState(false);
  const [boolSubmitChangeMarketingWalletAddressPool1, updateBoolSubmitChangeMarketingWalletAddressPool1] = useState(false);
  const [boolAddAffiliateAddressPool1, updateboolAddAffiliateAddressPool1] = useState(false);
  const [boolConfirmTransaction, updateBoolConfirmTransaction] = useState(false);
  const [boolDeleteTransaction, updateBoolDeleteTransaction] = useState(false);
  const [transactionsToBeConfirmed, updateTransactionsToBeConfirmed] = useState([]);
  const [submitedTransactions, updatesubmitedTransactions] = useState([]);

  //Submit Pool
  const [boolConfirmTransactionPool, updateBoolConfirmTransactionPool] = useState(false);
  const [boolDeleteTransactionPool, updateBoolDeleteTransactionPool] = useState(false);
  const [transactionsToBeConfirmedPool, updateTransactionsToBeConfirmedPool] = useState([]);
  const [submitedTransactionsPool, updatesubmitedTransactionsPool] = useState([]);
  
  const ethers = require("ethers");
  const { address } = useAccount();
  

  async function confirmTransaction(i) {
    try {
      updateBoolConfirmTransaction(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      const dataConfirm = await waitForTransaction({
        hash: confirmSent
      })

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
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      const dataDelete = await waitForTransaction({
        hash: deleteSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransaction(false);
      updatePopup(false);
    }
  }

  //Function Confirm and delete Pool
  async function confirmTransactionPool(i) {
    try {
      updateBoolConfirmTransactionPool(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      const dataConfirmPool = await waitForTransaction({
        hash: confirmSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't confirm the transaction!");
      updateLoading(false);
      updateBoolConfirmTransactionPool(false);
      updatePopup(false);
    }
  }

  async function deleteTransactionPool(i) {
    try {
      updateBoolDeleteTransactionPool(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestDelete } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      const dataDeletePool = await waitForTransaction({
        hash: deleteSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransactionPool(false);
      updatePopup(false);
    }
  }

  async function mint() {
    if(mintRWARTokens!=='')
    try {
      updateBoolSubmitMint(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestMint } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['mint', RWAR.address, ethers.utils.parseUnits(mintRWARTokens)],
      });
      let { hash: mintSent } = await writeContract(requestMint)

      const dataMint = await waitForTransaction({
        hash: mintSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't mint!");
      updateLoading(false);
      updateBoolSubmitMint(false);
      updatePopup(false);
    }
  }

  async function burn() {
    if(burnRWARTokens!=='')
    try {
      updateBoolSubmitBurn(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestBurn } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['burn', RWAR.address, ethers.utils.parseUnits(burnRWARTokens)],
      });
      let { hash: burnSent } = await writeContract(requestBurn)

      const dataBurn = await waitForTransaction({
        hash: burnSent
      })

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
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['changePrice', RWAR.address, ethers.utils.parseUnits(newPrice)],
      });
      let { hash: changePriceSent } = await writeContract(requestChangePrice)

      const dataChangePrice = await waitForTransaction({
        hash: changePriceSent
      })

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
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0],
      });
      let { hash: changeOwner1Sent } = await writeContract(requestChangeOwner1)

      const dataChangeOwner1 = await waitForTransaction({
        hash: changeOwner1Sent
      })

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
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0],
      });
      let { hash: changeOwner2Sent } = await writeContract(requestChangeOwner2)

      const dataChangeOwner2 = await waitForTransaction({
        hash: changeOwner2Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwner2(false);
      updatePopup(false);
    }
  }

  async function changeUSDTAddress() {
    if(newUsdtAddressRWAR!== '')
    try {
      updateBoolChangeUsdtAddressRWAR(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeUSDTAddress } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'changeUSDTAddress',
        args: [newUsdtAddressRWAR],
      });
      let { hash: changeUSDTAddressSent } = await writeContract(requestChangeUSDTAddress)

      const dataChangeUSDTAddress = await waitForTransaction({
        hash: changeUSDTAddressSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the usdt address!");
      updateLoading(false);
      updateBoolChangeUsdtAddressRWAR(false);
      updatePopup(false);
    }
  }

  async function changeReserveWalletAddressRWAR() {
    if(newReserveWalletAddressRWAR!== '')
    try {
      updateBoolChangeReserveWalletAddressRWAR(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeReserveWalletAddressRWAR } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['changeReserveWallet', newReserveWalletAddressRWAR, 0]
      });
      let { hash: changeChangeReserveWalletAddressRWARSent } = await writeContract(requestChangeReserveWalletAddressRWAR)

      const dataChangeReserveWalletAddressRWAR = await waitForTransaction({
        hash: changeChangeReserveWalletAddressRWARSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the reserve wallet address RWAR!");
      updateLoading(false);
      updateBoolChangeReserveWalletAddressRWAR(false);
      updatePopup(false);
    }
  }

  async function changeSafeUSDTWalletAddressRWAR() {
    if(newSafeUSDTWalletAddressRWAR!== '')
    try {
      updateBoolChangeSafeUSDTWalletAddressRWAR(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeSafeUSDTWalletAddressRWAR } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['changeSafeUSDTWallet', newSafeUSDTWalletAddressRWAR, 0]
      });
      let { hash: changeChangeSafeUSDTWalletAddressRWARSent } = await writeContract(requestChangeSafeUSDTWalletAddressRWAR)

      const dataChangeSafeUSDTWalletAddressRWAR = await waitForTransaction({
        hash: changeChangeSafeUSDTWalletAddressRWARSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the reserve wallet address RWAR!");
      updateLoading(false);
      updateBoolChangeSafeUSDTWalletAddressRWAR(false);
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
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['transferUSDT', addressTransferStableCoins, ethers.utils.parseUnits(transferStableCoins)],
      });
      let { hash: transferStableCoinsSent } = await writeContract(requestTransferStableCoins)

      const dataTransferStableCoins = await waitForTransaction({
        hash: transferStableCoinsSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You don't have enough stable coins or the address is invalid!");
      updateLoading(false);
      updateBoolTransfer(false);
      updatePopup(false);
    }
  }

  async function transferRWAR() {
    if(transferRWARTokens!== '' && transferRWARTokens!=='')
    try {
      updateBoolTransferRWAR(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestTransferRWAR } = await prepareWriteContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'submitTransaction',
        args: ['transferRWAR', addressTransferRWARTokens, ethers.utils.parseUnits(transferRWARTokens)],
      });
      let { hash: transferRWARSent } = await writeContract(requestTransferRWAR)

      const dataTransferRWAR = await waitForTransaction({
        hash: transferRWARSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You don't have enough RWAR tokens or the address is invalid!");
      updateLoading(false);
      updateBoolTransferRWAR(false);
      updatePopup(false);
    }
  }

  async function sendYieldPool1() {
    if(sendYield!== '')
    try {
      updateBoolsendYield(true);
      updateLoading(true);
      updatePopup(true);
/*
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
      console.log(dataApprovesendYield.status)*/

      const { request: requestSendYield } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['sendYield', Pool1.address, ethers.utils.parseUnits(sendYield)]
      });
      let { hash: SendYieldSent } = await writeContract(requestSendYield)

      const dataSendYield = await waitForTransaction({
        hash: SendYieldSent
      })

      updateLoading(false);

    } catch (error) {
      updateLoading(false);
      updateBoolsendYield(false);
      updatePopup(false);
    }
  }

  async function changeOwner1AddressPool1() {
    if(newOwner1AddressPool1!== '')
    try {
      updateBoolSubmitChangeOwner1AddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeOwner1Pool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', newOwner1AddressPool1, 0]
      });
      let { hash: changeOwner1Pool1Sent } = await writeContract(requestChangeOwner1Pool1)

      const dataChangeOwner1Pool1 = await waitForTransaction({
        hash: changeOwner1Pool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner 1 address!");
      updateLoading(false);
      updateBoolSubmitChangeOwner1AddressPool1(false);
      updatePopup(false);
    }
  }

  async function changeOwner2AddressPool1() {
    if(newOwner2AddressPool1!== '')
    try {
      updateBoolSubmitChangeOwner2AddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeOwner2Pool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', newOwner2AddressPool1, 0]
      });
      let { hash: changeOwner2Pool1Sent } = await writeContract(requestChangeOwner2Pool1)

      const dataChangeOwner2Pool1 = await waitForTransaction({
        hash: changeOwner2Pool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner 2 address!");
      updateLoading(false);
      updateBoolSubmitChangeOwner2AddressPool1(false);
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

      updateLoading(false);

    } catch (error) {
      alert("You can't change the usdt address!");
      updateLoading(false);
      updateBoolUsdtAddressPool1(false);
      updatePopup(false);
    }
  }

  async function changeRWARWalletAddressPool1() {
    if(newRWARWalletAddressPool1!== '')
    try {
      updateBoolSubmitChangeRWARWalletAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeRWARWalletAddressPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeRwarWalletAddress', newRWARWalletAddressPool1, 0]
      });
      let { hash: changeRWARWalletAddressPool1Sent } = await writeContract(requestChangeRWARWalletAddressPool1)

      const dataChangeRWARWalletAddressPool1 = await waitForTransaction({
        hash: changeRWARWalletAddressPool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the Pool 1 RWAR Wallet address!");
      updateLoading(false);
      updateBoolSubmitChangeRWARWalletAddressPool1(false);
      updatePopup(false);
    }
  }

  async function changeMarketingWalletAddressPool1() {
    if(newMarketingWalletAddressPool1!== '')
    try {
      updateBoolSubmitChangeMarketingWalletAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeMarketingWalletAddressPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeMarketingWalletAddress', newMarketingWalletAddressPool1, 0]
      });
      let { hash: changeMarketingWalletAddressPool1Sent } = await writeContract(requestChangeMarketingWalletAddressPool1)

      const dataChangeMarketingWalletAddressPool1 = await waitForTransaction({
        hash: changeMarketingWalletAddressPool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the Pool 1 Marketing Wallet address!");
      updateLoading(false);
      updateBoolSubmitChangeMarketingWalletAddressPool1(false);
      updatePopup(false);
    }
  }

  async function functionAddAffiliateAddressPool1() {
    if(addAffiliateAddressPool1!== '')
    try {
      updateboolAddAffiliateAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestAddAffiliateAddressPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['addAffiliateAddress', Pool1.address, addAffiliateAddressPool1]
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
      
      //Balance RWAR of RWAR SC
      const readbalanceOfRWARTokensContract = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [RWAR.address],
      })
      const balanceOfRWARTokensContract = ethers.utils.formatEther(readbalanceOfRWARTokensContract, 18);
      updateRWARTokensContract(balanceOfRWARTokensContract);

      //Address owner 1 of RWAR SC
      const readAddressOwner1 = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'owners',
        args: [0],
      })
      updateOwnerAddress1(readAddressOwner1);

      //Address owner 2 of RWAR SC
      const readAddressOwner2 = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'owners',
        args: [1],
      })
      updateOwnerAddress2(readAddressOwner2);

      //Price RWAR
      const readPrice1 = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'price',
      })
      const readPrice = ethers.utils.formatEther(readPrice1, 18);
      updatePrice(readPrice);

      
      //Balance USDT of the Safe Wallet
      
      //USDT Safe
      const readBalanceOfUSDTSafeWallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressUSDTSafeWallet],
      })
      const balanceOfUSDTSafeWallet = ethers.utils.formatEther(readBalanceOfUSDTSafeWallet, 18);
      updateUsdtWalletSafe(balanceOfUSDTSafeWallet);

      //Reserve
      const readBalanceOfUSDTReserveSafeWallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressReserveSafeWallet],
      })
      const balanceOfUSDTReserveSafeWallet = ethers.utils.formatEther(readBalanceOfUSDTReserveSafeWallet, 18);
      updateUsdtReserveWalletSafe(balanceOfUSDTReserveSafeWallet);
      
      //Development
      const readBalanceOfUSDTDevelopmentSafeWallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressDevelopmentSafeWallet],
      })
      const balanceOfUSDTDevelopmentSafeWallet = ethers.utils.formatEther(readBalanceOfUSDTDevelopmentSafeWallet, 18);
      updateUsdtDevelopmentWalletSafe(balanceOfUSDTDevelopmentSafeWallet);

      //Team
      const readBalanceOfUSDTTeamSafeWallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressTeamSafeWallet],
      })
      const balanceOfUSDTTeamSafeWallet = ethers.utils.formatEther(readBalanceOfUSDTTeamSafeWallet, 18);
      updateUsdtTeamWalletSafe(balanceOfUSDTTeamSafeWallet);


      //Balance RWAR of the Safe Wallet

      //Reserve
      const readBalanceOfRWARReserveSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressReserveSafeWallet],
      })
      const balanceOfRWARReserveSafeWallet = ethers.utils.formatEther(readBalanceOfRWARReserveSafeWallet, 18);
      updateRwarReserveWalletSafe(balanceOfRWARReserveSafeWallet);

      //Development
      const readBalanceOfRWARDevelopmentSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressDevelopmentSafeWallet],
      })
      const balanceOfRWARDevelopmentSafeWallet = ethers.utils.formatEther(readBalanceOfRWARDevelopmentSafeWallet, 18);
      updateRwarDevelopmentWalletSafe(balanceOfRWARDevelopmentSafeWallet);

      //Team
      const readBalanceOfRWARTeamSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressTeamSafeWallet],
      })
      const balanceOfRWARTeamSafeWallet = ethers.utils.formatEther(readBalanceOfRWARTeamSafeWallet, 18);
      updateRwarTeamWalletSafe(balanceOfRWARTeamSafeWallet);

      //Marketing
      const readBalanceOfRWARMarketingSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressMarketingSafeWallet],
      })
      const balanceOfRWARMarketingSafeWallet = ethers.utils.formatEther(readBalanceOfRWARMarketingSafeWallet, 18);
      updateRwarMarketingWalletSafe(balanceOfRWARMarketingSafeWallet);

      //Public RWAR
      const readBalanceOfRWARPublicSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressPublicRWARSafeWallet],
      })
      const balanceOfRWARPublicSafeWallet = ethers.utils.formatEther(readBalanceOfRWARPublicSafeWallet, 18);
      updateRwarPublicRWARWalletSafe(balanceOfRWARPublicSafeWallet);

      //Private RWAR
      const readBalanceOfRWARPrivateSafeWallet = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [addressPrivateRWARSafeWallet],
      })
      const balanceOfRWARPrivateSafeWallet = ethers.utils.formatEther(readBalanceOfRWARPrivateSafeWallet, 18);
      updateRwarPrivateRWARWalletSafe(balanceOfRWARPrivateSafeWallet);


      //Address USDT SC of RWAR SC
      const readStableCoinAddr = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'usdt',
      })
      updateUsdtAddressRWAR(readStableCoinAddr);

      //Address Reserve Wallet of RWAR SC
      const readReserveWalletRWAR = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'reserveWallet',
      })
      updateReserveWalletAddressRWAR(readReserveWalletRWAR);

      //Address Safe USDT Wallet of RWAR SC
      const readSafeUSDTWalletRWAR = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'safeUSDTWallet',
      })
      updateSafeUSDTWalletAddressRWAR(readSafeUSDTWalletRWAR);


      
      //Address owner 1 of the Pool
      const readAddressOwner1Pool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'owners',
        args: [0],
      })
      updateOwner1AddressPool1(readAddressOwner1Pool1);

      //Address owner 2 of the Pool
      const readAddressOwner2Pool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'owners',
        args: [1],
      })
      updateOwner2AddressPool1(readAddressOwner2Pool1);

      //Address USDT SC of the Pool
      const readUsdtAddressPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'usdt',
      })
      updateUsdtAddressPool1(readUsdtAddressPool1);

      //Address RWAR Safe Wallet of the Pool
      const readRWARWalletPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'rwarWallet',
      })
      updateRWARWalletAddressPool1(readRWARWalletPool1);

      //Address Marketing of the Pool
      const readMarketingWalletPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'marketingWallet',
      })
      updateMarketingWalletAddressPool1(readMarketingWalletPool1);

      //USDT don't claimed yet of the Pool
      /*
      const readUSDTDontClaimed = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getUSDTDontClaimed',
      })
      const usdtDontClaimed = ethers.utils.formatEther(readUSDTDontClaimed, 18);
      updateUsdtDontClaimedPool1(usdtDontClaimed);
      console.log(usdtDontClaimed);*/

      //Balance USDT of the Pool
      const readBalanceOfUsdtPool1 = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [Pool1.address],
      })
      const balanceOfUsdtPool1 = ethers.utils.formatEther(readBalanceOfUsdtPool1, 18);
      updateUSDTPool1(balanceOfUsdtPool1);

      //Balance RWAR of the Pool
      const readRWARTotal = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'balanceOf',
        args: [Pool1.address],
      })
      const balanceOfRWARPool1 = ethers.utils.formatEther(readRWARTotal, 18);
      updateBalanceRWARPool(balanceOfRWARPool1);

      //Total Stacked of the Pool
      const readTotalStacked = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'totalStacked',
      })
      const readTotalStackedPool1 = ethers.utils.formatEther(readTotalStacked, 18);
      updateRWARTotalStackedPool1(readTotalStackedPool1);

      //Total Stacked 7 Days of the Pool
      const readTotalStacked7Days = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getTotalStacked7Days',
      })
      const readTotalStackedPool17Days = ethers.utils.formatEther(readTotalStacked7Days, 18);
      updateTotalStacked7Days(readTotalStackedPool17Days);



      //List transactions to be confirmed for RWAR SC
      const readTransactionToBeConf = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for RWAR SC
      const readSubmitedTransaction = await readContract({
        address: RWAR.address,
        abi: RWAR.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmed(readTransactionToBeConf);
      updatesubmitedTransactions(readSubmitedTransaction);



      //List transactions to be confirmed for Pool SC
      const readTransactionToBeConfPool = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for Pool SC
      const readSubmitedTransactionPool = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmedPool(readTransactionToBeConfPool);
      updatesubmitedTransactionsPool(readSubmitedTransactionPool);
    
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    
    <div className='admin_container'>
    {address === ownerAddress1 || address === ownerAddress2 || address === owner1AddressPool1 || address === owner2AddressPool1?
    <>
    <div className='admin'>
      <p className='admin_title'>Admin</p>
      <div className='admin_info_container'>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Tokens of the RWAR smart contract</p>
            <p className='admin_info_number'>{RWARTokensContract}</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>Price of RWAR Token</p>
            <p className='admin_info_number'>{price} USDT</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of USDT Safe Wallet</p>
            <p className='admin_info_number'>{usdtUSDTWalletSafe} USDT</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>USDT of Reserve Wallet</p>
            <p className='admin_info_number'>{usdtReserveWalletSafe} USDT</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>USDT of Development Wallet</p>
            <p className='admin_info_number'>{usdtDevelopmentWalletSafe} USDT</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of Team Wallet</p>
            <p className='admin_info_number'>{usdtTeamWalletSafe} USDT</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of Reserve Wallet</p>
            <p className='admin_info_number'>{rwarReserveWalletSafe} RWAR</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of Development Wallet</p>
            <p className='admin_info_number'>{rwarDevelopmentWalletSafe} RWAR</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of Team Wallet</p>
            <p className='admin_info_number'>{rwarTeamWalletSafe} RWAR</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of Marketing Wallet</p>
            <p className='admin_info_number'>{rwarMarketingWalletSafe} RWAR</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of RWAR public Wallet</p>
            <p className='admin_info_number'>{rwarPublicRWARWalletSafe} RWAR</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>RWAR of RWAR private Wallet</p>
            <p className='admin_info_number'>{rwarPrivateRWARWalletSafe} RWAR</p>
          </div>
        </div>

        <p className='admin_title'>RWAR Smart Contract</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR Smart Contract Address</p>
            <p className='admin_info_number'>{RWAR.address}</p>
          </div>
        </div>
          
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR token owner's address n°1</p>
            <p className='admin_info_number'>{ownerAddress1}</p>
          </div>
        </div>
            
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR token owner's address n°2</p>
            <p className='admin_info_number'>{ownerAddress2}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR token USDT address</p>
            <p className='admin_info_number'>{usdtAddressRWAR}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR token Reserve Wallet address</p>
            <p className='admin_info_number'>{reserveWalletAddressRWAR}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RWAR token Safe USDT Wallet address</p>
            <p className='admin_info_number'>{safeUSDTWalletAddressRWAR}</p>
          </div>
        </div>
        
        
        <p className='admin_title'>Pool Smart Contract</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool Smart Contract address</p>
            <p className='admin_info_number'>{Pool1.address}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool owner 1 address</p>
            <p className='admin_info_number'>{owner1AddressPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool owner 2 address</p>
            <p className='admin_info_number'>{owner2AddressPool1}</p>
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
            <p className='admin_info_title'>Pool RWAR Safe Wallet address</p>
            <p className='admin_info_number'>{rwarWalletAddressPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool Marketing Wallet address</p>
            <p className='admin_info_number'>{marketingWalletAddressPool1}</p>
          </div>
        </div>

        {/*
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool USDT don't claimed</p>
            <p className='admin_info_number'>{usdtDontClaimedPool1}</p>
          </div>
        </div>
        */}

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool balance of USDT</p>
            <p className='admin_info_number'>{usdtPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool balance of RWAR</p>
            <p className='admin_info_number'>{balanceRWARPool}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool total stacked</p>
            <p className='admin_info_number'>{rwarTotalStackedPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Pool total stacked at least 7 Days old</p>
            <p className='admin_info_number'>{totalStacked7Days}</p>
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

        <>
        {transactionsToBeConfirmedPool && transactionsToBeConfirmedPool.map((value, index) => {
          return <TransactionToBeConfirmedPool data={value} index={index} key={index} confirmTransactionPool={confirmTransactionPool} deleteTransaction={deleteTransaction}></TransactionToBeConfirmedPool>;
        })}
        </>
        <>
        {submitedTransactionsPool && submitedTransactionsPool.map((value, index) => {
          return <SubmitedTransactionsPool data={value} index={index} key={index} deleteTransactionPool={deleteTransactionPool}></SubmitedTransactionsPool>;
        })}
        </>
        
        {transactionsToBeConfirmedPool && transactionsToBeConfirmedPool.length===0 && submitedTransactionsPool.length===0 && transactionsToBeConfirmed && transactionsToBeConfirmed.length===0 && submitedTransactions.length===0 ? 
        <>
          <p className='admin_info'>none</p>
        </>
        :''
        }

      </div>
    </div>


      {popup && boolSubmitMint ? 
        <Popup loading={loading} number={mintRWARTokens+' RWAR tokens!'} action='submit: mint' updatePopup={updatePopup} updateBoolSubmitMint={updateBoolSubmitMint} >
        </Popup>
        :popup && boolSubmitBurn ? 
          <Popup loading={loading} number={burnRWARTokens+' RWAR tokens!'} action='submit: burn' updatePopup={updatePopup} updateBoolSubmitBurn={updateBoolSubmitBurn} >
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
        :popup && boolChangeUsdtAddressRWAR ? 
        <Popup loading={loading} number={''} action={'change the usdt address to '+newUsdtAddressRWAR} updatePopup={updatePopup} updateBoolChangeUsdtAddressRWAR={updateBoolChangeUsdtAddressRWAR} >
        </Popup>
        :popup && boolChangeReserveWalletAddressRWAR ? 
        <Popup loading={loading} number={''} action={'submit: change the reserve wallet address RWAR to '+ newReserveWalletAddressRWAR} updatePopup={updatePopup} updateBoolChangeReserveWalletAddressRWAR={updateBoolChangeReserveWalletAddressRWAR} >
        </Popup>
        :popup && boolChangeSafeUSDTWalletAddressRWAR ? 
        <Popup loading={loading} number={''} action={'submit: change the safe USDT wallet address RWAR to '+ newSafeUSDTWalletAddressRWAR} updatePopup={updatePopup} updateBoolChangeSafeUSDTWalletAddressRWAR={updateBoolChangeSafeUSDTWalletAddressRWAR} >
        </Popup>
        :popup && boolTransfer ? 
        <Popup loading={loading} number={transferStableCoins+' usdt to: ' + addressTransferStableCoins} action='submit: transfer' updatePopup={updatePopup} updateBoolTransfer={updateBoolTransfer} >
        </Popup>
        :popup && boolTransferRWAR ? 
        <Popup loading={loading} number={transferRWARTokens+' RWAR Tokens!'} action='submit: transfer' updatePopup={updatePopup} updateBoolTransferRWAR={updateBoolTransferRWAR}>
        </Popup>
        : boolConfirmTransaction ?
        <Popup loading={loading} number={''} action={'confirmed the transaction'} updatePopup={updatePopup} updateBoolConfirmTransaction={updateBoolConfirmTransaction} >
        </Popup>
        : boolDeleteTransaction ?
        <Popup loading={loading} number={''} action={'deleted the transaction'} updatePopup={updatePopup} updateBoolDeleteTransaction={updateBoolDeleteTransaction} >
        </Popup>
        : boolConfirmTransactionPool ?
        <Popup loading={loading} number={''} action={'confirmed the transaction Pool 1 '} updatePopup={updatePopup} updateBoolConfirmTransactionPool={updateBoolConfirmTransactionPool} >
        </Popup>
        : boolDeleteTransactionPool ?
        <Popup loading={loading} number={''} action={'deleted the transaction Pool 1'} updatePopup={updatePopup} updateBoolDeleteTransactionPool={updateBoolDeleteTransactionPool} >
        </Popup>
        :popup && boolSubmitChangeOwner1AddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 1 owner 1 address to '+ newOwner1AddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeOwner1AddressPool1={updateBoolSubmitChangeOwner1AddressPool1} >
        </Popup>
        :popup && boolSubmitChangeOwner2AddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 1 owner 2 address to '+ newOwner2AddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeOwner2AddressPool1={updateBoolSubmitChangeOwner2AddressPool1} >
        </Popup>
        :popup && boolUsdtAddressPool1 ? 
        <Popup loading={loading} number={''} action={'change the usdt address of the pool 1 to '+ newUsdtAddressPool1} updatePopup={updatePopup} updateBoolUsdtAddressPool1={updateBoolUsdtAddressPool1} >
        </Popup>
        :popup && boolSubmitChangeRWARWalletAddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the RWAR Wallet address of the pool 1 to '+ newRWARWalletAddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeRWARWalletAddressPool1={updateBoolSubmitChangeRWARWalletAddressPool1} >
        </Popup>
        :popup && boolSubmitChangeMarketingWalletAddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the Martketing Wallet address of the pool 1 to '+ newMarketingWalletAddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeMarketingWalletAddressPool1={updateBoolSubmitChangeMarketingWalletAddressPool1} >
        </Popup>
        :popup && boolSendYield? 
        <Popup loading={loading} number={sendYield +' usdt to users'} action='submit: send yield ' updatePopup={updatePopup} updateBoolsendYield={updateBoolsendYield}>
        </Popup>
        :popup && boolAddAffiliateAddressPool1 ? 
        <Popup loading={loading} number='' action={'submit: add ' + addAffiliateAddressPool1 + " on affiliate address list!"} updatePopup={updatePopup} updateboolAddAffiliateAddressPool1={updateboolAddAffiliateAddressPool1} >
        </Popup>
        :''
      }
      
      
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Mint RWAR Tokens</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="RWAR" type="number" placeholder="Number of tokens" value={mintRWARTokens} onChange={e => updateMintRWARTokens(e.target.value)}></input>
          <p>RWAR Token</p>
        </div>
        <button className="admin_button" onClick={() => mint()}>
          Submit Mint Tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Burn RWAR Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="RWAR" type="number" placeholder="Number of tokens" value={burnRWARTokens} onChange={e => updateBurnRWARTokens(e.target.value)}></input>
          <p>RWAR Token</p>
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
        <input className="admin_input" id="price" type="number" placeholder="Price of RWAR token" value={newPrice} onChange={e => updateNewPrice(e.target.value)}></input>
          <p>Price RWAR token</p>
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
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newUsdtAddressRWAR} onChange={e => updateNewUsdtAddressRWAR(e.target.value)}></input>
          <p>New usdt's address</p>
        </div>
        <button className="admin_button" onClick={() => changeUSDTAddress()}>
          Change USDT Address
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Reserve Wallet Address RWAR</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newReserveWalletAddressRWAR} onChange={e => updateNewReserveWalletAddressRWAR(e.target.value)}></input>
          <p>New reserve wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeReserveWalletAddressRWAR()}>
          Submit Change Reserve Wallet Address
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Safe USDT Wallet Address RWAR</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newSafeUSDTWalletAddressRWAR} onChange={e => updateNewSafeUSDTWalletAddressRWAR(e.target.value)}></input>
          <p>New safe usdt wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeSafeUSDTWalletAddressRWAR()}>
          Submit Change Safe USDT Wallet Address
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
        <p className='admin_title'>Transfer RWAR Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="rwar" type="number" placeholder="Number of tokens" value={transferRWARTokens} onChange={e => updateTransferRWARTokens(e.target.value)}></input>
          <p>RWAR Token</p>
        </div>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="Address" value={addressTransferRWARTokens} onChange={e => updateAddressTransferRWARTokens(e.target.value)}></input>
          <p>Address</p>
        </div>
        <button className="admin_button" onClick={() => transferRWAR()}>
          Submit Transfer RWAR Tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change Owner 1 address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newOwner1AddressPool1} onChange={e => updateNewOwner1AddressPool1(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwner1AddressPool1()}>
          Submit Change Owner 1
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change Owner 2 address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newOwner2AddressPool1} onChange={e => updateNewOwner2AddressPool1(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwner2AddressPool1()}>
          Submit Change Owner 2
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
        <p className='admin_title'>Pool 1 Change RWAR Wallet Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newRWARWalletAddressPool1} onChange={e => updateNewRWARWalletAddressPool1(e.target.value)}></input>
          <p>New RWAR Wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeRWARWalletAddressPool1()}>
          Submit change RWAR Wallet Address
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change Marketing Wallet Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newMarketingWalletAddressPool1} onChange={e => updateNewMarketingWalletAddressPool1(e.target.value)}></input>
          <p>New Marketing Wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeMarketingWalletAddressPool1()}>
          Submit change Marketing Wallet Address
        </button>
      </div>
    </div>
    
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Send Yield</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="stablecoin" type="number" placeholder="Price in USDT" value={sendYield} onChange={e => updateSendYield(e.target.value)}></input>
          <p>USDT</p>
        </div>
        <button className="admin_button" onClick={() => sendYieldPool1()}>
          Submit Send Yield
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
          Submit Add Address
        </button>
      </div>
    </div>

  </>
    : '' }
    </div>
  )
}

export default Admin
