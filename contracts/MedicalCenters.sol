// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract MedicalCenters is AccessControl {

    struct MedicalCenter {
        address MCPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
    }

    mapping(address => MedicalCenter) public medicalsCenters;

    address[] public medicaCenterAddressArr;

    function readMedicalCenter(address _medicalCenterAddress) public view returns(MedicalCenter memory){
        return medicalsCenters[_medicalCenterAddress];
    }

    function addMedicalCenter(
        address _MCPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public onlyOwner {
        require(
            medicalsCenters[_MCPublicAddress].isRegistered == false,
            "Medical center is already registered"
        );
        medicalsCenters[_MCPublicAddress] = MedicalCenter({
            MCPublicAddress: _MCPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password,
            isRegistered: true,
            isLogin: false
        });
        medicaCenterAddressArr.push(_MCPublicAddress);
        
    }

    function medicalCenterChangePassword(string memory _oldPassword, string memory _newPassword) external {
        require(medicalsCenters[msg.sender].isLogin == true, "Not logged in");
        require(compareString(medicalsCenters[msg.sender].password, _oldPassword), "Invalid old password");
        require(keccak256(abi.encode(_newPassword)).length > 0, "Password should not be empty");
        require(compareString(medicalsCenters[msg.sender].password, _newPassword), "Invalid new password");

        medicalsCenters[msg.sender].password = _newPassword;
    }

    function  medicalCenterLogin(address _MCPublicAddress, string memory _password) public {
        require(medicalsCenters[_MCPublicAddress].isRegistered == true, "Your not registered yet!");
        // require(medicalsCenters[_MCPublicAddress].isLogin == false, "Your Already login");
        require(compareString(medicalsCenters[_MCPublicAddress].password, _password), "Invalid address or password");

        // MedicalCenter memory medicalCenter = medicalsCenters[_MCPublicAddress];
        // medicalCenter.isLogin = true;
        medicalsCenters[_MCPublicAddress].isLogin = true;
    }

    function medicalCenterLogout(address _MCPublicAddress) public {
        require(medicalsCenters[_MCPublicAddress].isLogin, "You're not logged in");

        medicalsCenters[_MCPublicAddress].isLogin = false;
    }

    function getMedicalCentersArr() public view returns (address[] memory) {
        return medicaCenterAddressArr;
    }

    function getMedicalCenter(
        address _medicalStaffPublicAddress
    )
        public
        view
        returns (
            address MCPublicAddress,
            string memory name,
            string memory phoneNumber
        )
    {
        MedicalCenter memory medicalCenter = medicalsCenters[_medicalStaffPublicAddress];
        MCPublicAddress = medicalCenter.MCPublicAddress;
        name = medicalCenter.name;
        phoneNumber = medicalCenter.phoneNumber;
    }

}
