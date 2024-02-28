// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalCenters {
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

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Restricted to system owner only");
    //     _;
    // }

    function addMedicalCenter(
        address _MCPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
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

    // function  medicalCenterLogin(address _MCPublicAddress, string memory _password) public {
    //     require(medicalsCenters[_MCPublicAddress].isRegistered == true, "Your not registered yet!");
    //     require(medicalsCenters[_MCPublicAddress].isLogin == false, "Your Already login");
    //     require(compareString(medicalsCenters[_MCPublicAddress].password, _password), "Invalid address or password");

    //     MedicalCenter memory medicalCenter = medicalsCenters[_MCPublicAddress];
    //     medicalCenter.isLogin = true;
    // }

    function checkMedicalCenterLogin(address _MCPublicAddress, string memory _password) public view returns (bool) {
        require(medicalsCenters[_MCPublicAddress].isRegistered == true, "You're not registered yet!");
        // require(!medicalsCenters[_MCPublicAddress].isLogin, "You're already logged in");
        require(compareString(medicalsCenters[_MCPublicAddress].password, _password), "Invalid address or password");

        return true;
    }

    function medicalCenterLogin(address _MCPublicAddress, string memory _password) public {
        require(checkMedicalCenterLogin(_MCPublicAddress, _password), "Invalid login credentials");

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

    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}
