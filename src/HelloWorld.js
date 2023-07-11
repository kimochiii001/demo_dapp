
// import React from "react";
// import { useEthers } from "@usedapp/core";
import Web3 from 'web3';
import {
   
    quickNodeToken,
    connectWallet,
    getCurrentWalletConnected,
    loadTotalSupply,
    checkBalanceOf,
    transferCoin,
    approve,
    allowance,
    transferFromCoin,
} from "./util/interact.js";
// import { useWeb3 } from '@3rdweb/hooks'

import TryUseDappExample from './util/logout.js'

import alchemylogo from "./alchemylogo.svg";
import { useEffect, useState } from "react";
import { formatBalance, formatNumberToBalance } from './util/index.js';
import { MuiSnackbar } from './components/MuiSnackbar.js';




const HelloWorld = () => {
    //state variables
    // const { address, connectWallet } = useWeb3();
    // const [connected, setConnected] = useState(false);
    // let web3;
      const[totalSupply, setTotalSupply] = useState(null)
      const[balance, setBalance] = useState(0)


    const [walletAddress, setWalletAddress] = useState("");
    const [addressRecipient, setAddressRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [onTransfer, setOnTransfer] = useState(false);
    const [check, setCheck] = useState(false);


    const [addressSpender, setAddressSpender] = useState("");
    const [addressOwner, setAddressOwner] = useState("");

    const[balanceAllowance, setBalanceAllowance] = useState(0)

    const [addressSender, setAddressSender] = useState("");
    // const [addressRecipient, setAddressSender] = useState("");

    const [openSnack,setOpenSnack] = useState(false);



    const [addressBalanceOf, setAddressBalanceOf] = useState("");
    const [status, setStatus] = useState("");
    
    //called only once
    useEffect(() => {
        // const messageCurrent = async () => {
        //     const result = await loadCurrentMessage()
        //     setMessage(result);
        //     // console.log(message);
        // };
        // messageCurrent();
         
      const getTotalSupply = async () => {
        const result = formatBalance(await loadTotalSupply())
        setTotalSupply(result);
        console.log(result);
        // console.log(message);
    };
      getTotalSupply();
        // addSmartContractListener();
        const getCurrentWallet = async () => {
            const address = (await getCurrentWalletConnected()).address;
            const status = (await getCurrentWalletConnected()).status;
            setWalletAddress(address);
            setStatus(status);
        }
        getCurrentWallet();

        // addWalletListener();

      







    }, []);

  
    function addWalletListener() { //TODO: implement

    }

    const connectWalletPressed = async () => { //TODO: implement
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWalletAddress(walletResponse.address);
        setCheck(walletResponse.check);
       console.log(check);
        // console.log(status);
        // console.log(walletAddress);
    };

    // const onUpdatePressed = async () => { //TODO: implement
    //     const { status } = await updateMessage(walletAddress, newMessage);
    //     setStatus(status);
    // };

    const onBalanceOf = async () =>{
        const result = formatBalance((await checkBalanceOf(addressBalanceOf)).balanceOf);
        setCheck((await checkBalanceOf(addressBalanceOf)).check);
        setStatus((await checkBalanceOf(addressBalanceOf)).status);

        setBalance(result);
       
        console.log('check open snack' + openSnack);
        
        console.log(balance);
        console.log(status);
        console.log(check);


        
    }

    const onTransferCoin = async () =>{
        const {status} = await transferCoin(addressRecipient, amount, walletAddress);
        console.log(amount);
        console.log(addressRecipient);

        
        setStatus(status);
     }
     const onTransferFromCoin = async () =>{
        const {status} = await transferFromCoin(addressSender, addressRecipient, amount,walletAddress);
        console.log('TransferFrom');

        console.log(walletAddress);
        console.log(addressSender);
        console.log(addressRecipient);

        


        console.log(amount);
       

        
        setStatus(status);
     }
     const onApproveCoin = async () =>{
        const {status} = await approve(addressSpender, amount, walletAddress);
        console.log(amount);
        console.log(addressSpender);

        
        setStatus(status);
     }


  
     const onAllowance = async () =>{
        const result = formatBalance(await allowance(addressOwner, addressSpender));

        setBalanceAllowance(result);
    }


    const handleClose =(event, reason) =>{
        if(reason == 'clickWay'){
            return;
        }
        setOpenSnack(false);

    }

    //the UI of our component
    return (

       
        <div id="container">


   

            <img id="logo" src={alchemylogo}></img>


         {/* <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button> */}

            <MuiSnackbar title={walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )} message={status} onSnackbar={check} 
            // checkClose={handleClose}
            checkOpen={openSnack}
            onClick={() =>{
                connectWalletPressed();
                setOpenSnack(true);
        

            }}  />

           

            <h2 style={{ paddingTop: "18px" }}>Total Supply: {totalSupply}</h2>
            <p>tong token {totalSupply}</p>
            <h2 style={{ paddingTop: "18px" }}>BalanceOf:</h2>
            <p>{balance}</p>
            <input
                    type="text"
                    placeholder="Address"
                   onChange={(e) =>setAddressBalanceOf(e.target.value)}

                   value={addressBalanceOf}
                
                />
            {/* <button id="publish" onClick={onBalanceOf} >
                   Check Balance
                </button> */}
                <MuiSnackbar title={'check balance'} message={status} onSnackbar={check} 
               checkOpen={openSnack}
                onClick={ () => {onBalanceOf();
                setOpenSnack(true);
                }}
                 checkClose={handleClose}
                 />
    {/* <Snackbar message='form submit successfully' autoHideDuration={3000}  /> */}
               

                <button id="publish" onClick={setOnTransfer} >
                  Bat chuyen tien
                </button>

         {  onTransfer && <h2 style={{ paddingTop: "18px" }}>Transfer:</h2>}

          { onTransfer &&  (<div>
                <input
                    type="text"
                    placeholder="Address Recipient:"

                    onChange={(e) => setAddressRecipient(e.target.value)}
                    value={addressRecipient}
                  
                
                />
                <p></p>
                <input
                    type="number"
                    placeholder="Amount:"
                    onChange={(e) =>setAmount(e.target.value)}
                    value={amount}
                />
                <p id="status">{status}</p>

                <button id="publish" onClick={onTransferCoin} >
                    Transfer
                </button>

            </div>)
            
            }
           <div>
                <input
                    type="text"
                    placeholder="Address Spender:"

                    onChange={(e) => setAddressSpender(e.target.value)}
                    value={addressSpender}
                  
                
                />
                <p></p>
                <input
                    type="number"
                    placeholder="Amount:"
                    onChange={(e) =>setAmount(e.target.value)}
                    value={amount}
                />
                <p id="status">{status}</p>

                <button id="publish" onClick={onApproveCoin} >
                    Approve
                </button>

            </div>
            <p> Balance Allowance: {balanceAllowance}</p>
            <input
                    type="text"
                    placeholder="Address Owner"
                   onChange={(e) =>setAddressOwner(e.target.value)}

                   value={addressOwner}
                
                />
                 <input
                    type="text"
                    placeholder="Address Spender"
                   onChange={(e) =>setAddressSpender(e.target.value)}

                   value={addressSpender}
                
                />
            <button id="publish" onClick={onAllowance} >
                   Check Balance
                </button>

                <p> Tranfer From: </p>
            <input
                    type="text"
                    placeholder="Address Sender"
                   onChange={(e) =>setAddressSender(e.target.value)}

                   value={addressSender}
                
                />
                 <input
                    type="text"
                    placeholder="Address Recipient"
                   onChange={(e) =>setAddressRecipient(e.target.value)}

                   value={addressRecipient}
                
                />

<input
                    type="number"
                    placeholder="Amount:"
                    onChange={(e) =>setAmount(e.target.value)}
                    value={amount}
                />
                <p id="status">{status}</p>
            <button id="publish" onClick={onTransferFromCoin} >
                   TransferFrom
                </button>
        </div >

       
        
    );
};

export default HelloWorld;