# Brief Introduction to Web3 Development Using ThirdWeb

### Header

* Connect Wallet Button
  * Using ThirdWeb ConnectWallet component `<ConnectWallet />`
  * Small amount of styling to background color and text color in index.class
* Currently connected chain is displayed using ThirdWeb `useChain` hook
  * Current status of chain connection is displayed here using ThirdWeb `useConnectionStatus` hook
* Address of currently connected wallet displayed using ThirdWeb `useAddress` hook
* Balance of native token of current chain in currently connected wallet displayed using ThirdWeb `useBalance` hook and `NATIVE_TOKEN_ADDRESS` from ThirdWeb SDK

### NFTData

* Used ThirdWeb `useContract` and `useNFTs` hooks to pull data from Third Web Dashboard: https://thirdweb.com/ethereum/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/code
  * Using BAYC collection for demonstration purposes
  * Have it displaying 250 NFTs per page
  * Have simple pagination setup to move through the collection

