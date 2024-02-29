// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BloodDonationBlockchainSystem {
    enum TransactionStatus { Pending, Completed }
    enum TransportationStatus { InTransit, Delivered }
    enum BloodSupplyStatus { Available, Requested }

    /// @dev create system account structure
    struct SystemOwner {
        address sysOwner;
        string password /*audit*/;
        bool isLogin;
    }

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

    struct Transporter {
        address transporterPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
    }

    struct MedicalCenter {
        address MCPublicAddress;
        string name;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
    }

    struct DonationTransaction {
        uint256 transactionID;
        address donor;
        address recipient;
        address medicalStaff;
        address transporter;
        string bloodType;
        uint256 donationDate;
        TransactionStatus status;
        string medicalCenter;
        uint256 donatedVolume;
        string bloodTestResult;
    }

    struct MedicalRecord {
        uint256 recordID;
        address donor;
        address medicalStaff;
        uint256 bloodPressure;
        uint256 hemoglobinLevel;
        string bloodTestResults;
        // uint256[] donationHistory;
    }

    struct TransportationRecord {
        uint256 recordID;
        address transporter;
        address donor;
        address recipient;
        uint256 pickupDateTime;
        uint256 deliveryDateTime;
        TransportationStatus status;
    }

    struct BloodSupply {
        string bloodType;
        uint256 volume;
        BloodSupplyStatus status;
    }

    address public owner;
    mapping(address => SystemOwner) private sysOwnerMap;
    
    mapping(address => Donor) public donors;
    mapping(address => Transporter) public transporters;
    mapping(address => MedicalCenter) public medicalsCenters;
    mapping(address => mapping(uint256 => MedicalRecord)) public medicalRecords;
    // mapping(uint256 => DonationTransaction) public donationTransactions;
    mapping(address => mapping(uint256 => DonationTransaction)) public donationTransactions;

    // mapping(uint256 => MedicalRecord) public medicalRecords;
    mapping(uint256 => TransportationRecord) public transportationRecords;
    mapping(string => BloodSupply) public bloodSupplies;

    address[] public donorAddressArr;
    address[] public transporterAddressArr;
    address[] public medicaCenterAddressArr;
    uint256[] public donationTransactionsArr;
    uint256[] public medicalRecordsArr;

    uint256 public transactionCounter;
    uint256 public recordCounter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted to system owner only");
        _;
    }

    // modifier onlyMedicalStaff() {
    //     require(
    //         medicalsCenters[msg.sender].MCPublicAddress == msg.sender,
    //         "Only medical staff can perform this action"
    //     );
    //     _;
    // }

    // modifier onlyTransporter() {
    //     require(
    //         transporters[msg.sender].transporterPublicAddress == msg.sender,
    //         "Only transporters can perform this action"
    //     );
    //     _;
    // }

    SystemOwner private sysowner;

    constructor() {
        owner = msg.sender;
        sysowner = SystemOwner(owner, "admin", false);
        sysOwnerMap[owner] = sysowner;
    }

    // function checkSystemOwnerLogin(address _SYSPublicAddress, string memory _password) public view returns (bool) {
    //     // require(!medicalsCenters[_MCPublicAddress].isLogin, "You're already logged in");
    //     require(compareString(sysOwnerMap[_SYSPublicAddress].password, _password), "Invalid address or password");

    //     return true;
    // }

    // function systemOwnerLogin(address _MCPublicAddress, string memory _password) public {
    //     require(checkSystemOwnerLogin(_MCPublicAddress, _password), "Invalid login credentials");

    //     sysOwnerMap[_MCPublicAddress].isLogin = true;
    // }

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

    // function  donorLogin(address _donorPublicAddress, string memory _password) public {
    //     require(donors[_donorPublicAddress].isRegistered == true, "Your not registered yet!");
    //     require(donors[_donorPublicAddress].isLogin == false, "Your Already login");
    //     require(compareString(donors[_donorPublicAddress].password, _password), "Invalid address or password");
        
    //     donors[_donorPublicAddress].isLogin = true;
    // }

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
            uint256 totalPayment,
            bool isRegistered
        )
    {
        Donor memory donor = donors[_donorPublicAddress];
        publicAddress = donor.donorPublicAddress;
        name = donor.name;
        bloodType = donor.bloodType;
        phoneNumber = donor.phoneNumber;
        donatedVolume = donor.donatedVolume;
        totalPayment = donor.totalPayment;
        isRegistered = donor.isRegistered;
    }

    function addTransporter(
        address _transporterPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public onlyOwner() {
        // onlyOwner
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

    // function  transporterLogin(address _transporterPublicAddress, string memory _password) public {
    //     require(transporters[_transporterPublicAddress].isRegistered == true, "Your not registered yet!");
    //     require(transporters[_transporterPublicAddress].isLogin == false, "Your Already login");
    //     require(compareString(transporters[_transporterPublicAddress].password, _password), "Invalid address or password");

    //     transporters[_transporterPublicAddress].isLogin = true;
    // }

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

    function addMedicalCenter(
        address _MCPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
        // onlyOwner
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

    // function donorChangePassword(string memory _oldPassword, string memory _newPassword) external {
    //     require(compareString(donors[msg.sender].password, _oldPassword), "Invalid old password");
    //     require(keccak256(abi.encode(_newPassword)).length > 0, "Password should not be empty");
    //     require(compareString(donors[msg.sender].password, _newPassword), "Invalid new password");
    //     require(donors[msg.sender].isLogin == true, "Not logged in");

    //     donors[msg.sender].password = _newPassword;
    //     // emit PasswordChanged(msg.sender);
    // }

    // ---------------- Start Donation initialization ---------------------

    function donateBloodToMedicalCenter(
        address _medicalCenterPublicAddress,
        address _donorPublicAddress,
        uint256 _volume
    ) public {
        require(
            donors[_donorPublicAddress].isRegistered == true,
            "Please register donor first"
        );

        uint256 transactionID = block.timestamp;
        donationTransactions[_medicalCenterPublicAddress][transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: _donorPublicAddress,
            recipient: address(0),
            medicalStaff: msg.sender,
            transporter: address(0),
            bloodType: donors[_donorPublicAddress].bloodType,
            donationDate: block.timestamp,
            status: TransactionStatus.Pending,
            medicalCenter: "",
            donatedVolume: _volume,
            bloodTestResult: ""
        });
        donors[_donorPublicAddress].donatedVolume += _volume;

        // donors[msg.sender].bloodType = string("Other");
        donationTransactionsArr.push(transactionID);

        // Increment the transaction count
        transactionCounter++;
    }

    function getDonationTransactionArr()
        public
        view
        returns (uint256[] memory)
    {
        return donationTransactionsArr;
    }

    function getDonationTransaction(
        address _medicalCenterPublicAddress,
        uint256 _transactionID
    )
        public
        view
        returns (
            uint256 transactionID,
            address donorPublicAddress,
            address recipientPublicAddress,
            address transporterPublicAddress,
            string memory bloodType,
            uint256 donationDate,
            TransactionStatus status,
            string memory medicalCenter,
            uint256 donatedVolume,
            string memory bloodTestResult
        )
    {
        DonationTransaction memory donationTransaction = donationTransactions[_medicalCenterPublicAddress][
            _transactionID
        ];
        transactionID = donationTransaction.transactionID;
        donorPublicAddress = donationTransaction.donor;
        recipientPublicAddress = donationTransaction.recipient;
        transporterPublicAddress = donationTransaction.transporter;
        bloodType = donationTransaction.bloodType;
        donationDate = donationTransaction.donationDate;
        status = donationTransaction.status;
        medicalCenter = donationTransaction.medicalCenter;
        donatedVolume = donationTransaction.donatedVolume;
        bloodTestResult = donationTransaction.bloodTestResult;
    }

    // ---------------- End Donation initialization ---------------------

    // ---------------- Start Complete Donation  ------------------------

    // function completeDonationToMedicalCenter(
    //     uint256 _transactionID,
    //     string memory _medicalCenter,
    //     uint256 _bloodPressure,
    //     uint256 _hemoglobinLevel,
    //     string memory _bloodTestResults
    // ) public {
    //     require(
    //         donationTransactions[_transactionID].status ==
    //             TransactionStatus.Pending,
    //         "Invalid transaction status"
    //     );
    //     require(
    //         donationTransactions[_transactionID].donor != address(0),
    //         "Invalid donor address"
    //     );

    //     donationTransactions[_transactionID].medicalStaff = msg.sender;
    //     donationTransactions[_transactionID].medicalCenter = _medicalCenter;
    //     donationTransactions[_transactionID].status = TransactionStatus.Completed;
    //     donationTransactions[_transactionID].bloodTestResult = _bloodTestResults;

    //     uint256 recordID = block.timestamp;
    //     medicalRecords[recordID] = MedicalRecord({
    //         recordID: recordID,
    //         donor: donationTransactions[_transactionID].donor,
    //         medicalStaff: msg.sender,
    //         bloodPressure: _bloodPressure,
    //         hemoglobinLevel: _hemoglobinLevel,
    //         bloodTestResults: _bloodTestResults
    //         // donationHistory: new uint256[](0)
    //     });
    //     medicalRecordsArr.push(recordID);

    //     // donors[donationTransactions[_transactionID].donor].donationHistory.push(
    //     //     _transactionID
    //     // );

    //     // uint256 payment = calculatePayment(
    //     //     donors[donationTransactions[_transactionID].donor].donatedVolume
    //     // );
    //     // uint256 payment = calculatePayment(_transactionID);
    //     // donors[donationTransactions[_transactionID].donor]
    //     //     .totalPayment += payment;
    //     // payable(msg.sender).transfer(payment);
    // }

    function completeDonationToMedicalCenter(
        uint256 _transactionID,
        string memory _medicalCenter,
        uint256 _bloodPressure,
        uint256 _hemoglobinLevel,
        string memory _bloodTestResults
    ) public {
        require(
            donationTransactions[msg.sender][_transactionID].status ==
                TransactionStatus.Pending,
            "Invalid transaction status"
        );
        require(
            donationTransactions[msg.sender][_transactionID].donor != address(0),
            "Invalid donor address"
        );

        donationTransactions[msg.sender][_transactionID].medicalStaff = msg.sender;
        donationTransactions[msg.sender][_transactionID].medicalCenter = _medicalCenter;
        donationTransactions[msg.sender][_transactionID].status = TransactionStatus.Completed;
        donationTransactions[msg.sender][_transactionID].bloodTestResult = _bloodTestResults;

        uint256 recordID = block.timestamp;
        medicalRecords[msg.sender][recordID] = MedicalRecord({
            recordID: recordID,
            donor: donationTransactions[msg.sender][_transactionID].donor,
            medicalStaff: msg.sender,
            bloodPressure: _bloodPressure,
            hemoglobinLevel: _hemoglobinLevel,
            bloodTestResults: _bloodTestResults
            // donationHistory: new uint256[](0)
        });
        medicalRecordsArr.push(recordID);

        // donors[donationTransactions[_transactionID].donor].donationHistory.push(
        //     _transactionID
        // );

        // uint256 payment = calculatePayment(
        //     donors[donationTransactions[_transactionID].donor].donatedVolume
        // );
        // uint256 payment = calculatePayment(_transactionID);
        // donors[donationTransactions[_transactionID].donor]
        //     .totalPayment += payment;
        // payable(msg.sender).transfer(payment);
    }

    function getMedicalRecordsArr()
        public
        view
        returns (uint256[] memory)
    {
        return medicalRecordsArr;
    }

    function getMedicalRecord(
        address _medicalCenterAddress,
        uint256 _medicalRecordID
    )
        public
        view
        returns (
            uint256 medicalRecordID,
            address donorAddress,
            address medicalStaff,
            uint256 bloodPressure,
            uint256 hemoglobinLevel,
            string memory bloodTestResult
        )
    {
        MedicalRecord memory medicalRecord = medicalRecords[_medicalCenterAddress][
            _medicalRecordID
        ];
        medicalRecordID = medicalRecord.recordID;
        donorAddress = medicalRecord.donor;
        medicalStaff = medicalRecord.medicalStaff;
        bloodPressure = medicalRecord.bloodPressure;
        hemoglobinLevel = medicalRecord.hemoglobinLevel;
        bloodTestResult = medicalRecord.bloodTestResults;
    }

    // ---------------- End Complete Donation  ------------------------

    function initiateTransportation(
        address _medicalCenterPublicAddress,
        uint256 _transactionID,
        address _recipient,
        string memory _medicalCenter
    ) public {
        require(
            donationTransactions[_medicalCenterPublicAddress][_transactionID].status ==
                TransactionStatus.Completed,
            "Medical center process not completed"
        );

        uint256 transactionID = block.timestamp;
        donationTransactions[_medicalCenterPublicAddress][transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: donationTransactions[_medicalCenterPublicAddress][_transactionID].donor,
            recipient: _recipient,
            medicalStaff: msg.sender,
            transporter: msg.sender,
            bloodType: donationTransactions[_medicalCenterPublicAddress][_transactionID].bloodType,
            donationDate: donationTransactions[_medicalCenterPublicAddress][_transactionID].donationDate,
            status: donationTransactions[_medicalCenterPublicAddress][_transactionID].status,
            medicalCenter: _medicalCenter,
            donatedVolume: donors[donationTransactions[_medicalCenterPublicAddress][_transactionID].donor]
                .donatedVolume,
            bloodTestResult: donationTransactions[_medicalCenterPublicAddress][_transactionID].bloodTestResult
        });
    }

    function completeTransportation(
        address _medicalCenterPublicAddress,
        uint256 _recordID,
        uint256 _transactionID
    ) public {
        // onlyTransporter
        require(
            transportationRecords[_recordID].status ==
                TransportationStatus.InTransit,
            "Transportation already completed or not initiated"
        );
        transportationRecords[_recordID].deliveryDateTime = block.timestamp;
        transportationRecords[_recordID].status = TransportationStatus
            .Delivered;
        donationTransactions[_medicalCenterPublicAddress][_transactionID].transporter = msg.sender;
    }

    // function calculatePayment(
    //     uint256 _transactionID
    // ) internal view returns (uint256) {
    //     require(
    //         donationTransactions[_transactionID].status ==
    //             TransactionStatus.Completed,
    //         "Transaction not completed"
    //     );
    //     // Assuming a fixed payment rate for simplicity
    //     uint256 _donatedVolume = donationTransactions[_transactionID]
    //         .donatedVolume;
    //     uint256 paymentRate = 1 gwei; // 1gwei/ml
    //     return _donatedVolume * paymentRate;
    // }

    // function addBloodSupply(string memory _bloodType, uint256 _volume) public {
    //     // onlyMedicalStaff
    //     require(_volume > 0, "Volume must be greater than zero");
    //     require(
    //         bloodSupplies[_bloodType].status != BloodSupplyStatus.Requested,
    //         "Blood type already requested"
    //     );

    //     if (bloodSupplies[_bloodType].status == BloodSupplyStatus.Available) {
    //         bloodSupplies[_bloodType].volume += _volume;
    //     } else {
    //         bloodSupplies[_bloodType] = BloodSupply({
    //             bloodType: _bloodType,
    //             volume: _volume,
    //             status: BloodSupplyStatus.Available
    //         });
    //     }
    // }

    // function requestBloodType(
    //     string memory _bloodType,
    //     uint256 _volume
    // ) public {
    //     // onlyMedicalStaff
    //     require(
    //         bloodSupplies[_bloodType].status == BloodSupplyStatus.Available,
    //         "Blood type not available"
    //     );
    //     require(
    //         bloodSupplies[_bloodType].volume >= _volume,
    //         "Insufficient blood volume"
    //     );

        // You can add more logic here to handle the request
        // For example, update the blood supply status or create a new transaction record
    // }

    function compareString(string memory _a, string memory _b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

}
