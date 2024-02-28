// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AccessControlContract {
    address immutable internal owner;

    /// @dev create system account structure
    struct SystemOwner {
        address sysOwner;
        string password /*audit*/;
        bool isLogin;
    }

    mapping(address => SystemOwner) private sysOwnerMap;

    SystemOwner private sysowner;

    constructor() {
        owner = msg.sender;
        sysowner = SystemOwner(owner, "admin", false);
        sysOwnerMap[owner] = sysowner;
    }
}