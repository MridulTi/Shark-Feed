import React from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { disconnectWallet } from '../app/wallet.service'; // Import the action to disconnect the wallet

function LogoutButton() {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const handleLogout = () => {
    // Dispatch the action to disconnect the wallet
    dispatch(disconnectWallet);
    console.log("h")
    navigate("/")
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
