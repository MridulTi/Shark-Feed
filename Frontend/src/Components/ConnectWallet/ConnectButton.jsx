import React from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../../app/wallet.service";

const ConnectButton = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.wallet.isConnected);
const navigate=useNavigate()
  const handleConnect = async () => {
    try {
      // Dispatch action to connect wallet
      await dispatch(connectWallet());
      
      
    } catch (error) {
      console.error("Failed to connect:", error.message);
    }
  };

  return (
    <button onClick={handleConnect} disabled={isConnected} className="bg-base-accent px-6 py-2 text-gray-5 rounded-full">
      {isConnected ? navigate("/Onboarding") : "Connect Wallet"}
    </button>
  );
};

export default ConnectButton;