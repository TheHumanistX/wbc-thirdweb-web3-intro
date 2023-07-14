import React from "react";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

import { Header, NFTData } from "./components";
import './App.css';

const chains = [arbitrum, mainnet, polygon]
const projectId = 'f76f44e2965fd41957b329c48420473e'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  return (
    <>
    <WagmiConfig config={wagmiConfig}>
        <Header />
        <NFTData />
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
    
  );
}

export default App;
