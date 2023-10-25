import React from 'react'
import './Admin.css';
import { useState, useEffect } from "react";
import RDS from "../RDS.json";
import Popup from "./Popup";
import TransactionToBeConfirmed from './TransactionToBeConfirmed';
import TransactionToBeConfirmedPool1 from './TransactionToBeConfirmedPool1';
import SubmitedTransactionsPool1 from './SubmitedTransactionsPool1';
import TransactionToBeConfirmedPool2 from './TransactionToBeConfirmedPool2';
import SubmitedTransactionsPool2 from './SubmitedTransactionsPool2';
import TransactionToBeConfirmedPool3 from './TransactionToBeConfirmedPool3';
import SubmitedTransactionsPool3 from './SubmitedTransactionsPool3';
import SubmitedTransactions from './SubmitedTransactions';
import Pool1 from "../Pool1.json";
import Pool2 from "../Pool2.json";
import Pool3 from "../Pool3.json";
import tokenerc20 from "../tokenerc20.json";
import { useAccount } from 'wagmi';
import { readContract, writeContract, prepareWriteContract, waitForTransaction } from '@wagmi/core';

const Admin = () => {

  const addressTeamSafeWallet = "0x9F5396C7e899ff967222F2Be35BD3f3aB9331031";
  const addressDevelopmentSafeWallet = "0x434b991915465B8175bfCcfD806CB29078680951";
  const addressMarketingSafeWallet = "0x671bbd03D1fbcA8A2aB46eC1a250B19a224Bbf82";
  const addressSafeRWAPool1Wallet = "0xfBD237b6Cc2f00bEe96cBe632a440A6904719B2E";
  const addressSafeRWAPool2Wallet = "0xcfd1a1Ae32bEe395f9953A65f276F12374cD2F80";
  const addressSafeRWAPool3Wallet = "0xF470f67Cbac02dA7af79c458986c14eF689ade3a";

  const [totalSupply, updateTotalSupply] = useState(0);
  const [maxSupply, updateMaxSupply] = useState(0);
  
  

  //rds of the Dev,Merketing and team Wallet
  const [rdsDevelopmentWalletSafe, updateRdsDevelopmentWalletSafe] = useState(0);
  const [rdsTeamWalletSafe, updateRdsTeamWalletSafe] = useState(0);
  const [rdsMarketingWalletSafe, updateRdsMarketingWalletSafe] = useState(0);
  
  
  //const [mintForTeamValue, updateMintForTeamValue] = useState(0);
  const [burnRDSTokens, updateBurnRDSTokens] = useState(0);
  const [mintRDSTokens, updateMintRDSTokens] = useState(0);
  const [addressMintRDSTokens, updateAddressMintRDSTokens] = useState('');
  const [withdrawTokens, updateWithdrawTokens] = useState(0);
  const [withdrawAddressToken, updateWithdrawAddressToken] = useState('');
  const [withdrawTo, updateWithdrawTo] = useState('');
  /*const [addressNewOwner1, updateAddressNewOwner1] = useState('');
  const [addressNewOwner2, updateAddressNewOwner2] = useState('');*/
  const [ownerAddress1,updateOwnerAddress1] = useState('');
  const [ownerAddress2,updateOwnerAddress2] = useState('');
  const [ownerAddress3,updateOwnerAddress3] = useState('');
  const [ownerAddress4,updateOwnerAddress4] = useState('');

  //Pool1
  /*const [newOwner1AddressPool1, updateNewOwner1AddressPool1] = useState('');
  const [newOwner2AddressPool1, updateNewOwner2AddressPool1] = useState('');*/
  const [showSafeRDSWalletAddressPool1, updateShowSafeRDSWalletAddressPool1] = useState('');
  let safeRDSWalletAddressPool1;
  const [newSafeRDSWalletAddressPool1, updateNewSafeRDSWalletAddressPool1] = useState('');
  
  const [withdrawTokensPool1, updateWithdrawTokensPool1] = useState(0);
  const [withdrawAddressTokenPool1, updateWithdrawAddressTokenPool1] = useState('');
  const [withdrawToPool1, updateWithdrawToPool1] = useState('');

  const [rdsSafeRDSPool1Wallet, updateRdsSafeRDSPool1Wallet] = useState(0);
  const [rdsSafeRWAPool1Wallet, updateRdsSafeRWAPool1Wallet] = useState(0);
  const [usdtSafeRWAPool1Wallet, updateUsdtSafeRWAPool1Wallet] = useState(0);
  const [balanceRDSPool1, updateBalanceRDSPool1] = useState(0);
  const [RDSTotalStackedPool1, updateRDSTotalStackedPool1] = useState(0);
  const [totalStacked7DaysPool1, updateTotalStacked7DaysPool1] = useState(0);
  const [sendYieldPool1, updateSendYieldPool1] = useState('');

  //Pool 2
  /*const [newOwner1AddressPool2, updateNewOwner1AddressPool2] = useState('');
  const [newOwner2AddressPool2, updateNewOwner2AddressPool2] = useState('');*/
  const [showSafeRDSWalletAddressPool2, updateShowSafeRDSWalletAddressPool2] = useState('');
  let safeRDSWalletAddressPool2;
  const [newSafeRDSWalletAddressPool2, updateNewSafeRDSWalletAddressPool2] = useState('');
  
  const [withdrawTokensPool2, updateWithdrawTokensPool2] = useState(0);
  const [withdrawAddressTokenPool2, updateWithdrawAddressTokenPool2] = useState('');
  const [withdrawToPool2, updateWithdrawToPool2] = useState('');

  const [rdsSafeRDSPool2Wallet, updateRdsSafeRDSPool2Wallet] = useState(0);
  const [rdsSafeRWAPool2Wallet, updateRdsSafeRWAPool2Wallet] = useState(0);
  const [usdtSafeRWAPool2Wallet, updateUsdtSafeRWAPool2Wallet] = useState(0);
  const [balanceRDSPool2, updateBalanceRDSPool2] = useState(0);
  const [RDSTotalStackedPool2, updateRDSTotalStackedPool2] = useState(0);
  const [totalStacked7DaysPool2, updateTotalStacked7DaysPool2] = useState(0);
  const [sendYieldPool2, updateSendYieldPool2] = useState('');

  //Pool 3
  /*const [newOwner1AddressPool3, updateNewOwner1AddressPool3] = useState('');
  const [newOwner2AddressPool3, updateNewOwner2AddressPool3] = useState('');*/
  const [showSafeRDSWalletAddressPool3, updateShowSafeRDSWalletAddressPool3] = useState('');
  let safeRDSWalletAddressPool3;
  const [newSafeRDSWalletAddressPool3, updateNewSafeRDSWalletAddressPool3] = useState('');
  
  const [withdrawTokensPool3, updateWithdrawTokensPool3] = useState(0);
  const [withdrawAddressTokenPool3, updateWithdrawAddressTokenPool3] = useState('');
  const [withdrawToPool3, updateWithdrawToPool3] = useState('');

  const [rdsSafeRDSPool3Wallet, updateRdsSafeRDSPool3Wallet] = useState(0);
  const [rdsSafeRWAPool3Wallet, updateRdsSafeRWAPool3Wallet] = useState(0);
  const [usdtSafeRWAPool3Wallet, updateUsdtSafeRWAPool3Wallet] = useState(0);
  const [balanceRDSPool3, updateBalanceRDSPool3] = useState(0);
  const [RDSTotalStackedPool3, updateRDSTotalStackedPool3] = useState(0);
  const [totalStacked7DaysPool3, updateTotalStacked7DaysPool3] = useState(0);
  const [sendYieldPool3, updateSendYieldPool3] = useState('');
  

  const [loading, updateLoading] = useState(false);
  const [popup, updatePopup] = useState(false);

  //Bool function
  const [boolSubmitMintForTeam, updateBoolSubmitMintForTeam] = useState(false);
  const [boolSubmitBurn, updateBoolSubmitBurn] = useState(false);
  const [boolSubmitMint, updateBoolSubmitMint] = useState(false);
  const [boolSubmitWithdraw, updateBoolSubmitWithdraw] = useState(false);
  const [boolRenounce, updateBoolRenounce] = useState(false);
  /*const [boolSubmitChangeOwner1, updateBoolSubmitChangeOwner1] = useState(false);
  const [boolSubmitChangeOwner2, updateBoolSubmitChangeOwner2] = useState(false);*/
  //Pool 1
  const [boolSendYieldPool1, updateBoolsendYieldPool1] = useState(false);
  /*const [boolSubmitChangeOwner1AddressPool1, updateBoolSubmitChangeOwner1AddressPool1] = useState(false);
  const [boolSubmitChangeOwner2AddressPool1, updateBoolSubmitChangeOwner2AddressPool1] = useState(false);*/
  const [boolSubmitChangeSafeRDSWalletAddressPool1, updateBoolSubmitChangeSafeRDSWalletAddressPool1] = useState(false);
  const [boolSubmitWithdrawPool1, updateBoolSubmitWithdrawPool1] = useState(false);
  const [boolRenouncePool1, updateBoolRenouncePool1] = useState(false);

  //Pool 2
  const [boolSendYieldPool2, updateBoolsendYieldPool2] = useState(false);
  /*const [boolSubmitChangeOwner1AddressPool2, updateBoolSubmitChangeOwner1AddressPool2] = useState(false);
  const [boolSubmitChangeOwner2AddressPool2, updateBoolSubmitChangeOwner2AddressPool2] = useState(false);*/
  const [boolSubmitChangeSafeRDSWalletAddressPool2, updateBoolSubmitChangeSafeRDSWalletAddressPool2] = useState(false);
  const [boolSubmitWithdrawPool2, updateBoolSubmitWithdrawPool2] = useState(false);
  const [boolRenouncePool2, updateBoolRenouncePool2] = useState(false);
  //Pool 3
  const [boolSendYieldPool3, updateBoolsendYieldPool3] = useState(false);
  /*const [boolSubmitChangeOwner1AddressPool3, updateBoolSubmitChangeOwner1AddressPool3] = useState(false);
  const [boolSubmitChangeOwner2AddressPool3, updateBoolSubmitChangeOwner2AddressPool3] = useState(false);*/
  const [boolSubmitChangeSafeRDSWalletAddressPool3, updateBoolSubmitChangeSafeRDSWalletAddressPool3] = useState(false);
  const [boolSubmitWithdrawPool3, updateBoolSubmitWithdrawPool3] = useState(false);
  const [boolRenouncePool3, updateBoolRenouncePool3] = useState(false);

  //Transactions
  const [boolConfirmTransaction, updateBoolConfirmTransaction] = useState(false);
  const [boolDeleteTransaction, updateBoolDeleteTransaction] = useState(false);
  const [transactionsToBeConfirmed, updateTransactionsToBeConfirmed] = useState([]);
  const [submitedTransactions, updatesubmitedTransactions] = useState([]);

  //Submit Pool 1
  const [boolConfirmTransactionPool1, updateBoolConfirmTransactionPool1] = useState(false);
  const [boolDeleteTransactionPool1, updateBoolDeleteTransactionPool1] = useState(false);
  const [transactionsToBeConfirmedPool1, updateTransactionsToBeConfirmedPool1] = useState([]);
  const [submitedTransactionsPool1, updatesubmitedTransactionsPool1] = useState([]);
  //Submit Pool 2
  const [boolConfirmTransactionPool2, updateBoolConfirmTransactionPool2] = useState(false);
  const [boolDeleteTransactionPool2, updateBoolDeleteTransactionPool2] = useState(false);
  const [transactionsToBeConfirmedPool2, updateTransactionsToBeConfirmedPool2] = useState([]);
  const [submitedTransactionsPool2, updatesubmitedTransactionsPool2] = useState([]);
  //Submit Pool 3
  const [boolConfirmTransactionPool3, updateBoolConfirmTransactionPool3] = useState(false);
  const [boolDeleteTransactionPool3, updateBoolDeleteTransactionPool3] = useState(false);
  const [transactionsToBeConfirmedPool3, updateTransactionsToBeConfirmedPool3] = useState([]);
  const [submitedTransactionsPool3, updatesubmitedTransactionsPool3] = useState([]);
  
  const ethers = require("ethers");
  const { address } = useAccount();
  

  async function confirmTransaction(i) {
    try {
      updateBoolConfirmTransaction(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      await waitForTransaction({
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
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      await waitForTransaction({
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

  //Function Confirm and delete Pool 1
  async function confirmTransactionPool1(i) {
    try {
      updateBoolConfirmTransactionPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      await waitForTransaction({
        hash: confirmSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't confirm the transaction!");
      updateLoading(false);
      updateBoolConfirmTransactionPool1(false);
      updatePopup(false);
    }
  }

  async function deleteTransactionPool1(i) {
    try {
      updateBoolDeleteTransactionPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestDelete } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      await waitForTransaction({
        hash: deleteSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransactionPool1(false);
      updatePopup(false);
    }
  }



  //Function Confirm and delete Pool 2
  async function confirmTransactionPool2(i) {
    try {
      updateBoolConfirmTransactionPool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      await waitForTransaction({
        hash: confirmSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't confirm the transaction!");
      updateLoading(false);
      updateBoolConfirmTransactionPool2(false);
      updatePopup(false);
    }
  }

  async function deleteTransactionPool2(i) {
    try {
      updateBoolDeleteTransactionPool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestDelete } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      await waitForTransaction({
        hash: deleteSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransactionPool2(false);
      updatePopup(false);
    }
  }



  //Function Confirm and delete Pool 3
  async function confirmTransactionPool3(i) {
    try {
      updateBoolConfirmTransactionPool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestConfirm } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'confirmTransaction',
        args: [i],
      });
      let { hash: confirmSent } = await writeContract(requestConfirm)

      await waitForTransaction({
        hash: confirmSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't confirm the transaction!");
      updateLoading(false);
      updateBoolConfirmTransactionPool3(false);
      updatePopup(false);
    }
  }

  async function deleteTransactionPool3(i) {
    try {
      updateBoolDeleteTransactionPool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestDelete } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'deleteTransaction',
        args: [i],
      });
      let { hash: deleteSent } = await writeContract(requestDelete)

      await waitForTransaction({
        hash: deleteSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't delete the transaction!");
      updateLoading(false);
      updateBoolDeleteTransactionPool3(false);
      updatePopup(false);
    }
  }




  async function mintForTeam() {
    try {
      updateBoolSubmitMintForTeam(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestMintForTeam } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['mintForTeam', RDS.address, RDS.address, 0],
      });
      let { hash: mintForTeamSent } = await writeContract(requestMintForTeam)

      await waitForTransaction({
        hash: mintForTeamSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't mint!");
      updateLoading(false);
      updateBoolSubmitMintForTeam(false);
      updatePopup(false);
    }
  }

  async function mint() {
    if(mintRDSTokens!==0 && ethers.utils.isAddress(addressMintRDSTokens))
    try {
      updateBoolSubmitMint(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestMint } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['mint', RDS.address, addressMintRDSTokens, ethers.utils.parseUnits(mintRDSTokens)],
      });
      let { hash: mintSent } = await writeContract(requestMint)

      await waitForTransaction({
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
    if(burnRDSTokens!==0)
    try {
      updateBoolSubmitBurn(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestBurn } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['burn', RDS.address, RDS.address, ethers.utils.parseUnits(burnRDSTokens)],
      });
      let { hash: burnSent } = await writeContract(requestBurn)

      await waitForTransaction({
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

  async function withdraw() {
    if(withdrawTokens!==0 && ethers.utils.isAddress(withdrawAddressToken) && ethers.utils.isAddress(withdrawTo))
    try {
      updateBoolSubmitWithdraw(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestWithdraw } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['withdraw', withdrawAddressToken, withdrawTo, ethers.utils.parseUnits(withdrawTokens)],
      });
      let { hash: withdrawSent } = await writeContract(requestWithdraw)

      await waitForTransaction({
        hash: withdrawSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't withdraw!");
      updateLoading(false);
      updateBoolSubmitWithdraw(false);
      updatePopup(false);
    }
  }

  async function renounce() {
    try {
      updateBoolRenounce(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestRenounce } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['renounceOwnership', RDS.address, RDS.address, 0]
      });
      let { hash: renounceSent } = await writeContract(requestRenounce)

      await waitForTransaction({
        hash: renounceSent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't renounce!");
      updateLoading(false);
      updateBoolRenounce(false);
      updatePopup(false);
    }
  }
  /*
  async function changeOwner1() {
    if(addressNewOwner1!== '')
    try {
      updateBoolSubmitChangeOwner1(true);
      updateBoolSubmitChangeOwner1AddressPool1(true);
      updateBoolSubmitChangeOwner1AddressPool2(true);
      updateBoolSubmitChangeOwner1AddressPool3(true);
      updateLoading(true);
      updatePopup(true);

      //SC Token
      const { request: requestChangeOwner1 } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0],
      });
      let { hash: changeOwner1Sent } = await writeContract(requestChangeOwner1)

      const dataChangeOwner1 = await waitForTransaction({
        hash: changeOwner1Sent
      })

      //Pool 1
      const { request: requestChangeOwner1Pool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0]
      });
      let { hash: changeOwner1Pool1Sent } = await writeContract(requestChangeOwner1Pool1)

      const dataChangeOwner1Pool1 = await waitForTransaction({
        hash: changeOwner1Pool1Sent
      })

      //Pool 2
      const { request: requestChangeOwner1Pool2 } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0]
      });
      let { hash: changeOwner1Pool2Sent } = await writeContract(requestChangeOwner1Pool2)

      const dataChangeOwner1Pool2 = await waitForTransaction({
        hash: changeOwner1Pool2Sent
      })

      //Pool 3
      const { request: requestChangeOwner1Pool3 } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner1', addressNewOwner1, 0]
      });
      let { hash: changeOwner1Pool3Sent } = await writeContract(requestChangeOwner1Pool3)

      const dataChangeOwner1Pool3 = await waitForTransaction({
        hash: changeOwner1Pool3Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwner1(false);
      updateBoolSubmitChangeOwner1AddressPool1(false);
      updateBoolSubmitChangeOwner1AddressPool2(false);
      updateBoolSubmitChangeOwner1AddressPool3(false);
      updatePopup(false);
    }
  }

  async function changeOwner2() {
    if(addressNewOwner2!== '')
    try {
      updateBoolSubmitChangeOwner2(true);
      updateBoolSubmitChangeOwner2AddressPool1(true);
      updateBoolSubmitChangeOwner2AddressPool2(true);
      updateBoolSubmitChangeOwner2AddressPool3(true);
      updateLoading(true);
      updatePopup(true);

      //SC Token
      const { request: requestChangeOwner2 } = await prepareWriteContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0],
      });
      let { hash: changeOwner2Sent } = await writeContract(requestChangeOwner2)

      const dataChangeOwner2 = await waitForTransaction({
        hash: changeOwner2Sent
      })

      //Pool 1
      const { request: requestChangeOwner2Pool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0]
      });
      let { hash: changeOwner2Pool1Sent } = await writeContract(requestChangeOwner2Pool1)

      const dataChangeOwner2Pool1 = await waitForTransaction({
        hash: changeOwner2Pool1Sent
      })

      
      //Pool 2
      const { request: requestChangeOwner2Pool2 } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0]
      });
      let { hash: changeOwner2Pool2Sent } = await writeContract(requestChangeOwner2Pool2)

      const dataChangeOwner2Pool2 = await waitForTransaction({
        hash: changeOwner2Pool2Sent
      })
      
      //Pool 3
      const { request: requestChangeOwner2Pool3 } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['changeOwner2', addressNewOwner2, 0]
      });
      let { hash: changeOwner2Pool3Sent } = await writeContract(requestChangeOwner2Pool3)

      const dataChangeOwner2Pool3 = await waitForTransaction({
        hash: changeOwner2Pool3Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the owner!");
      updateLoading(false);
      updateBoolSubmitChangeOwner2(false);
      updateBoolSubmitChangeOwner2AddressPool1(false);
      updateBoolSubmitChangeOwner2AddressPool2(false);
      updateBoolSubmitChangeOwner2AddressPool3(false);
      updatePopup(false);
    }
  }*/

  //Function Pool 1
  async function sendYieldToPool1() {
    if(sendYieldPool1!== '')
    try {
      updateBoolsendYieldPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestSendYield } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['sendYield', Pool1.address, Pool1.address, ethers.utils.parseUnits(sendYieldPool1)]
      });
      let { hash: SendYieldSent } = await writeContract(requestSendYield)

      await waitForTransaction({
        hash: SendYieldSent
      })

      updateLoading(false);

    } catch (error) {
      updateLoading(false);
      updateBoolsendYieldPool1(false);
      updatePopup(false);
    }
  }

  //Pool 1 change address of SafeRDS wallet 
  async function changeSafeRDSWalletAddressPool1() {
    if(newSafeRDSWalletAddressPool1!== '')
    try {
      updateBoolSubmitChangeSafeRDSWalletAddressPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeRDSWalletAddressPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['changeSafeRDSWalletAddress', Pool1.address, newSafeRDSWalletAddressPool1, 0]
      });
      let { hash: changeRDSWalletAddressPool1Sent } = await writeContract(requestChangeRDSWalletAddressPool1)

      await waitForTransaction({
        hash: changeRDSWalletAddressPool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the Pool 1 SafeRDS Wallet address!");
      updateLoading(false);
      updateBoolSubmitChangeSafeRDSWalletAddressPool1(false);
      updatePopup(false);
    }
  }

  async function withdrawPool1() {
    if(withdrawTokensPool1!==0 && ethers.utils.isAddress(withdrawAddressTokenPool1) && ethers.utils.isAddress(withdrawToPool1))
    try {
      updateBoolSubmitWithdrawPool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestWithdrawPool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['withdraw', withdrawAddressTokenPool1, withdrawToPool1, ethers.utils.parseUnits(withdrawTokensPool1)],
      });
      let { hash: withdrawSentPool1 } = await writeContract(requestWithdrawPool1)

      await waitForTransaction({
        hash: withdrawSentPool1
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't withdraw Pool 1!");
      updateLoading(false);
      updateBoolSubmitWithdrawPool1(false);
      updatePopup(false);
    }
  }

  async function renouncePool1() {
    try {
      updateBoolRenouncePool1(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestRenouncePool1 } = await prepareWriteContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'submitTransaction',
        args: ['renounceOwnership', Pool1.address, Pool1.address, 0]
      });
      let { hash: renouncePool1Sent } = await writeContract(requestRenouncePool1)

      await waitForTransaction({
        hash: renouncePool1Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't renounce Pool1!");
      updateLoading(false);
      updateBoolRenouncePool1(false);
      updatePopup(false);
    }
  }

  //Function Pool 2
  async function sendYieldToPool2() {
    if(sendYieldPool2!== '')
    try {
      updateBoolsendYieldPool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestSendYield } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['sendYield', Pool2.address, Pool2.address, ethers.utils.parseUnits(sendYieldPool2)]
      });
      let { hash: SendYieldSent } = await writeContract(requestSendYield)

      waitForTransaction({
        hash: SendYieldSent
      })

      updateLoading(false);

    } catch (error) {
      updateLoading(false);
      updateBoolsendYieldPool2(false);
      updatePopup(false);
    }
  }

  async function changeSafeRDSWalletAddressPool2() {
    if(newSafeRDSWalletAddressPool2!== '')
    try {
      updateBoolSubmitChangeSafeRDSWalletAddressPool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeRDSWalletAddressPool2 } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['changeSafeRDSWalletAddress', Pool2.address, newSafeRDSWalletAddressPool2, 0]
      });
      let { hash: changeRDSWalletAddressPool2Sent } = await writeContract(requestChangeRDSWalletAddressPool2)

      await waitForTransaction({
        hash: changeRDSWalletAddressPool2Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the Pool 2 Safe RDS Wallet address!");
      updateLoading(false);
      updateBoolSubmitChangeSafeRDSWalletAddressPool2(false);
      updatePopup(false);
    }
  }

  async function withdrawPool2() {
    if(withdrawTokensPool2!==0 && ethers.utils.isAddress(withdrawAddressTokenPool2) && ethers.utils.isAddress(withdrawToPool2))
    try {
      updateBoolSubmitWithdrawPool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestWithdrawPool2 } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['withdraw', withdrawAddressTokenPool2, withdrawToPool2, ethers.utils.parseUnits(withdrawTokensPool2)],
      });
      let { hash: withdrawSentPool2 } = await writeContract(requestWithdrawPool2)

      waitForTransaction({
        hash: withdrawSentPool2
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't withdraw Pool 2!");
      updateLoading(false);
      updateBoolSubmitWithdrawPool2(false);
      updatePopup(false);
    }
  }

  async function renouncePool2() {
    try {
      updateBoolRenouncePool2(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestRenouncePool2 } = await prepareWriteContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'submitTransaction',
        args: ['renounceOwnership', Pool2.address, Pool2.address, 0]
      });
      let { hash: renouncePool2Sent } = await writeContract(requestRenouncePool2)

      waitForTransaction({
        hash: renouncePool2Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't renounce Pool2!");
      updateLoading(false);
      updateBoolRenouncePool2(false);
      updatePopup(false);
    }
  }

  //Function Pool 3
  async function sendYieldToPool3() {
    if(sendYieldPool3!== '')
    try {
      updateBoolsendYieldPool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestSendYield } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['sendYield', Pool3.address, Pool3.address, ethers.utils.parseUnits(sendYieldPool3)]
      });
      let { hash: SendYieldSent } = await writeContract(requestSendYield)

      await waitForTransaction({
        hash: SendYieldSent
      })

      updateLoading(false);

    } catch (error) {
      updateLoading(false);
      updateBoolsendYieldPool3(false);
      updatePopup(false);
    }
  }

  async function changeSafeRDSWalletAddressPool3() {
    if(newSafeRDSWalletAddressPool3!== '')
    try {
      updateBoolSubmitChangeSafeRDSWalletAddressPool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestChangeRDSWalletAddressPool3 } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['changeSafeRDSWalletAddress', Pool3.address, newSafeRDSWalletAddressPool3, 0]
      });
      let { hash: changeRDSWalletAddressPool3Sent } = await writeContract(requestChangeRDSWalletAddressPool3)

      await waitForTransaction({
        hash: changeRDSWalletAddressPool3Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't change the Pool 3 SafeRDS Wallet address!");
      updateLoading(false);
      updateBoolSubmitChangeSafeRDSWalletAddressPool3(false);
      updatePopup(false);
    }
  }

  async function withdrawPool3() {
    if(withdrawTokensPool3!==0 && ethers.utils.isAddress(withdrawAddressTokenPool3) && ethers.utils.isAddress(withdrawToPool3))
    try {
      updateBoolSubmitWithdrawPool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestWithdrawPool3 } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['withdraw', withdrawAddressTokenPool3, withdrawToPool3, ethers.utils.parseUnits(withdrawTokensPool3)],
      });
      let { hash: withdrawSentPool3 } = await writeContract(requestWithdrawPool3)

      waitForTransaction({
        hash: withdrawSentPool3
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't withdraw Pool 3!");
      updateLoading(false);
      updateBoolSubmitWithdrawPool3(false);
      updatePopup(false);
    }
  }

  async function renouncePool3() {
    try {
      updateBoolRenouncePool3(true);
      updateLoading(true);
      updatePopup(true);

      const { request: requestRenouncePool3 } = await prepareWriteContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'submitTransaction',
        args: ['renounceOwnership', Pool3.address, Pool3.address, 0]
      });
      let { hash: renouncePool3Sent } = await writeContract(requestRenouncePool3)

      waitForTransaction({
        hash: renouncePool3Sent
      })

      updateLoading(false);

    } catch (error) {
      alert("You can't renounce Pool3!");
      updateLoading(false);
      updateBoolRenouncePool3(false);
      updatePopup(false);
    }
  }

  async function getData() {
    try {

      //Pool 1 SafeRDS Wallet address
      const readSafeRDSWalletPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'safeRDSWallet',
      })
      updateShowSafeRDSWalletAddressPool1(readSafeRDSWalletPool1);
      safeRDSWalletAddressPool1=readSafeRDSWalletPool1;

      //Pool 2 SafeRDS Wallet address
      const readSafeRDSWalletPool2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'safeRDSWallet',
      })
      updateShowSafeRDSWalletAddressPool2(readSafeRDSWalletPool2);
      safeRDSWalletAddressPool2=readSafeRDSWalletPool2;
      
      //Pool 3 SafeRDS Wallet address
      const readSafeRDSWalletPool3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'safeRDSWallet',
      })
      updateShowSafeRDSWalletAddressPool3(readSafeRDSWalletPool3);
      safeRDSWalletAddressPool3=readSafeRDSWalletPool3;

      //totalSupply
      const readTotalSupply = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'getTotalSupply',
      })
      const getTotalSupply = ethers.utils.formatEther(readTotalSupply, 18);
      updateTotalSupply(getTotalSupply);

      //MaxSupply
      const readMaxSupply = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: '_initial_supply',
      })
      const getMaxSupply = ethers.utils.formatEther(readMaxSupply, 18);
      updateMaxSupply(getMaxSupply);
      

      //Address owner 1 of RDS SC
      const readAddressOwner1 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [0],
      })
      updateOwnerAddress1(readAddressOwner1);

      //Address owner 2 of RDS SC
      const readAddressOwner2 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [1],
      })
      updateOwnerAddress2(readAddressOwner2);

      //Address owner 3 of RDS SC
      const readAddressOwner3 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [2],
      })
      updateOwnerAddress3(readAddressOwner3);

      //Address owner 4 of RDS SC
      const readAddressOwner4 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'owners',
        args: [3],
      })
      updateOwnerAddress4(readAddressOwner4);

      //Development
      const readBalanceOfRDSDevelopmentSafeWallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressDevelopmentSafeWallet],
      })
      const balanceOfRDSDevelopmentSafeWallet = ethers.utils.formatEther(readBalanceOfRDSDevelopmentSafeWallet, 18);
      updateRdsDevelopmentWalletSafe(balanceOfRDSDevelopmentSafeWallet);

      //Team
      const readBalanceOfRDSTeamSafeWallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressTeamSafeWallet],
      })
      const balanceOfRDSTeamSafeWallet = ethers.utils.formatEther(readBalanceOfRDSTeamSafeWallet, 18);
      updateRdsTeamWalletSafe(balanceOfRDSTeamSafeWallet);

      //Marketing
      const readBalanceOfRDSMarketingSafeWallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressMarketingSafeWallet],
      })
      const balanceOfRDSMarketingSafeWallet = ethers.utils.formatEther(readBalanceOfRDSMarketingSafeWallet, 18);
      updateRdsMarketingWalletSafe(balanceOfRDSMarketingSafeWallet);
      //Pool 1
      //SafeRDSPool1 RDS
      const readBalanceOfRDSSafeRDSPool1Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [safeRDSWalletAddressPool1],
      })
      const balanceOfRdsSafeRdsPool1Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRDSPool1Wallet, 18);
      updateRdsSafeRDSPool1Wallet(balanceOfRdsSafeRdsPool1Wallet);

      //SafeRWAPool1 RDS
      const readBalanceOfRDSSafeRWAPool1Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool1Wallet],
      })
      const balanceOfRdsSafeRWAPool1Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRWAPool1Wallet, 18);
      updateRdsSafeRWAPool1Wallet(balanceOfRdsSafeRWAPool1Wallet);

      //SafeRWAPool1 USDT
      const readBalanceOfUSDTSafeRWAPool1Wallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool1Wallet],
      })
      const balanceOfUSDTSafeRWAPool1Wallet = ethers.utils.formatEther(readBalanceOfUSDTSafeRWAPool1Wallet, 18);
      updateUsdtSafeRWAPool1Wallet(balanceOfUSDTSafeRWAPool1Wallet);


      //Pool 2
      //SafeRDSPool2 RDS
      const readBalanceOfRDSSafeRDSPool2Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [safeRDSWalletAddressPool2],
      })
      const balanceOfRdsSafeRdsPool2Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRDSPool2Wallet, 18);
      updateRdsSafeRDSPool2Wallet(balanceOfRdsSafeRdsPool2Wallet);

      //SafeRWAPool2 RDS
      const readBalanceOfRDSSafeRWAPool2Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool2Wallet],
      })
      const balanceOfRdsSafeRWAPool2Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRWAPool2Wallet, 18);
      updateRdsSafeRWAPool2Wallet(balanceOfRdsSafeRWAPool2Wallet);

      //SafeRWAPool2 USDT
      const readBalanceOfUSDTSafeRWAPool2Wallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool2Wallet],
      })
      const balanceOfUSDTSafeRWAPool2Wallet = ethers.utils.formatEther(readBalanceOfUSDTSafeRWAPool2Wallet, 18);
      updateUsdtSafeRWAPool2Wallet(balanceOfUSDTSafeRWAPool2Wallet);

      //Pool 3
      //SafeRDSPool3 RDS
      const readBalanceOfRDSSafeRDSPool3Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [safeRDSWalletAddressPool3],
      })
      const balanceOfRdsSafeRdsPool3Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRDSPool3Wallet, 18);
      updateRdsSafeRDSPool3Wallet(balanceOfRdsSafeRdsPool3Wallet);

      //SafeRWAPool3 RDS
      const readBalanceOfRDSSafeRWAPool3Wallet = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool3Wallet],
      })
      const balanceOfRdsSafeRWAPool3Wallet = ethers.utils.formatEther(readBalanceOfRDSSafeRWAPool3Wallet, 18);
      updateRdsSafeRWAPool3Wallet(balanceOfRdsSafeRWAPool3Wallet);

      //SafeRWAPool2 USDT
      const readBalanceOfUSDTSafeRWAPool3Wallet = await readContract({
        address: tokenerc20.address,
        abi: tokenerc20.abi,
        functionName: 'balanceOf',
        args: [addressSafeRWAPool3Wallet],
      })
      const balanceOfUSDTSafeRWAPool3Wallet = ethers.utils.formatEther(readBalanceOfUSDTSafeRWAPool3Wallet, 18);
      updateUsdtSafeRWAPool3Wallet(balanceOfUSDTSafeRWAPool3Wallet);

      //Balance RDS of the Pool 1
      const readRDSTotal = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [Pool1.address],
      })
      const balanceOfRDSPool1 = ethers.utils.formatEther(readRDSTotal, 18);
      updateBalanceRDSPool1(balanceOfRDSPool1);

      //Total Stacked of the Pool 1
      const readTotalStacked = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'totalStacked',
      })
      const readTotalStackedPool1 = ethers.utils.formatEther(readTotalStacked, 18);
      updateRDSTotalStackedPool1(readTotalStackedPool1);

      //Total Stacked 7 Days of the Pool 1
      const readTotalStacked7Days = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getTotalStacked',
      })
      const getTotalStacked7DaysPool1 = ethers.utils.formatEther(readTotalStacked7Days, 18);
      updateTotalStacked7DaysPool1(getTotalStacked7DaysPool1);

      //Balance RDS of the Pool 2
      const readRDSTotalPool2 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [Pool2.address],
      })
      const balanceOfRDSPool2 = ethers.utils.formatEther(readRDSTotalPool2, 18);
      updateBalanceRDSPool2(balanceOfRDSPool2);

      //Total Stacked of the Pool 2
      const readTotalStackedPool2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'totalStacked',
      })
      const totalStackedPool2 = ethers.utils.formatEther(readTotalStackedPool2, 18);
      updateRDSTotalStackedPool2(totalStackedPool2);

      //Total Stacked 7 Days of the Pool 2
      const readTotalStacked7DaysPool2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getTotalStacked',
      })
      const getTotalStacked7DaysPool2 = ethers.utils.formatEther(readTotalStacked7DaysPool2, 18);
      updateTotalStacked7DaysPool2(getTotalStacked7DaysPool2);

      //Balance RDS of the Pool 3
      const readRDSTotalPool3 = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'balanceOf',
        args: [Pool3.address],
      })
      const balanceOfRDSPool3 = ethers.utils.formatEther(readRDSTotalPool3, 18);
      updateBalanceRDSPool3(balanceOfRDSPool3);

      //Total Stacked of the Pool 3
      const readTotalStackedPool3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'totalStacked',
      })
      const totalStackedPool3 = ethers.utils.formatEther(readTotalStackedPool3, 18);
      updateRDSTotalStackedPool3(totalStackedPool3);

      //Total Stacked 7 Days of the Pool 3
      const readTotalStacked7DaysPool3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getTotalStacked',
      })
      const getTotalStacked7DaysPool3 = ethers.utils.formatEther(readTotalStacked7DaysPool3, 18);
      updateTotalStacked7DaysPool3(getTotalStacked7DaysPool3);

      //List transactions to be confirmed for RDS SC
      const readTransactionToBeConf = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for RDS SC
      const readSubmitedTransaction = await readContract({
        address: RDS.address,
        abi: RDS.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmed(readTransactionToBeConf);
      updatesubmitedTransactions(readSubmitedTransaction);

      //Pool 1
      //List transactions to be confirmed for Pool SC
      const readTransactionToBeConfPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for Pool SC
      const readSubmitedTransactionPool1 = await readContract({
        address: Pool1.address,
        abi: Pool1.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmedPool1(readTransactionToBeConfPool1);
      updatesubmitedTransactionsPool1(readSubmitedTransactionPool1);

      //Pool 2
      //List transactions to be confirmed for Pool SC
      const readTransactionToBeConfPool2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for Pool SC
      const readSubmitedTransactionPool2 = await readContract({
        address: Pool2.address,
        abi: Pool2.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmedPool2(readTransactionToBeConfPool2);
      updatesubmitedTransactionsPool2(readSubmitedTransactionPool2);

      //Pool 3
      //List transactions to be confirmed for Pool SC
      const readTransactionToBeConfPool3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getTransactionsToBeConfirmed',
        args: [address]
      })

      //List submited transactions for Pool SC
      const readSubmitedTransactionPool3 = await readContract({
        address: Pool3.address,
        abi: Pool3.abi,
        functionName: 'getSubmitedTransactions',
        args: [address]
      })
      updateTransactionsToBeConfirmedPool3(readTransactionToBeConfPool3);
      updatesubmitedTransactionsPool3(readSubmitedTransactionPool3);
    
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    
    <div className='admin_container'>
    {address === ownerAddress1 || address === ownerAddress2 || address === ownerAddress3 || address === ownerAddress4 ?
    <>
    <div className='admin'>
      <p className='admin_title'>Admin</p>
      <div className='admin_info_container'>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Total Supply RDS</p>
            <p className='admin_info_number'>{totalSupply}/{maxSupply}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>RDS of Marketing Wallet</p>
            <p className='admin_info_address_little'>{addressMarketingSafeWallet}</p>
            <p className='admin_info_number'>{rdsMarketingWalletSafe} RDS</p>
          </div>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RDS of Development Wallet</p>
            <p className='admin_info_address_little'>{addressDevelopmentSafeWallet}</p>
            <p className='admin_info_number'>{rdsDevelopmentWalletSafe} RDS</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>RDS of Team Wallet</p>
            <p className='admin_info_address_little'>{addressTeamSafeWallet}</p>
            <p className='admin_info_number'>{rdsTeamWalletSafe} RDS</p>
          </div>
        </div>
          
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contracts owner's address n°1</p>
            <p className='admin_info_number'>{ownerAddress1}</p>
          </div>
        </div>
            
        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contracts owner's address n°2</p>
            <p className='admin_info_number'>{ownerAddress2}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contracts owner's address n°3</p>
            <p className='admin_info_number'>{ownerAddress3}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart contracts owner's address n°4</p>
            <p className='admin_info_number'>{ownerAddress4}</p>
          </div>
        </div>

        <p className='admin_title'>RDS</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart Contract Address</p>
            <p className='admin_info_number'>{RDS.address}</p>
          </div>
        </div>
        
        <p className='admin_title'>Pool 1</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart Contract address</p>
            <p className='admin_info_number'>{Pool1.address}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>SafeRDS Wallet address</p>
            <p className='admin_info_number'>{showSafeRDSWalletAddressPool1}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRDS Wallet</p>
            <p className='admin_info_address_little'>{showSafeRDSWalletAddressPool1}</p>
            <p className='admin_info_number'>{rdsSafeRDSPool1Wallet} RDS</p>
          </div>

        </div>
        
        
        <div className='admin_info_container_part'>

          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool1Wallet}</p>
            <p className='admin_info_number'>{rdsSafeRWAPool1Wallet} RDS</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool1Wallet}</p>
            <p className='admin_info_number'>{usdtSafeRWAPool1Wallet} USDT</p>
          </div>

        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Balance of RDS</p>
            <p className='admin_info_number'>{balanceRDSPool1}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked</p>
            <p className='admin_info_number'>{RDSTotalStackedPool1}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked at least 7 Days old</p>
            <p className='admin_info_number'>{totalStacked7DaysPool1}</p>
          </div>
        </div>



        <p className='admin_title'>Pool 2</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart Contract address</p>
            <p className='admin_info_number'>{Pool2.address}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>SafeRDS Wallet address</p>
            <p className='admin_info_number'>{showSafeRDSWalletAddressPool2}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRDS Wallet</p>
            <p className='admin_info_address_little'>{showSafeRDSWalletAddressPool2}</p>
            <p className='admin_info_number'>{rdsSafeRDSPool2Wallet} RDS</p>
          </div>

        </div>
        
        
        <div className='admin_info_container_part'>

          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool2Wallet}</p>
            <p className='admin_info_number'>{rdsSafeRWAPool2Wallet} RDS</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool2Wallet}</p>
            <p className='admin_info_number'>{usdtSafeRWAPool2Wallet} USDT</p>
          </div>

        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Balance of RDS</p>
            <p className='admin_info_number'>{balanceRDSPool2}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked</p>
            <p className='admin_info_number'>{RDSTotalStackedPool2}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked at least 7 Days old</p>
            <p className='admin_info_number'>{totalStacked7DaysPool2}</p>
          </div>
        </div>


        <p className='admin_title'>Pool 3</p>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Smart Contract address</p>
            <p className='admin_info_number'>{Pool3.address}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>SafeRDS Wallet address</p>
            <p className='admin_info_number'>{showSafeRDSWalletAddressPool3}</p>
          </div>
        </div>

        <div className='admin_info_container_part'>
          
          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRDS Wallet</p>
            <p className='admin_info_address_little'>{showSafeRDSWalletAddressPool3}</p>
            <p className='admin_info_number'>{rdsSafeRDSPool3Wallet} RDS</p>
          </div>

        </div>
        
        
        <div className='admin_info_container_part'>

          <div className='admin_info'>
            <p className='admin_info_title'>RDS of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool3Wallet}</p>
            <p className='admin_info_number'>{rdsSafeRWAPool3Wallet} RDS</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>USDT of SafeRWA Wallet</p>
            <p className='admin_info_address_little'>{addressSafeRWAPool3Wallet}</p>
            <p className='admin_info_number'>{usdtSafeRWAPool3Wallet} USDT</p>
          </div>

        </div>

        <div className='admin_info_container_part'>
          <div className='admin_info'>
            <p className='admin_info_title'>Balance of RDS</p>
            <p className='admin_info_number'>{balanceRDSPool3}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked</p>
            <p className='admin_info_number'>{RDSTotalStackedPool3}</p>
          </div>

          <div className='admin_info'>
            <p className='admin_info_title'>Total stacked at least 7 Days old</p>
            <p className='admin_info_number'>{totalStacked7DaysPool3}</p>
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
        {transactionsToBeConfirmedPool1 && transactionsToBeConfirmedPool1.map((value, index) => {
          return <TransactionToBeConfirmedPool1 data={value} index={index} key={index} confirmTransactionPool1={confirmTransactionPool1} deleteTransactionPool1={deleteTransactionPool1}></TransactionToBeConfirmedPool1>;
        })}
        </>
        <>
        {submitedTransactionsPool1 && submitedTransactionsPool1.map((value, index) => {
          return <SubmitedTransactionsPool1 data={value} index={index} key={index} deleteTransactionPool1={deleteTransactionPool1}></SubmitedTransactionsPool1>;
        })}
        </>


        <>
        {transactionsToBeConfirmedPool2 && transactionsToBeConfirmedPool2.map((value, index) => {
          return <TransactionToBeConfirmedPool2 data={value} index={index} key={index} confirmTransactionPool2={confirmTransactionPool2} deleteTransactionPool2={deleteTransactionPool2}></TransactionToBeConfirmedPool2>;
        })}
        </>
        <>
        {submitedTransactionsPool2 && submitedTransactionsPool2.map((value, index) => {
          return <SubmitedTransactionsPool2 data={value} index={index} key={index} deleteTransactionPool2={deleteTransactionPool2}></SubmitedTransactionsPool2>;
        })}
        </>


        <>
        {transactionsToBeConfirmedPool3 && transactionsToBeConfirmedPool3.map((value, index) => {
          return <TransactionToBeConfirmedPool3 data={value} index={index} key={index} confirmTransactionPool3={confirmTransactionPool3} deleteTransactionPool3={deleteTransactionPool3}></TransactionToBeConfirmedPool3>;
        })}
        </>
        <>
        {submitedTransactionsPool3 && submitedTransactionsPool3.map((value, index) => {
          return <SubmitedTransactionsPool3 data={value} index={index} key={index} deleteTransactionPool3={deleteTransactionPool3}></SubmitedTransactionsPool3>;
        })}
        </>
        
        {transactionsToBeConfirmedPool1 && transactionsToBeConfirmedPool1.length===0 && submitedTransactionsPool1.length===0 && transactionsToBeConfirmedPool2 && transactionsToBeConfirmedPool2.length===0 && submitedTransactionsPool2.length===0 && transactionsToBeConfirmedPool3 && transactionsToBeConfirmedPool3.length===0 && submitedTransactionsPool3.length===0 && transactionsToBeConfirmed && transactionsToBeConfirmed.length===0 && submitedTransactions.length===0 ? 
        <>
          <p className='admin_info'>none</p>
        </>

        :''
        }

      </div>
    </div>


      {popup && boolSubmitMintForTeam ? 
        <Popup loading={loading} number={' RDS tokens!'} action='submit: mintForTeam' updatePopup={updatePopup} updateBoolSubmitMintForTeam={updateBoolSubmitMintForTeam} >
        </Popup>
        :popup && boolSubmitMint ? 
        <Popup loading={loading} number={mintRDSTokens+' RDS tokens!'} action='submit: mint' updatePopup={updatePopup} updateBoolSubmitMint={updateBoolSubmitMint} >
        </Popup>
        :popup && boolSubmitBurn ? 
        <Popup loading={loading} number={burnRDSTokens+' RDS tokens!'} action='submit: burn' updatePopup={updatePopup} updateBoolSubmitBurn={updateBoolSubmitBurn} >
        </Popup>
        :popup && boolSubmitWithdraw ? 
        <Popup loading={loading} number={withdrawTokens+' tokens!'} action='submit: withdraw' updatePopup={updatePopup} updateBoolSubmitWithdraw={updateBoolSubmitWithdraw} >
        </Popup>
        :popup && boolRenounce ? 
        <Popup loading={loading} number={''} action='submit: renounce' updatePopup={updatePopup} updateBoolRenounce={updateBoolRenounce} >
        </Popup>
        /*
        :popup && boolSubmitChangeOwner1 ? 
        <Popup loading={loading} number={''} action={'submit: change the owner 1 to '+addressNewOwner1} updatePopup={updatePopup} updateBoolSubmitChangeOwner1={updateBoolSubmitChangeOwner1} >
        </Popup>
        :popup && boolSubmitChangeOwner2 ? 
        <Popup loading={loading} number={''} action={'submit: change the owner 2 to '+addressNewOwner2} updatePopup={updatePopup} updateBoolSubmitChangeOwner2={updateBoolSubmitChangeOwner2} >
        </Popup>*/
        : boolConfirmTransaction ?
        <Popup loading={loading} number={''} action={'confirmed the transaction'} updatePopup={updatePopup} updateBoolConfirmTransaction={updateBoolConfirmTransaction} >
        </Popup>
        : boolDeleteTransaction ?
        <Popup loading={loading} number={''} action={'deleted the transaction'} updatePopup={updatePopup} updateBoolDeleteTransaction={updateBoolDeleteTransaction} >
        </Popup>
        : boolConfirmTransactionPool1 ?
        <Popup loading={loading} number={''} action={'confirmed the transaction Pool 1 '} updatePopup={updatePopup} updateBoolConfirmTransactionPool1={updateBoolConfirmTransactionPool1} >
        </Popup>
        : boolDeleteTransactionPool1 ?
        <Popup loading={loading} number={''} action={'deleted the transaction Pool 1'} updatePopup={updatePopup} updateBoolDeleteTransactionPool1={updateBoolDeleteTransactionPool1} >
        </Popup>/*
        :popup && boolSubmitChangeOwner1AddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 1 owner 1 address to '+ newOwner1AddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeOwner1AddressPool1={updateBoolSubmitChangeOwner1AddressPool1} >
        </Popup>
        :popup && boolSubmitChangeOwner2AddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 1 owner 2 address to '+ newOwner2AddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeOwner2AddressPool1={updateBoolSubmitChangeOwner2AddressPool1} >
        </Popup>*/
        :popup && boolSubmitChangeSafeRDSWalletAddressPool1 ? 
        <Popup loading={loading} number={''} action={'submit: change the SafeRDS Wallet address of the pool 1 to '+ newSafeRDSWalletAddressPool1} updatePopup={updatePopup} updateBoolSubmitChangeSafeRDSWalletAddressPool1={updateBoolSubmitChangeSafeRDSWalletAddressPool1} >
        </Popup>
        :popup && boolSendYieldPool1? 
        <Popup loading={loading} number={sendYieldPool1 +' RDS to the stackers of Pool 1'} action='submit: send ' updatePopup={updatePopup} updateBoolsendYieldPool1={updateBoolsendYieldPool1}>
        </Popup>
        :popup && boolSubmitWithdrawPool1 ? 
        <Popup loading={loading} number={withdrawTokensPool1+' tokens!'} action='submit: withdraw Pool 1' updatePopup={updatePopup} updateBoolSubmitWithdrawPool1={updateBoolSubmitWithdrawPool1} >
        </Popup>
        :popup && boolRenouncePool1 ? 
        <Popup loading={loading} number={''} action='submit: renounce Pool 1' updatePopup={updatePopup} updateBoolRenouncePool1={updateBoolRenouncePool1} >
        </Popup>
        : boolConfirmTransactionPool2 ?
        <Popup loading={loading} number={''} action={'confirmed the transaction Pool 2 '} updatePopup={updatePopup} updateBoolConfirmTransactionPool2={updateBoolConfirmTransactionPool2} >
        </Popup>
        : boolDeleteTransactionPool2 ?
        <Popup loading={loading} number={''} action={'deleted the transaction Pool 2'} updatePopup={updatePopup} updateBoolDeleteTransactionPool2={updateBoolDeleteTransactionPool2} >
        </Popup>/*
        :popup && boolSubmitChangeOwner1AddressPool2 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 2 owner 1 address to '+ newOwner1AddressPool2} updatePopup={updatePopup} updateBoolSubmitChangeOwner1AddressPool2={updateBoolSubmitChangeOwner1AddressPool2} >
        </Popup>
        :popup && boolSubmitChangeOwner2AddressPool2 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 2 owner 2 address to '+ newOwner2AddressPool2} updatePopup={updatePopup} updateBoolSubmitChangeOwner2AddressPool2={updateBoolSubmitChangeOwner2AddressPool2} >
        </Popup>*/
        :popup && boolSubmitChangeSafeRDSWalletAddressPool2 ? 
        <Popup loading={loading} number={''} action={'submit: change the SafeRDS Wallet address of the pool 2 to '+ newSafeRDSWalletAddressPool2} updatePopup={updatePopup} updateBoolSubmitChangeSafeRDSWalletAddressPool2={updateBoolSubmitChangeSafeRDSWalletAddressPool2} >
        </Popup>
        :popup && boolSendYieldPool2? 
        <Popup loading={loading} number={sendYieldPool2 +' RDS to the stackers of Pool 2'} action='submit: send ' updatePopup={updatePopup} updateBoolsendYieldPool2={updateBoolsendYieldPool2}>
        </Popup>
        :popup && boolSubmitWithdrawPool2 ? 
        <Popup loading={loading} number={withdrawTokensPool2+' tokens!'} action='submit: withdraw Pool 2' updatePopup={updatePopup} updateBoolSubmitWithdrawPool2={updateBoolSubmitWithdrawPool2} >
        </Popup>
        :popup && boolRenouncePool2 ? 
        <Popup loading={loading} number={''} action='submit: renounce Pool 2' updatePopup={updatePopup} updateBoolRenouncePool2={updateBoolRenouncePool2} >
        </Popup>
        : boolConfirmTransactionPool3 ?
        <Popup loading={loading} number={''} action={'confirmed the transaction Pool 3 '} updatePopup={updatePopup} updateBoolConfirmTransactionPool3={updateBoolConfirmTransactionPool3} >
        </Popup>
        : boolDeleteTransactionPool3 ?
        <Popup loading={loading} number={''} action={'deleted the transaction Pool 3'} updatePopup={updatePopup} updateBoolDeleteTransactionPool3={updateBoolDeleteTransactionPool3} >
        </Popup>/*
        :popup && boolSubmitChangeOwner1AddressPool3 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 3 owner 1 address to '+ newOwner1AddressPool3} updatePopup={updatePopup} updateBoolSubmitChangeOwner1AddressPool3={updateBoolSubmitChangeOwner1AddressPool3} >
        </Popup>
        :popup && boolSubmitChangeOwner2AddressPool3 ? 
        <Popup loading={loading} number={''} action={'submit: change the pool 3 owner 2 address to '+ newOwner2AddressPool3} updatePopup={updatePopup} updateBoolSubmitChangeOwner2AddressPool3={updateBoolSubmitChangeOwner2AddressPool3} >
        </Popup>*/
        :popup && boolSubmitChangeSafeRDSWalletAddressPool3 ? 
        <Popup loading={loading} number={''} action={'submit: change the SafeRDS Wallet address of the pool 3 to '+ newSafeRDSWalletAddressPool3} updatePopup={updatePopup} updateBoolSubmitChangeSafeRDSWalletAddressPool3={updateBoolSubmitChangeSafeRDSWalletAddressPool3} >
        </Popup>
        :popup && boolSendYieldPool3? 
        <Popup loading={loading} number={sendYieldPool3 +' RDS to the stackers of Pool 3'} action='submit: send ' updatePopup={updatePopup} updateBoolsendYieldPool3={updateBoolsendYieldPool3}>
        </Popup>
        :popup && boolSubmitWithdrawPool3 ? 
        <Popup loading={loading} number={withdrawTokensPool3+' tokens!'} action='submit: withdraw Pool 3' updatePopup={updatePopup} updateBoolSubmitWithdrawPool3={updateBoolSubmitWithdrawPool3} >
        </Popup>
        :popup && boolRenouncePool3 ? 
        <Popup loading={loading} number={''} action='submit: renounce Pool 3' updatePopup={updatePopup} updateBoolRenouncePool3={updateBoolRenouncePool3} >
        </Popup>
        :''
      }
      
    
    {/*
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Change Owner 1 of the smarts contracts</p>
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
        <p className='admin_title'>Change Owner 2 of the smarts contracts</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={addressNewOwner2} onChange={e => updateAddressNewOwner2(e.target.value)}></input>
          <p>New Owner's address</p>
        </div>
        <button className="admin_button" onClick={() => changeOwner2()}>
          Submit Change Owner 2
        </button>
      </div>
    </div> */}

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Mint RDS Tokens for the Team</p>
        <button className="admin_button" onClick={() => mintForTeam()}>
          Submit Mint Tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Mint RDS Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="number" placeholder="Number of tokens" value={mintRDSTokens} onChange={e => updateMintRDSTokens(e.target.value)}></input>
          <p>Amount Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Destination address" value={addressMintRDSTokens} onChange={e => updateAddressMintRDSTokens(e.target.value)}></input>
          <p>Address Destination</p>
        </div>
        <button className="admin_button" onClick={() => mint()}>
          Submit Mint Tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Burn RDS Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="RDS" type="number" placeholder="Number of tokens" value={burnRDSTokens} onChange={e => updateBurnRDSTokens(e.target.value)}></input>
          <p>RDS Token</p>
        </div>
        <button className="admin_button" onClick={() => burn()}>
          Submit Burn tokens
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Withdraw ERC-20 Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="number" placeholder="Number of tokens" value={withdrawTokens} onChange={e => updateWithdrawTokens(e.target.value)}></input>
          <p>Amount Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Address of the token" value={withdrawAddressToken} onChange={e => updateWithdrawAddressToken(e.target.value)}></input>
          <p>Address Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Destination address" value={withdrawTo} onChange={e => updateWithdrawTo(e.target.value)}></input>
          <p>Address Destination</p>
        </div>
        <button className="admin_button" onClick={() => withdraw()}>
          Submit Withdraw tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Renounce SC</p>
        <button className="admin_button" onClick={() => renounce()}>
          Submit Renounce
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Change SafeRDS Wallet Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newSafeRDSWalletAddressPool1} onChange={e => updateNewSafeRDSWalletAddressPool1(e.target.value)}></input>
          <p>New SafeRDS Wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeSafeRDSWalletAddressPool1()}>
          Submit change SafeRDS Wallet Address
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Send Yield</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="token" type="number" placeholder="Amount in RDS" value={sendYieldPool1} onChange={e => updateSendYieldPool1(e.target.value)}></input>
          <p>RDS</p>
        </div>
        <button className="admin_button" onClick={() => sendYieldToPool1()}>
          Submit Send Yield
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 1 Withdraw ERC-20 Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="number" placeholder="Number of tokens" value={withdrawTokensPool1} onChange={e => updateWithdrawTokensPool1(e.target.value)}></input>
          <p>Amount Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Address of the token" value={withdrawAddressTokenPool1} onChange={e => updateWithdrawAddressTokenPool1(e.target.value)}></input>
          <p>Address Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Destination address" value={withdrawToPool1} onChange={e => updateWithdrawToPool1(e.target.value)}></input>
          <p>Address Destination</p>
        </div>
        <button className="admin_button" onClick={() => withdrawPool1()}>
          Submit Withdraw tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Renounce Pool 1</p>
        <button className="admin_button" onClick={() => renouncePool1()}>
          Submit Renounce
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 2 Change SafeRDS Wallet Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newSafeRDSWalletAddressPool2} onChange={e => updateNewSafeRDSWalletAddressPool2(e.target.value)}></input>
          <p>New SafeRDS Wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeSafeRDSWalletAddressPool2()}>
          Submit change SafeRDS Wallet Address
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 2 Send Yield</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="token" type="number" placeholder="Amount in RDS" value={sendYieldPool2} onChange={e => updateSendYieldPool2(e.target.value)}></input>
          <p>RDS</p>
        </div>
        <button className="admin_button" onClick={() => sendYieldToPool2()}>
          Submit Send Yield
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 2 Withdraw ERC-20 Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="number" placeholder="Number of tokens" value={withdrawTokensPool2} onChange={e => updateWithdrawTokensPool2(e.target.value)}></input>
          <p>Amount Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Address of the token" value={withdrawAddressTokenPool2} onChange={e => updateWithdrawAddressTokenPool2(e.target.value)}></input>
          <p>Address Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Destination address" value={withdrawToPool2} onChange={e => updateWithdrawToPool2(e.target.value)}></input>
          <p>Address Destination</p>
        </div>
        <button className="admin_button" onClick={() => withdrawPool2()}>
          Submit Withdraw tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Renounce Pool 2</p>
        <button className="admin_button" onClick={() => renouncePool2()}>
          Submit Renounce
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 3 Change SafeRDS Wallet Address</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="address" type="string" placeholder="New Address" value={newSafeRDSWalletAddressPool3} onChange={e => updateNewSafeRDSWalletAddressPool3(e.target.value)}></input>
          <p>New SafeRDS Wallet's address</p>
        </div>
        <button className="admin_button" onClick={() => changeSafeRDSWalletAddressPool3()}>
          Submit change SafeRDS Wallet Address
        </button>
      </div>
    </div>
    
    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 3 Send Yield</p>
        <div className='admin_input_container'>
          <input className="admin_input" id="token" type="number" placeholder="Amount in RDS" value={sendYieldPool3} onChange={e => updateSendYieldPool3(e.target.value)}></input>
          <p>RDS</p>
        </div>
        <button className="admin_button" onClick={() => sendYieldToPool3()}>
          Submit Send Yield
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Pool 3 Withdraw ERC-20 Tokens</p>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="number" placeholder="Number of tokens" value={withdrawTokensPool3} onChange={e => updateWithdrawTokensPool3(e.target.value)}></input>
          <p>Amount Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Address of the token" value={withdrawAddressTokenPool3} onChange={e => updateWithdrawAddressTokenPool3(e.target.value)}></input>
          <p>Address Tokens</p>
        </div>
        <br></br>
        <div className='admin_input_container'>
        <input className="admin_input" id="Tokens" type="string" placeholder="Destination address" value={withdrawToPool3} onChange={e => updateWithdrawToPool3(e.target.value)}></input>
          <p>Address Destination</p>
        </div>
        <button className="admin_button" onClick={() => withdrawPool3()}>
          Submit Withdraw tokens
        </button>
      </div>
    </div>

    <div className='admin'>
      <div className='admin_section'>
        <p className='admin_title'>Renounce Pool 3</p>
        <button className="admin_button" onClick={() => renouncePool3()}>
          Submit Renounce
        </button>
      </div>
    </div>

  </>
    : '' }
    </div>
  )
}

export default Admin
