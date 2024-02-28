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
        bool isLogin;
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
            true,
            false
        );
        donorAddressArr.push(_donorPublicAddress);
    }

    function  donorLogin(address _donorPublicAddress, string memory _password) public {
        require(donors[_donorPublicAddress].isRegistered == true, "Your not registered yet!");
        require(donors[_donorPublicAddress].isLogin == false, "Your Already login");
        require(compareString(donors[_donorPublicAddress].password, _password), "Invalid address or password");
        
        donors[_donorPublicAddress].isLogin = true;
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

    /// @dev this is helper function
    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}
