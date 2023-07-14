// import React from 'react'
// import axios from 'axios'
// // Import hooks and components from the '@thirdweb-dev/react' package
// import { useAddress, useBalance, useChain, useConnectionStatus, ConnectWallet } from '@thirdweb-dev/react'

// // Import the ThirdWeb SDK from '@thirdweb-dev/sdk' package
// import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

// const Header = () => {

//     // Use the useAddress hook to get the current connected wallet address
//     const address = useAddress();

//     // Use the useChain hook to get the current connected blockchain
//     const chain = useChain();

//     // Use the useConnectionStatus hook to get the status of the connection to the blockchain
//     const status = useConnectionStatus();

//     // Use the useBalance hook to get the balance of the native token for the connected wallet
//     const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

//     // Function to handle the display of the balance
//     const handleBalance = () => {
//         // If the balance is still loading, return an empty div
//         if (isLoading) return <div></div>
//         // Else return the balance and the symbol of the native token
//         return <div><span className='bold'>Balance: </span>{data.displayValue} {data.symbol}</div>
//     }

//     // Function to handle the display of the connected wallet address
//     const handleConnectWallet = () => {
//         // If there is no connected wallet, return a message indicating so
//         if (!address) return <div>No Wallet Connected!</div>

//         // Else return the address of the connected wallet
//         return <div><span className='bold'>Wallet: </span>{address}</div>
//     }

//     // Function to handle the display of the connected chain
//     const handleChainConnection = () => {
//         // If the status is unknown, show a loading message
//         if (status === "unknown") return <div> Loading... </div>;
//         // If the status is disconnected, show a not connected message
//         if (status === "disconnected") return <div> Not Connected </div>;
//         // If the status is connecting, show a connecting message
//         if (status === "connecting") return <div> Connecting... </div>;

//         // If the chain is supported, return the name of the chain
//         if (chain) {
//             return <p> Connected to {chain.name} </p>;
//         }

//         // If the chain is not supported, show an unsupported network message
//         return <p> Connected to an unsupported network </p>;
//     }


//     return (
//         <header className="header-grid">
//             <div>
//                 {/* Render the ConnectWallet component */}
//                 <ConnectWallet className='wallet-connect' />
//             </div>
//             <div className="header-text">
//                 {/* Call the handleChainConnection function to render the appropriate message */}
//                 {handleChainConnection()}
//             </div>
//             <div className="header-text">
//                 {/* Call the handleConnectWallet function to render the appropriate message */}
//                 {handleConnectWallet()}
//             </div>
//             <div className="header-text">
//                 {/* Call the handleBalance function to render the balance */}
//                 {handleBalance()}
//             </div>
//         </header>
//     )
// }
// 
// export default Header

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Header = () => {
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);
    const [walletData, setWalletData] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            provider.getNetwork().then(network => setNetwork(network));
            window.ethereum.on('accountsChanged', accounts => {
                setAddress(accounts[0]);
                provider.getBalance(accounts[0]).then(balance => {
                    setBalance(ethers.utils.formatEther(balance));
                });
            });
        }
    }, []);

    const getETHBalance = async () => {
        if (walletData) {
            signer = walletData.signer;
        }
        const userBalance = parseFloat(ethers.utils.formatEther(await signer.getBalance()));
        return userBalance;
    }

    const connectWallet = async (provider) => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            provider.getNetwork().then(network => setNetwork(network));
            const accounts = await provider.send("eth_requestAccounts");

            if (accounts.length == 0) {
                alert("No accounts detected");
                return null;
            }
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            const userBalance = await getETHBalance(signer);
            const walletData = {
                ...emptyWalletData,
                provider: provider,
                accounts: accounts,
                signer: signer,
                userAddress: userAddress,
                userBalance: userBalance
            };
            if (walletData !== null) {
                setWalletData(walletData);
                return walletData;
            } else {
                return;
            }
        }
    }

    //   const connectWallet = async () => {
    //     if (window.ethereum) {
    //       try {
    //         await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         const accounts = await provider.listAccounts();
    //         setAddress(accounts[0]);
    //         const balance = await provider.getBalance(accounts[0]);
    //         setBalance(ethers.utils.formatEther(balance));
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     } else {
    //       console.log('Please install MetaMask!');
    //     }
    //   };

    return (
        <header className="header-grid">
            <button onClick={connectWallet}>Connect Wallet</button>
            <div>Connected to {network && network.name}</div>
            <div>Wallet: {address || 'No Wallet Connected!'}</div>
            <div>Balance: {balance || 'Loading...'}</div>
        </header>
    );
};

export default Header;
