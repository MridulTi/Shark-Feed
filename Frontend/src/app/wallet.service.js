import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ethers} from 'ethers'
// Define async thunk action to connect wallet

let config={
    provider:null,
    signer:null
}


export const getSigner = () => config.signer





export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async (_,{getState}) => {
    try {
       
        if (window.ethereum !== undefined) {
            
            config.provider =  new ethers.BrowserProvider(window.ethereum);
        
            window.ethereum.on("accountChanged", () => {
                window.location.reload();
            });
        
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }

            let state = getState();
            
            if (state.wallet.noMetamask || config.provider === null) return null;
           // console.log(state.wallet,config);
            config.signer = config.provider.getSigner();
            let accounts = await config.provider.listAccounts();
            let networkID = (await config.provider.getNetwork()).chainId;
            console.log(networkID,accounts[0].address);
            return { address: accounts[0].address,isConnected:true };
        
     
    } catch (error) {
      // Handle error if connection fails
      console.log('Failed to connect wallet: ' + error.message);
    }
  }
);

const initialState = {
  isConnected: false,
  account: null,
  address: "",
  error: null,
  noMetamask:null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reducers: {
        // Other reducers...
        disconnectWallet(state,action){
          // Reset wallet state here
          state.isConnected = false;
          state.isConnecting = false;
          state.errorConnecting = false;
          state.accountAddress = '';
        },
      },
  },
   extraReducers(builder){
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isConnected = false;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled,(state,action)=>{
        let payload=action.payload
        state.isConnecting=false;
        console.log("hi");
        if(!payload) return state;

        state.isConnected=true
        state.account=payload.address
        console.log(state.account);
        

    })
      .addCase(connectWallet.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;