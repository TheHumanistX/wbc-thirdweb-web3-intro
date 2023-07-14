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

import React, { useState } from 'react';
import { ethers } from 'ethers';

const Header = () => {
    const [walletData, setWalletData] = useState(null);
    const [network, setNetwork] = useState(null);
    const [balance, setBalance] = useState(null);
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then(network => setNetwork(network));
            const accounts = await provider.send("eth_requestAccounts");

            if (accounts.length === 0) {
                alert("No accounts detected");
                return null;
            }

            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            const userBalance = await getETHBalance(signer);

            const walletData = {
                provider: provider,
                accounts: accounts,
                signer: signer,
                userAddress: userAddress,
                userBalance: userBalance
            };

            setWalletData(walletData);
            setConnected(true);
            setBalance(userBalance); // Set the balance here

            window.ethereum.on('accountsChanged', accounts => {
                const newWalletData = { ...walletData, accounts: accounts };
                setWalletData(newWalletData);
                getETHBalance(newWalletData.signer).then(setBalance);
            });
        }
    }

    const disconnectWallet = () => {
        setWalletData(null);
        setConnected(false);
        setBalance(null); // Reset balance to null when disconnected
    }

    const getETHBalance = async (signer) => {
        const userBalance = ethers.utils.formatEther(await signer.getBalance());
        return userBalance;
    }

    return (
        <header className="header-grid">
            {connected ? (
                <button onClick={disconnectWallet}>Disconnect Wallet</button>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            <div>Connected to {network && network.name}</div>
            <div>Wallet: {walletData?.userAddress || 'No Wallet Connected!'}</div>
            <div>Balance: {balance || 'Loading...'}</div>
        </header>
    );
};

export default Header;