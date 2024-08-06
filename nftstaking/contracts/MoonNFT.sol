// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MoonNFT is ERC721AQueryable, Ownable {
    using Strings for uint256;

    // VARIABLES
    // -------------------------------------------------------------------
    string public baseURI;
    string public constant baseExtension =".json";

    // Cost of one NFT
    uint256 public cost;
    // max supply amount to be mint.
    uint256 public immutable maxSupply;
    // Max mint count per one transaction.
    uint256 public maxMintAmountPerTx;
    
    // USE uint8 instead of bool to save gas
    // paused = 1 & active = 0
    uint256 public paused = 1;

    // ERRORS
    // -------------------------------------------------------------------
    error MoonNFT__ContractIsPaused();
    error MoonNFT__NftSupplyLimitExceeded();
    error MoonNFT__InvalidMintAmount();
    error MoonNFT__MaxMintAmountExceeded();
    error MoonNFT__InsufficientFunds();
    error MoonNFT__QueryForNonExistentToken();

    // CONSTRUCTOR
    // -------------------------------------------------------------------
    constructor( uint256 _maxSupply, uint256 _cost, uint256 _maxMintAmountPerTx) ERC721A ("Moon Non Funsible Token", "ANFT") {
        cost = _cost;
        maxMintAmountPerTx = _maxMintAmountPerTx;
        maxSupply = _maxSupply;
    }

    // Mint FUNCTIONS
    // -------------------------------------------------------------------
    function mint(uint256 _mintAmount) external payable {
        if (paused == 1) revert MoonNFT__ContractIsPaused();
        if (_mintAmount == 0) revert MoonNFT__InvalidMintAmount();
        else if (_mintAmount > maxMintAmountPerTx) revert MoonNFT__MaxMintAmountExceeded();
        uint256 supply = totalSupply();
        if(supply + _mintAmount > maxSupply) revert MoonNFT__NftSupplyLimitExceeded();

        if(msg.sender != owner()) {
            if (msg.value < cost * _mintAmount)
                revert MoonNFT__InsufficientFunds();
        }

        _safeMint(msg.sender, _mintAmount);
    }

    function setCost(uint256 _newCost) external payable onlyOwner {
        cost = _newCost;
    }

    function setMaxMintAmountPerTx(uint256 _newMintAmount) external payable onlyOwner { 
        maxMintAmountPerTx = _newMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) external payable onlyOwner {
        baseURI = _newBaseURI;
    }

    function pause(uint256 _state) external payable onlyOwner {
        paused = _state;
    }

    function withdraw() external payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success);
    }

    // VIEW FUNCTION
    // -------------------------------------------------------------------
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert MoonNFT__QueryForNonExistentToken();

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
