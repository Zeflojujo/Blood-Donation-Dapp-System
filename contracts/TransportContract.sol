// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransportContract {
    struct Transporter {
        address transporterPublicAddress;
        string name;
        string phoneNumber;
        string password;
    }

    mapping(address => Transporter) public transporters;

    address[] public transporterAddressArr;

    function addTransporter(
        address _transporterPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
        transporters[_transporterPublicAddress] = Transporter({
            transporterPublicAddress: _transporterPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password
        });
    }
}
