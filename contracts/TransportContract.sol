// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransportContract {
    struct Transporter {
        address transporterPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
    }

    mapping(address => Transporter) public transporters;

    address[] public transporterAddressArr;

    function addTransporter(
        address _transporterPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
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
            isLogin: false
        });
        transporterAddressArr.push(_transporterPublicAddress);
    }

    function  transporterLogin(address _transporterPublicAddress, string memory _password) public {
        require(transporters[_transporterPublicAddress].isRegistered == true, "Your not registered yet!");
        require(transporters[_transporterPublicAddress].isLogin == false, "Your Already login");
        require(compareString(transporters[_transporterPublicAddress].password, _password), "Invalid address or password");

        transporters[_transporterPublicAddress].isLogin = true;
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
            string memory phoneNumber
        )
    {
        Transporter memory transporter = transporters[_transporterPublicAddress];
        transporterPublicAddress = transporter.transporterPublicAddress;
        name = transporter.name;
        phoneNumber = transporter.phoneNumber;
    }

    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}
