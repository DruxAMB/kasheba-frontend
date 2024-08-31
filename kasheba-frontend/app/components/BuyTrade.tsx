"use client"

import React, { useState } from "react";
import SwapImage from "../../public/images/swap-image.png";
import Image from "next/image";
import axios from "axios"; // Import axios to make API calls
import Web3 from "web3"; // Import Web3 for interacting with the smart contract
import CityIndex from "../KashebaTrade

const BuyTrade = ({ getData }: any) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null); // Add state for user account

  // Function to connect to MetaMask and set the account
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  const handleBuy = async () => {
    try {
      // Step 1: Create a payment request
      const paymentResponse = await axios.post('https://api-sandbox.circle.com/v1/paymentIntents', {
        amount: amount.toString(), // Convert to string if necessary
        currency: 'USD', // Specify the currency
      });

      // Assuming the payment is successful, proceed to mint tokens
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        CityIndex,
        "0xe4dFcD8642913C73b0BC3140130b43aa132d1de9" // Replace with your contract address
      );

      // Call the mint function
      const tx = await contract.methods.buy(account, amount).send({ from: account });
      console.log("Tokens minted successfully:", tx);
    } catch (err) {
      setError(err.message);
      console.error('Error during purchase:', err);
    }
  };

  return (
    <div className="swap grid gap-5">
      <div className="grid grid-cols-2">
        <p className="border-b-2 border-[#24EACC] text-center py-2">
          Buy {getData.nameTag}
        </p>
        <p className="border-b-2 active:border-[#24EACC] text-center py-2">
          Trade KSB
        </p>
      </div>
      <div className="flex bg-[#262626] bg-opacity-20 border border-[#C9C9C9] rounded-lg p-3">
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent text-[#C9C9C9] w-full outline-none"
        />
        <div className="flex gap-1">
          <Image
            src={SwapImage}
            alt="swapImage"
            height={17}
            width={12}
            className="h-[17px] w-[12px] m-auto"
          />
          <p>KSB</p>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={connectWallet} className="bg-[#24EACC] w-full px-8 py-3 text-black rounded-3xl">
        Connect Wallet
      </button>
      <button onClick={handleBuy} className="bg-[#24EACC] w-full px-8 py-3 text-black rounded-3xl">
        BUY {getData.nameTag}
      </button>
    </div>
  );
};

export default BuyTrade;