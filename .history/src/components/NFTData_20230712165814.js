// // Importing necessary modules and hooks from react and thirdweb-dev library
// import React, { useState } from 'react';
// import { useContract, useNFTs } from '@thirdweb-dev/react';

// // Creating a functional React component to display NFT data
// const NFTData = () => {
//     // Define the contract address
//     const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

//     // Define state for current page number, initial page is 0
//     const [currentPage, setCurrentPage] = useState(0);
    
//     // Define how many NFTs to fetch per page
//     const nftsPerPage = 250;

//     // Use contract from the given address
//     const { contract } = useContract(contractAddress);

//     // Use NFTs with the given contract, start and count parameters are used for pagination
//     // `data` set to variable name `nfts` for convenience and clarity
//     const { data: nfts, isLoading, error } = useNFTs(contract, { start: currentPage * nftsPerPage, count: nftsPerPage });

//     // Console log the fetched NFTs for debugging
//     console.log(nfts);

//     // Function to handle 'Next' button click. It increments the currentPage state and scrolls to the top of the page
//     const handleNext = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//         window.scrollTo(0, 0);
//     };

//     // Function to handle 'Previous' button click. It decrements the currentPage state, but not below 0, and scrolls to the top of the page
//     const handlePrevious = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//         window.scrollTo(0, 0);
//     };
    
//     return (
//         <div>
//              {/* Rendering 'Previous' and 'Next' buttons. 'Previous' button is disabled if currentPage is 0 */}
//             <div className='button-div'>
//             <button onClick={handlePrevious} disabled={currentPage === 0}>
//                 Previous
//             </button>
//             <button onClick={handleNext}>
//                 Next
//             </button>
//             </div>
//              {/* Render a grid of NFTs */}
//             <div className="nft-grid">
//                  {/* Map over the NFT data to display each NFT's image, name and owner */}
//                 {nfts && nfts.map((nft) => (
//                     <div className='nft-flex' key={nft.metadata.id}>
//                         <img src={nft.metadata.image} alt={nft.metadata.name} />
//                         <h3>Bored Ape #{nft.metadata.id}</h3>
//                         <p>Owner: {nft.owner}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NFTData;

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ABI } from '../ABI/ABI.json'; 

const NFTData = () => {
  const [nfts, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const nftsPerPage = 250;
  const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
  
  useEffect(() => {
    const fetchNFTs = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        let nftsData = [];

        try {
          const totalSupply = await contract.totalSupply();
          setTotalSupply(totalSupply);
          for (let i = currentPage * nftsPerPage; i < (currentPage + 1) * nftsPerPage && i < totalSupply; i++) {
            const tokenURI = await contract.tokenURI(i);
            const owner = await contract.ownerOf(i);
            // Fetch metadata from tokenURI...
            // nftsData.push({ ...metadata, owner });
          }
          setNfts(nftsData);
        } catch (error) {
          console.error("Error fetching NFTs: ", error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };
    
    fetchNFTs();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < Math.floor(totalSupply / nftsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <div className='button-div'>
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <div className='nft-flex' key={index}>
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>Owner: {nft.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTData;
