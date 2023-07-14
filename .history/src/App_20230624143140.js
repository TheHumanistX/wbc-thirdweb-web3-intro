import React from "react";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

import { Header, NFTData } from "./components";
import './App.css';

function App() {
  return (
      <>
        <Header />
        <NFTData />
      </>
  );
}

export default App;
