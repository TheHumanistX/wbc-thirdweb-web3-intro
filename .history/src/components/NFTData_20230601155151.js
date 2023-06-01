import React, { useState } from 'react';
import { useContract, useNFTs } from '@thirdweb-dev/react';

const NFTData = () => {
    const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    const [currentPage, setCurrentPage] = useState(0); // Initial page is 0
    const nftsPerPage = 250;

    const { contract } = useContract(contractAddress);
    const { data: nfts, isLoading, error } = useNFTs(contract, { start: currentPage * nftsPerPage, count: nftsPerPage });

    console.log(nfts);

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Increase the current page by 1
        window.scrollTo(0, 0); // Scroll back to top
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Decrease the current page by 1 but don't go below 0
        window.scrollTo(0, 0); // Scroll back to top
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
