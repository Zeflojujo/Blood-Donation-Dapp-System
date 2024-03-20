// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract TransportContract is AccessControl {

    struct Transporter {
        address transporterPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
        uint256[] transporterTransactionHistory;
    }

    mapping(address => Transporter) public transporters;

    address[] public transporterAddressArr;

    function updateTransportationHistory(address _transporterAddress, uint256 _transactionID) external {
        Transporter storage transporter = transporters[_transporterAddress];
        transporter.transporterTransactionHistory.push(_transactionID);
        transporters[_transporterAddress] = transporter;
    }

    function addTransporter(
        address _transporterPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public onlyOwner noReentrancy {
        require(
            transporters[_transporterPublicAddress].isRegistered == false,
            "Transporter already registered"
        );
        transporters[_transporterPublicAddress] = Transporter({
            transporterPublicAddress: _transporterPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password,
            isRegistered: true,
            isLogin: false,
            transporterTransactionHistory: new uint256[](0)
        });
        transporterAddressArr.push(_transporterPublicAddress);
    }

    function transporterChangePassword(string memory _oldPassword, string memory _newPassword) external {
        require(transporters[msg.sender].isLogin == true, "Not logged in");
        require(compareString(transporters[msg.sender].password, _oldPassword), "Invalid old password");
        require(keccak256(abi.encode(_newPassword)).length > 0, "Password should not be empty");
        require(compareString(transporters[msg.sender].password, _newPassword), "Invalid new password");

        transporters[msg.sender].password = _newPassword;
    }

    function  transporterLogin(address _transporterPublicAddress, string memory _password) public {
        require(transporters[_transporterPublicAddress].isRegistered == true, "Your not registered yet!");
        // require(transporters[_transporterPublicAddress].isLogin == false, "Your Already login");
        require(compareString(transporters[_transporterPublicAddress].password, _password), "Invalid address or password");

        transporters[_transporterPublicAddress].isLogin = true;
    }

    function transporterLogout(address _transPublicAddress) public {
        require(transporters[_transPublicAddress].isLogin, "You're not logged in");

        transporters[_transPublicAddress].isLogin = false;
    }

    function getTransportersArr() public view returns (address[] memory) {
        return transporterAddressArr;
    }

    function getTransporter(
        address _transporterPublicAddress
    )
        public
        view
        returns (
            address transporterPublicAddress,
            string memory name,
            string memory phoneNumber,
            uint256[] memory transporterTransactionHistory
        )
    {
        Transporter memory transporter = transporters[_transporterPublicAddress];
        transporterPublicAddress = transporter.transporterPublicAddress;
        name = transporter.name;
        phoneNumber = transporter.phoneNumber;
        transporterTransactionHistory = transporter.transporterTransactionHistory;
    }
}
