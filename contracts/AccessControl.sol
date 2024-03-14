// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AccessControl {
    address immutable internal owner;
    bool locked;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted to system owner only");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrant call.");
        locked = true;
        _;
        locked = false;
    }

    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}