// require('dotenv').config();

import { formatNumberToBalance } from '.';


// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);
// import {ether} from 'ethers'
const {Web3} = require('web3');

// Set the Binance Smart Chain RPC URL
// const rpcURL = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
const rpcURL = 'https://rpc.ankr.com/fantom_testnet';


// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

// Create a new Web3 instance
const web3 = new Web3(rpcURL);
const contractABI = require("../contact-abi.json");
const contractAddress = "0x9731AD0AfD469C3cE96e439DF23fB7682c2B3286";

export const quickNodeToken = new web3.eth.Contract(
    contractABI,
    contractAddress
);


// export const disconnectWalletConnect = async () => {

//     localStorage.removeItem('0x3b635Cb3D05D90d335b9F93ABB739322c403ed49');
// };

//lay message hien tai
// export const loadCurrentMessage = async () => {
//     const message = await helloWorldContract.methods.message().call();
//     return message;
// };
export const loadTotalSupply = async () =>{
    const totalSupply = await quickNodeToken.methods.totalSupply().call();
    return totalSupply;
  }

//login vi metaMask
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            const obj = {
                status: "👆🏽 Write a message in the text-field above.",
                address: addressArray[0],
                check: true,
            };
            return obj;

        } catch (error) {
            return {
                address: "",
                status: "😥 " + error.message,
                check: false,
            };
        }
    }
    else {
        return {
            address: "",
            status: "false",
            check: false
        }
    }

};









//lay thong tin vi dang dang nhap
export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts"
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                }
            }
            else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (error) {
            return {
                address: "",
                status: "😥 " + error.message,
            };
        }
    }
    else {
        return {
            address: "",
            status: "",
        }
    }

};

export const checkBalanceOf = async (address) =>{
    if (!window.ethereum ) {
        return {
            status:
                "💡 Connect your Metamask wallet to update the message on the blockchain.",
            
        }
    }

    try {
        const balanceOf = await quickNodeToken.methods.balanceOf(address).call();

        // return balanceOf;
        
       return {
        balanceOf: balanceOf,
            check: true,
            status:'Check Balance Successful'
        };
    } catch (error) {
        return {
            check: false,
            status: "gui khong thanh cong"
        };
    }

  
   

}



export const transferCoin = async (recipient, amount , address) =>{
    if (!window.ethereum ) {
        return {
            status:
                "💡 Connect your Metamask wallet to update the message on the blockchain.",
        }
    }
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: quickNodeToken.methods.
        transfer(recipient, web3.utils.toBigInt(formatNumberToBalance(amount)) ).encodeABI(),
        gas: "100000",
    }
    try {

           const txHash =     await window.ethereum.request({
                                method: "eth_sendTransaction",
                                params: [transactionParameters],
                               
                            })
    
        
        return {
            status: "gui thanh cong" + txHash
        };
    } catch (error) {
        return {
            status: "gui khong thanh cong"
        };
    }
    
    
    
}


export const transferFromCoin = async (sender, recipient , amount, address) =>{
    if (!window.ethereum ) {
        return {
            status:
                "💡 Connect your Metamask wallet to update the message on the blockchain.",
        }
    }

    
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: quickNodeToken.methods.transferFrom(sender, recipient, web3.utils.toBigInt(formatNumberToBalance(amount))).encodeABI(),
        gas: "100000",
    }
    try {

        //    const txHash =     await quickNodeToken.methods.transferFrom(sender, recipient, web3.utils.toBigInt(formatNumberToBalance(amount))).encodeABI();
           
           
        const txHash =    await window.ethereum.request({
                                method: "eth_sendTransaction",
                                params: [transactionParameters],
                               
                            })
    
        
        return {
            status: "rut tien thanh cong " + txHash
        };
    } catch (error) {
        return {
            status: "rut tien khong thanh cong"
        };
    }
    
    
    
}

export const approve = async (spender, amount , address) =>{
    if (!window.ethereum ) {
        return {
            status:
                "💡 Connect your Metamask wallet to update the message on the blockchain.",
        }
    }
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: quickNodeToken.methods.
        approve(spender, web3.utils.toBigInt(formatNumberToBalance(amount)) ).encodeABI(),
        gas: "100000",
    }
    try {

           const txHash =     await window.ethereum.request({
                                method: "eth_sendTransaction",
                                params: [transactionParameters],
                               
                            })
    
        
        return {
            status:  "approve thanh cong" + txHash
        };
    } catch (error) {
        return {
            status: "gui approve khong thanh cong"
        };
    }
    
    
    
}


export const allowance = async (owner, spender) =>{
    if (!window.ethereum ) {
        return {
            status:
                "💡 Connect your Metamask wallet to update the message on the blockchain.",
        }
    }

    const allowanceOf = await quickNodeToken.methods.allowance(owner, spender).call();

    return allowanceOf;
   

}

// export const updateMessage = async (address, message) => {
//     if (!window.ethereum || address === null) {
//         return {
//             status:
//                 "💡 Connect your Metamask wallet to update the message on the blockchain.",
//         }
//     }
//     if (message.trim() === "") {
//         return {
//             status: "❌ Your message cannot be an empty string.",
//         };
//     }

//     const transactionParameters = {
//         to: contractAddress,
//         from: address,
//         data: helloWorldContract.methods.update(message).encodeABI(),
//     }

//     try {
//         const txHash = await window.ethereum.request({
//             method: "eth_sendTransaction",
//             params: [transactionParameters]
//         })
//         return {
//             status: "gui thanh cong"
//         };
//     } catch (error) {
//         return {
//             status: "😥 " + error.message,
//         };
//     }
// };



