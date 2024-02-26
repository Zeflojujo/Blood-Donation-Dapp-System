// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BloodDonationBlockchainSystem {
    enum BloodType {
        A,
        B,
        AB,
        O,
        Other
    }
    enum TransactionStatus {
        Pending,
        Completed
    }
    enum TransportationStatus {
        InTransit,
        Delivered
    }
    enum BloodSupplyStatus {
        Available,
        Requested
    }

    struct Donor {
        address donorPublicAddress;
        string name;
        BloodType bloodType;
        string phoneNumber;
        string password;
        uint256 donatedVolume;
        uint256 totalPayment;
        bool isRegistered;
        // uint256[] donationHistory;
    }

    struct Transporter {
        address transporterPublicAddress;
        string name;
        string phoneNumber;
        string password;
    }

    struct MedicalStaff {
        address MSPublicAddress;
        string name;
        string phoneNumber;
        string password;
    }

    struct DonationTransaction {
        uint256 transactionID;
        address donor;
        address recipient;
        address medicalStaff;
        address transporter;
        BloodType bloodType;
        uint256 donationDate;
        TransactionStatus status;
        string medicalCenter;
        uint256 donatedVolume;
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
        BloodType bloodType;
        uint256 volume;
        BloodSupplyStatus status;
    }

    address public owner;
    mapping(address => Donor) public donors;
    mapping(address => Transporter) public transporters;
    mapping(address => MedicalStaff) public medicalStaffs;
    mapping(uint256 => DonationTransaction) public donationTransactions;
    mapping(uint256 => MedicalRecord) public medicalRecords;
    mapping(uint256 => TransportationRecord) public transportationRecords;
    mapping(BloodType => BloodSupply) public bloodSupplies;

    address[] public donorAddressArr;

    uint256 public transactionCounter;
    uint256 public recordCounter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // modifier onlyMedicalStaff() {
    //     require(
    //         donors[msg.sender].user.userType == UserType.MedicalStaff,
    //         "Only medical staff can call this function"
    //     );
    //     _;
    // }

    // modifier onlyTransporter() {
    //     require(
    //         donors[msg.sender].user.userType == UserType.Transporter,
    //         "Only transporters can call this function"
    //     );
    //     _;
    // }

    constructor() {
        owner = msg.sender;
    }

    function addDonor(
        address _donorPublicAddress,
        string memory _name,
        BloodType _bloodType,
        string memory _contactNumber,
        string memory _password
    ) public {
        // require(
        //     donors[_donorPublicAddress].isRegistered == false,
        //     "Donor is already registered"
        // );
        donors[_donorPublicAddress] = Donor({
            donorPublicAddress: _donorPublicAddress,
            name: _name,
            bloodType: _bloodType,
            phoneNumber: _contactNumber,
            password: _password,
            donatedVolume: 0,
            totalPayment: 0,
            isRegistered: true
            // donationHistory: new uint256[](0)
        });
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
            string memory name,
            BloodType bloodType,
            string memory phoneNumber,
            uint256 donatedVolume,
            uint256 totalPayment
        )
    {
        Donor memory donor = donors[_donorPublicAddress];
        name = donor.name;
        bloodType = donor.bloodType;
        phoneNumber = donor.phoneNumber;
        donatedVolume = donor.donatedVolume;
        totalPayment = donor.totalPayment;
    }

    function addTransporter(
        address _transporterPublicAddress,
        string memory _name,
        string memory _contactNumber,
        string memory _password
    ) public {
        transporters[_transporterPublicAddress] = Transporter({
            transporterPublicAddress: _transporterPublicAddress,
            name: _name,
            phoneNumber: _contactNumber,
            password: _password
        });
    }

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

    function donateBloodToMedicalCenter(
        address _donorPublicAddress,
        uint256 _volume
    ) public {
        require(
            donors[_donorPublicAddress].isRegistered = true,
            "Please register donor first"
        );
        require(
            donors[_donorPublicAddress].bloodType != BloodType.Other,
            "Donor has already initiated a donation"
        );

        uint256 transactionID = generateTransactionID();
        donationTransactions[transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: _donorPublicAddress,
            recipient: address(0),
            medicalStaff: address(0),
            transporter: address(0),
            bloodType: donors[_donorPublicAddress].bloodType,
            donationDate: block.timestamp,
            status: TransactionStatus.Pending,
            medicalCenter: "",
            donatedVolume: _volume
        });

        donors[msg.sender].bloodType = BloodType.Other;

        // Increment the transaction count
        transactionCounter++;
    }

    function completeDonationToMedicalCenter(
        uint256 _transactionID,
        string memory _medicalCenter,
        uint256 _bloodPressure,
        uint256 _hemoglobinLevel,
        string memory _bloodTestResults
    ) public {
        require(
            donationTransactions[_transactionID].status ==
                TransactionStatus.Pending,
            "Invalid transaction status"
        );
        require(
            donationTransactions[_transactionID].donor != address(0),
            "Invalid donor address"
        );

        donationTransactions[_transactionID].medicalStaff = msg.sender;
        donationTransactions[_transactionID].medicalCenter = _medicalCenter;
        donationTransactions[_transactionID].status = TransactionStatus
            .Completed;

        donors[donationTransactions[_transactionID].donor]
            .donatedVolume += calculateDonatedVolume(_transactionID);

        uint256 recordID = generateRecordID();
        medicalRecords[recordID] = MedicalRecord({
            recordID: recordID,
            donor: donationTransactions[_transactionID].donor,
            medicalStaff: msg.sender,
            bloodPressure: _bloodPressure,
            hemoglobinLevel: _hemoglobinLevel,
            bloodTestResults: _bloodTestResults
            // donationHistory: new uint256[](0)
        });

        // donors[donationTransactions[_transactionID].donor].donationHistory.push(
        //     _transactionID
        // );

        // uint256 payment = calculatePayment(
        //     donors[donationTransactions[_transactionID].donor].donatedVolume
        // );
        uint256 payment = calculatePayment(_transactionID);
        donors[donationTransactions[_transactionID].donor]
            .totalPayment += payment;
        payable(msg.sender).transfer(payment);
    }

    function initiateTransportation(
        uint256 _transactionID,
        address _recipient,
        string memory _medicalCenter
    ) public {
        require(
            donationTransactions[_transactionID].status ==
                TransactionStatus.Completed,
            "Medical center process not completed"
        );

        uint256 transactionID = generateTransactionID();
        donationTransactions[transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: donationTransactions[_transactionID].donor,
            recipient: _recipient,
            medicalStaff: msg.sender,
            transporter: address(0),
            bloodType: donationTransactions[_transactionID].bloodType,
            donationDate: block.timestamp,
            status: TransactionStatus.Pending,
            medicalCenter: _medicalCenter,
            donatedVolume: donors[donationTransactions[_transactionID].donor]
                .donatedVolume
        });
    }

    function completeTransportation(
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
        donationTransactions[_transactionID].transporter = msg.sender;
    }

    function calculateDonatedVolume(
        uint256 _transactionID
    ) internal view returns (uint256) {
        require(
            donationTransactions[_transactionID].status ==
                TransactionStatus.Completed,
            "Transaction not completed"
        );
        return donationTransactions[_transactionID].donatedVolume;
    }

    function calculatePayment(
        uint256 _transactionID
    ) internal view returns (uint256) {
        require(
            donationTransactions[_transactionID].status ==
                TransactionStatus.Completed,
            "Transaction not completed"
        );
        // Assuming a fixed payment rate for simplicity
        uint256 _donatedVolume = donationTransactions[_transactionID]
            .donatedVolume;
        uint256 paymentRate = 1 gwei; // 1gwei/ml
        return _donatedVolume * paymentRate;
    }

    function addBloodSupply(BloodType _bloodType, uint256 _volume) public {
        // onlyMedicalStaff
        require(_volume > 0, "Volume must be greater than zero");
        require(
            bloodSupplies[_bloodType].status != BloodSupplyStatus.Requested,
            "Blood type already requested"
        );

        if (bloodSupplies[_bloodType].status == BloodSupplyStatus.Available) {
            bloodSupplies[_bloodType].volume += _volume;
        } else {
            bloodSupplies[_bloodType] = BloodSupply({
                bloodType: _bloodType,
                volume: _volume,
                status: BloodSupplyStatus.Available
            });
        }
    }

    function requestBloodType(BloodType _bloodType, uint256 _volume) public {
        // onlyMedicalStaff
        require(
            bloodSupplies[_bloodType].status == BloodSupplyStatus.Available,
            "Blood type not available"
        );
        require(
            bloodSupplies[_bloodType].volume >= _volume,
            "Insufficient blood volume"
        );

        // You can add more logic here to handle the request
        // For example, update the blood supply status or create a new transaction record
    }

    function generateTransactionID() internal returns (uint256) {
        transactionCounter++;
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, transactionCounter))
            );
    }

    function generateRecordID() internal returns (uint256) {
        recordCounter++;
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, recordCounter))
            );
    }
}
