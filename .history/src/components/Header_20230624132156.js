import React, { useState } from 'react'
import { ethers } from 'ethers' 
import Web3Modal from 'web3modal'
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk'
// Import hooks and components from the '@thirdweb-dev/react' package
import { useAddress, useBalance, useChain, useConnectionStatus, ConnectWallet } from '@thirdweb-dev/react'

// Import the ThirdWeb SDK from '@thirdweb-dev/sdk' package
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: 'Web3Intro'
        }
    }
}

const Header = () => {
    const [Web3Provider, setWeb3Provider] = useState(null)

    const connectWallet = async () => {
        try {
            let web3Modal = new Web3Modal({
                cacheProvider: false,
                providerOptions,
            });
            const web3ModalInstance = await web3Modal.connect();
            const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
            if(web3ModalProvider) {
                setWeb3Provider(web3ModalProvider);
            }
        } catch(error) {
            console.error(error)
        }  
    }

    // Use the useAddress hook to get the current connected wallet address
    const address = useAddress();

    // Use the useChain hook to get the current connected blockchain
    const chain = useChain();

    // Use the useConnectionStatus hook to get the status of the connection to the blockchain
    const status = useConnectionStatus();
    
    // Use the useBalance hook to get the balance of the native token for the connected wallet
    const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

    // Function to handle the display of the balance
    const handleBalance = () => {
        // If the balance is still loading, return an empty div
        if (isLoading) return <div></div>
        // Else return the balance and the symbol of the native token
        return <div><span className='bold'>Balance: </span>{data.displayValue} {data.symbol}</div>
    }

    // Function to handle the display of the connected wallet address
    const handleConnectWallet = () => {
        // If there is no connected wallet, return a message indicating so
        if (!address) return <div>No Wallet Connected!</div>

        // Else return the address of the connected wallet
        return <div><span className='bold'>Wallet: </span>{address}</div>
    }

    // Function to handle the display of the connected chain
    const handleChainConnection = () => {
        // If the status is unknown, show a loading message
        if (status === "unknown") return <div> Loading... </div>;
        // If the status is disconnected, show a not connected message
        if (status === "disconnected") return <div> Not Connected </div>;
        // If the status is connecting, show a connecting message
        if (status === "connecting") return <div> Connecting... </div>;

        // If the chain is supported, return the name of the chain
        if (chain) {
            return <p> Connected to {chain.name} </p>;
        }

        // If the chain is not supported, show an unsupported network message
        return <p> Connected to an unsupported network </p>;
    }
    
    
    return (
        <header className="header-grid">
            <div>
                {/* Render the ConnectWallet component */}
                {/* <ConnectWallet className='wallet-connect' /> */}
                {
                    Web3Provider == null ? (
                        <button onClick={connectWallet}>Connect</button>
                    ) : (
                        <div>
                        <p>Connected!</p>
                        <p>Address: {Web3Provider.provider.selectedAddress}</p>
                        </div>
                    )
                }
            </div>
            <div className="header-text">
                {/* Call the handleChainConnection function to render the appropriate message */}
                {handleChainConnection()}
            </div>
            <div className="header-text">
                {/* Call the handleConnectWallet function to render the appropriate message */}
                {handleConnectWallet()}
            </div>
            <div className="header-text">
                {/* Call the handleBalance function to render the balance */}
                {handleBalance()}
            </div>
        </header>
    )
}


export default Header
