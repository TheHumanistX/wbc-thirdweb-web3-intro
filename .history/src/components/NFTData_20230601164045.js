// Importing necessary modules and hooks from react and thirdweb-dev library
import React, { useState } from 'react';
import { useContract, useNFTs } from '@thirdweb-dev/react';

// Creating a functional React component to display NFT data
const NFTData = () => {
    // Define the contract address
    const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

    // Define state for current page number, initial page is 0
    const [currentPage, setCurrentPage] = useState(0);
    
    // Define how many NFTs to fetch per page
    const nftsPerPage = 250;

    // Use contract from the given address
    const { contract } = useContract(contractAddress);

    // Use NFTs with the given contract, start and count parameters are used for pagination
    const { data: nfts, isLoading, error } = useNFTs(contract, { start: currentPage * nftsPerPage, count: nftsPerPage });

    // Console log the fetched NFTs for debugging
    console.log(nfts);

    // Function to handle 'Next' button click. It increments the currentPage state and scrolls to the top of the page
    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
    };

    // Function to handle 'Previous' button click. It decrements the currentPage state, but not below 0, and scrolls to the top of the page
    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
        window.scrollTo(0, 0);
    };
    
    return (
        <div>
             {/* Rendering 'Previous' and 'Next' buttons. 'Previous' button is disabled if currentPage is 0 */}
            <div className='button-div'>
            <button onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
            </button>
            <button onClick={handleNext}>
                Next
            </button>
            </div>
             {/* Render a grid of NFTs */}
            <div className="nft-grid">
                 {/* Map over the NFT data to display each NFT's image, name and owner */}
                {nfts && nfts.map((nft) => (
                    <div className='nft-flex' key={nft.metadata.id}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} />
                        <h3>Bored Ape #{nft.metadata.id}</h3>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTData;
