// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract CollectionPointContract is AccessControl {
    event deletedCollectionPoint(address collectionPointAddress);

    struct CollectionPoint {
        address CPPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
    }

    mapping(address => CollectionPoint) public collectionPoints;

    address[] public collectionPointAddressArr;

    function readCollectionPoint(address _collectionPointAddress) external view returns (CollectionPoint memory) {
        return collectionPoints[_collectionPointAddress];
    }

    function addCollectionPoint(
        address _CPPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public onlyOwner noReentrancy {
        require(
            collectionPoints[_CPPublicAddress].isRegistered == false,
            "Medical center is already registered"
        );
        collectionPoints[_CPPublicAddress] = CollectionPoint({
            CPPublicAddress: _CPPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password,
            isRegistered: true,
            isLogin: false,
            isDeleted: false
        });
        collectionPointAddressArr.push(_CPPublicAddress);
        
    }

    function collectionPointChangePassword(string memory _oldPassword, string memory _newPassword) external {
        require(collectionPoints[msg.sender].isLogin == true, "Not logged in");
        require(compareString(collectionPoints[msg.sender].password, _oldPassword), "Invalid old password");
        require(keccak256(abi.encode(_newPassword)).length > 0, "Password should not be empty");
        require(compareString(collectionPoints[msg.sender].password, _newPassword), "Invalid new password");

        collectionPoints[msg.sender].password = _newPassword;
    }

    function  collectionPointLogin(address _MCPublicAddress, string memory _password) public {
        require(collectionPoints[_MCPublicAddress].isRegistered == true, "Your not registered yet!");
        // require(collectionPoints[_MCPublicAddress].isLogin == false, "Your Already login");
        require(compareString(collectionPoints[_MCPublicAddress].password, _password), "Invalid address or password");

        // CollectionPoint memory collectionPoint = collectionPoints[_MCPublicAddress];
        // collectionPoint.isLogin = true;
        collectionPoints[_MCPublicAddress].isLogin = true;
    }

    function collectionPointLogout(address _MCPublicAddress) public {
        require(collectionPoints[_MCPublicAddress].isLogin, "You're not logged in");

        collectionPoints[_MCPublicAddress].isLogin = false;
    }

    function getCollectionPointsArr() public view returns (address[] memory) {
        return collectionPointAddressArr;
    }

    function getCollectionPoint(
        address _collectionPointPublicAddress
    )
        public
        view
        returns (
            address CPPublicAddress,
            string memory name,
            string memory phoneNumber
        )
    {
        CollectionPoint memory collectionPoint = collectionPoints[_collectionPointPublicAddress];
        CPPublicAddress = collectionPoint.CPPublicAddress;
        name = collectionPoint.name;
        phoneNumber = collectionPoint.phoneNumber;
    }

    function deleteCollectionPoint(address collectionPointAddress_) external {
        require(!collectionPoints[collectionPointAddress_].isDeleted, "This data does not exist");
        CollectionPoint storage colletionPoint = collectionPoints[collectionPointAddress_];
        colletionPoint.isDeleted = true;
        collectionPoints[collectionPointAddress_] = colletionPoint;
        emit deletedCollectionPoint(collectionPointAddress_);
    }

}
