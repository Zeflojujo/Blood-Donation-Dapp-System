// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";
import"./CollectionPointContract.sol";

contract DonorContract is AccessControl{

    event deletedDonor(address indexed donorAddress);

    struct Donor {
        address donorPublicAddress;
        string name;
        uint256 age;
        string gender;
        string bloodType;
        string phoneNumber;
        string password;
        uint256 donatedVolume;
        uint256 totalPayment;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
        uint256[] donorTransactionHistory;
    }

    mapping(address => Donor) private donors;

    address[] private donorAddressArr;

    CollectionPointContract public collectionPoint;

    constructor(address collectionPointAddress_) {
        collectionPoint = CollectionPointContract(collectionPointAddress_);
    }

    function updateVolume(address _donodAddress, uint256 _newVolume) external {
        Donor storage donor = donors[_donodAddress];
        donor.donatedVolume += _newVolume;
        donors[_donodAddress] = donor;
    }

    function updateDonorBloodType(address _donorAddress, string memory _bloodType) external {
        Donor storage donor = donors[_donorAddress];
        donor.bloodType = _bloodType;
        donors[_donorAddress] = donor;
    }
    function updateDonationHistory(address _donorAddress, uint256 _transactionID) external {
        Donor storage donor = donors[_donorAddress];
        donor.donorTransactionHistory.push(_transactionID);
        donors[_donorAddress] = donor;
    }

    function readDonors(address _donorAddress) external view returns (Donor memory) {
        return donors[_donorAddress];
    }
    
    function addDonor(
        address _donorPublicAddress,
        string memory _name,
        uint256 _age,
        string memory _gender,
        string memory _contactNumber,
        string memory _password
    ) external noReentrancy {
        require(
            donors[_donorPublicAddress].isRegistered == false || donors[_donorPublicAddress].isDeleted,
            "Donor is already registered"
        );
        donors[_donorPublicAddress] = Donor({
            donorPublicAddress: _donorPublicAddress,
            name: _name,
            age: _age,
            gender: _gender,
            bloodType: "--",
            phoneNumber: _contactNumber,
            password: _password,
            donatedVolume: 0,
            totalPayment: 0,
            isRegistered: true,
            isLogin: false,
            isDeleted: false,
            donorTransactionHistory: new uint256[](0)
    });

        donorAddressArr.push(_donorPublicAddress);
    }

    function donorChangePassword(string memory _oldPassword, string memory _newPassword) external {
        require(donors[msg.sender].isLogin == true, "Not logged in");
        require(compareString(donors[msg.sender].password, _oldPassword), "Invalid old password");
        require(keccak256(abi.encode(_newPassword)).length > 0, "Password should not be empty");
        require(compareString(donors[msg.sender].password, _newPassword), "Invalid new password");

        donors[msg.sender].password = _newPassword;
    }


    function  donorLogin(address _donorPublicAddress, string memory _password) external {
        require(donors[_donorPublicAddress].isRegistered == true, "Your not registered yet!");
        // require(donors[_donorPublicAddress].isLogin == false, "Your Already login");
        require(compareString(donors[_donorPublicAddress].password, _password), "Invalid address or password");
        
        donors[_donorPublicAddress].isLogin = true;
    }

    function donorLogout(address _DNPublicAddress) external {
        require(donors[_DNPublicAddress].isLogin, "You're not logged in");

        donors[_DNPublicAddress].isLogin = false;
    }

    function getDonorsArr() external view returns (address[] memory) {
        return donorAddressArr;
    }

    function getDonor(
        address _donorPublicAddress
    )
        external
        view
        returns (
            address publicAddress,
            string memory name,
            uint256 age,
            string memory bloodType,
            string memory gender,
            string memory phoneNumber,
            uint256 donatedVolume,
            uint256 totalPayment,
            bool isRegistered,
            bool isLogin,
            bool isDeleted,
            uint256[] memory donorTransactionHistory
        )
    {
        Donor memory donor = donors[_donorPublicAddress];
        publicAddress = donor.donorPublicAddress;
        name = donor.name;
        age = donor.age; 
        bloodType = donor.bloodType;
        gender = donor.gender;
        phoneNumber = donor.phoneNumber;
        donatedVolume = donor.donatedVolume;
        totalPayment = donor.totalPayment;
        isRegistered = donor.isRegistered;
        isLogin = donor.isLogin;
        isDeleted = donor.isDeleted;
        donorTransactionHistory = donor.donorTransactionHistory;
    }

    function deleteDonor(address donorAddress_) external {
        require(!donors[donorAddress_].isDeleted, "This data does not exist");
        Donor storage donor = donors[donorAddress_];
        donor.isDeleted = true;
        donors[donorAddress_] = donor;
        emit deletedDonor(donorAddress_);
    }
}
