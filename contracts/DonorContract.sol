// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonorContract {
    struct Donor {
        address donorPublicAddress;
        string name;
        string bloodType;
        string phoneNumber;
        string password;
        uint256 donatedVolume;
        uint256 totalPayment;
        bool isRegistered;
        // uint256[] donationHistory;
    }

    mapping(address => Donor) public donors;

    address[] public donorAddressArr;

    function addDonor(
        address _donorPublicAddress,
        string memory _name,
        string memory _bloodType,
        string memory _contactNumber,
        string memory _password
    ) public {
        require(
            donors[_donorPublicAddress].isRegistered == false,
            "Donor is already registered"
        );
        donors[_donorPublicAddress] = Donor(
            _donorPublicAddress,
            _name,
            _bloodType,
            _contactNumber,
            _password,
            0,
            0,
            true
        );
        donorAddressArr.push(_donorPublicAddress);
    }

    function getDonorsArr() public view returns (address[] memory) {
        return donorAddressArr;
    }

    function getDonor(
        address _donorPublicAddress
    )
        public
        view
        returns (
            address publicAddress,
            string memory name,
            string memory bloodType,
            string memory phoneNumber,
            uint256 donatedVolume,
            uint256 totalPayment
        )
    {
        Donor memory donor = donors[_donorPublicAddress];
        publicAddress = donor.donorPublicAddress;
        name = donor.name;
        bloodType = donor.bloodType;
        phoneNumber = donor.phoneNumber;
        donatedVolume = donor.donatedVolume;
        totalPayment = donor.totalPayment;
    }
}
