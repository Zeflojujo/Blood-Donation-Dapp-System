// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalCenter {
    struct MedicalStaff {
        address MSPublicAddress;
        string name;
        string phoneNumber;
        string password;
    }

    mapping(address => MedicalStaff) public medicalStaffs;

    address[] public medicaCenterAddressArr;

    function addMedicalStaff(
        address _MSPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
        medicalStaffs[_MSPublicAddress] = MedicalStaff({
            MSPublicAddress: _MSPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password
        });
    }
}
