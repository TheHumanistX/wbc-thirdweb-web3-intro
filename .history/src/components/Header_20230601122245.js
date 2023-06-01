import React from 'react'
import { useAddress, useBalance, useChain, useConnectionStatus, ConnectWallet } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

const Header = () => {

    const address = useAddress();
    const chain = useChain();
    const status = useConnectionStatus();
    
    const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

    const handleBalance = () => {
        if (isLoading) return <div></div>
        return <div>Balance: {data.displayValue} {data.symbol}</div>
    }

    const handleConnectWallet = () => {
        if (!address) return <div>No Wallet Connected!</div>

        return <div>Wallet: {address}</div>
    }

    const handleChainConnection = () => {

        if (status === "unknown") return <div> Loading... </div>;
        if (status === "disconnected") return <div> Not Connected </div>;
        if (status === "connecting") return <div> Connecting... </div>;

        if (chain) {
            return <p> Connected to {chain.name} </p>;
        }

        return <p> Connected to an unsupported network </p>;
    }
    
    return (
        <header className="header-grid">
            <div>
                <ConnectWallet />
            </div>
            <div className="header-text">
                {handleChainConnection()}
            </div>
            <div className="header-text">
                {handleConnectWallet()}
            </div>
            <div className="header-text">
                {handleBalance()}
            </div>
        </header>
    )
}

export default Header
