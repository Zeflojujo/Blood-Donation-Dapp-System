// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AccessControl {
    address immutable internal owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted to system owner only");
        _;
    }

    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}