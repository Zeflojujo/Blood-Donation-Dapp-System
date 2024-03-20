// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./DonorContract.sol";
import "./MedicalCenters.sol";
import "./TransportContract.sol";
import "./AccessControl.sol";
import "./CollectionPointContract.sol";

/**
    @title Blood Donation Blockchain-based System
    @author Josephat E. Temba
    @notice You can use this smart contract in real blood donation operations
    @dev This is best aproach for developers to learn how real dapp looking for
    @custom:fyp This is the final year project for cive students
 */

contract BloodDonationBlockchainSystem is AccessControl {
    enum TransactionStatus { Shipped, Active, Fullfilled }
    enum TransportationStatus { InTransit, Delivered }
    enum BloodSupplyStatus { Available, Requested, Approved }

    /// @dev create system account structure
    struct SystemOwner {
        address sysOwner;
        string password /*audit*/;
        bool isLogin;
    }

    struct DonationTransaction {
        uint256 transactionID;
        address donor;
        address recipient;
        address medicalStaff;
        address requester;
        bool isSupplied;
        BloodSupplyStatus supplyStatus;
        string medicalCenterName;
        address transporter;
        string bloodType;
        uint256 donationDate;
        TransactionStatus status;
        uint256 donatedVolume;
        string bloodTestResult;
    }

    struct MedicalRecord {
        uint256 recordID;
        uint256 transactionID;
        address donor;
        address medicalStaff;
        string HIV;
        string liverFever;
        string bloodType;
        uint256 bloodPressure;
        uint256 hemoglobinLevel;
        string bloodTestResults;
    }

    struct Recipient {
        uint256 recipientID;
        uint256 transactionID;
        address recipientAddress;
        string recipientName;
        string recipientPhoneNumber;
        string bloodType;
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

    mapping(address => SystemOwner) private sysOwnerMap;
    
    mapping(address => mapping(uint256 => MedicalRecord)) public medicalRecords;
    mapping(address => mapping(uint256 => Recipient)) public recipients;
    mapping(address => mapping(uint256 => DonationTransaction)) public donationTransactions;
    mapping(uint256 => DonationTransaction) public allDonationTransactions;

    mapping(uint256 => TransportationRecord) public transportationRecords;
    mapping(string => BloodSupply) public bloodSupplies;

    uint256[] public donationTransactionsArr;
    uint256[] public medicalRecordsArr;
    uint256[] public recipientArr;

    uint256 public transactionCounter;
    uint256 public recordCounter;

    // modifier onlyTransporter() {
    //     require(
    //         transporters[msg.sender].transporterPublicAddress == msg.sender,
    //         "Only transporters can perform this action"
    //     );
    //     _;
    // }

    SystemOwner private sysowner;

    DonorContract public donorContract;
    MedicalCenters public medicalCenter;
    TransportContract public transportContract;
    CollectionPointContract public collectionPoint;

    constructor(address _donorContractAddress, address _medicalCenter, address _transAddress, address collectionPointAddress_) {
        sysowner = SystemOwner(owner, "admin", false);
        sysOwnerMap[owner] = sysowner;
        donorContract = DonorContract(_donorContractAddress);
        medicalCenter = MedicalCenters(_medicalCenter);
        transportContract = TransportContract(_transAddress);
        collectionPoint = CollectionPointContract(collectionPointAddress_);
    }

    modifier onlyMedicalStaff() {
        require(
            medicalCenter.readMedicalCenter(msg.sender).MCPublicAddress == msg.sender,
            "Only medical staff can perform this action"
        );
        _;
    }

    function checkSystemOwnerLogin(address _SYSPublicAddress, string memory _password) public view returns (bool) {
        // require(!medicalsCenters[_MCPublicAddress].isLogin, "You're already logged in");
        require(compareString(sysOwnerMap[_SYSPublicAddress].password, _password), "Invalid address or password");

        return true;
    }

    function systemOwnerLogin(address _MCPublicAddress, string memory _password) public onlyOwner() {
        require(checkSystemOwnerLogin(_MCPublicAddress, _password), "Invalid login credentials");

        sysOwnerMap[_MCPublicAddress].isLogin = true;
    }

    // ---------------- Start Donation initialization ---------------------
    function donateBloodToMedicalCenter(
        address _medicalCenterPublicAddress,
        address _donorPublicAddress,
        uint256 _volume
    ) public {
        require(
            donorContract.readDonors(_donorPublicAddress).isRegistered == true,
            "Please register donor first"
        );

        uint256 transactionID = block.timestamp;
        donationTransactions[_medicalCenterPublicAddress][transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: _donorPublicAddress,
            recipient: address(0),
            medicalStaff: msg.sender,
            requester: address(0),
            isSupplied: false,
            supplyStatus: BloodSupplyStatus.Available,
            medicalCenterName: medicalCenter.readMedicalCenter(_medicalCenterPublicAddress).name,
            transporter: address(0),
            bloodType: donorContract.readDonors(_donorPublicAddress).bloodType,
            donationDate: block.timestamp,
            status: TransactionStatus.Shipped,
            donatedVolume: _volume,
            bloodTestResult: "No Result"
        });
        allDonationTransactions[transactionID] = DonationTransaction({
            transactionID: transactionID,
            donor: _donorPublicAddress,
            recipient: address(0),
            medicalStaff: msg.sender,
            requester: address(0),
            isSupplied: false,
            supplyStatus: BloodSupplyStatus.Available,
            medicalCenterName: medicalCenter.readMedicalCenter(_medicalCenterPublicAddress).name,
            transporter: address(0),
            bloodType: donorContract.readDonors(_donorPublicAddress).bloodType,
            donationDate: block.timestamp,
            status: TransactionStatus.Shipped,
            donatedVolume: _volume,
            bloodTestResult: "No Result"
        });
        donorContract.updateVolume(_donorPublicAddress, _volume);
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
            string memory donorName,
            address recipientPublicAddress,
            address medicalStaff,
            string memory requester,
            bool isSupplied,
            BloodSupplyStatus supplyStatus,
            string memory medicalCenterName,
            address transporterPublicAddress,
            string memory bloodType,
            uint256 donationDate,
            TransactionStatus status,
            uint256 donatedVolume,
            string memory bloodTestResult
        )
    {
        DonationTransaction memory donationTransaction = donationTransactions[_medicalCenterPublicAddress][_transactionID];
        transactionID = donationTransaction.transactionID;
        donorPublicAddress = donationTransaction.donor;
        donorName = donorContract.readDonors(donationTransaction.donor).name;
        recipientPublicAddress = donationTransaction.recipient;
        medicalStaff = donationTransaction.medicalStaff;
        requester = medicalCenter.readMedicalCenter(donationTransaction.requester).name;
        isSupplied = donationTransaction.isSupplied;
        supplyStatus = donationTransaction.supplyStatus;
        transporterPublicAddress = donationTransaction.transporter;
        medicalCenterName = donationTransaction.medicalCenterName;
        bloodType = donationTransaction.bloodType;
        donationDate = donationTransaction.donationDate;
        status = donationTransaction.status;
        donatedVolume = donationTransaction.donatedVolume;
        bloodTestResult = donationTransaction.bloodTestResult;
    }

    function getAllDonationTransaction(
        uint256 _transactionID
    )
        public
        view
        returns (
            uint256 transactionID,
            address donorPublicAddress,
            string memory donorName,
            address recipientPublicAddress,
            address medicalStaff,
            address requester,
            bool isSupplied,
            BloodSupplyStatus supplyStatus,
            string memory medicalCenterName,
            address transporterPublicAddress,
            string memory bloodType,
            uint256 donationDate,
            TransactionStatus status,
            uint256 donatedVolume,
            string memory bloodTestResult
        )
    {
        DonationTransaction memory allDonationTransaction = allDonationTransactions[_transactionID];
        transactionID = allDonationTransaction.transactionID;
        donorPublicAddress = allDonationTransaction.donor;
        donorName = donorContract.readDonors(allDonationTransaction.donor).name;
        recipientPublicAddress = allDonationTransaction.recipient;
        medicalStaff = allDonationTransaction.medicalStaff;
        requester = allDonationTransaction.requester;
        isSupplied = allDonationTransaction.isSupplied;
        supplyStatus = allDonationTransaction.supplyStatus;
        medicalCenterName = allDonationTransaction.medicalCenterName;
        transporterPublicAddress = allDonationTransaction.transporter;
        bloodType = allDonationTransaction.bloodType;
        donationDate = allDonationTransaction.donationDate;
        status = allDonationTransaction.status;
        donatedVolume = allDonationTransaction.donatedVolume;
        bloodTestResult = allDonationTransaction.bloodTestResult;
    }

    // ---------------- End Donation initialization ---------------------

    // ---------------- Start Complete Donation  ------------------------

    function completeDonationToMedicalCenter(
        uint256 _transactionID,
        string memory _bloodType,
        string memory _HIV,
        string memory _liverFever,
        uint256 _bloodPressure,
        uint256 _hemoglobinLevel,
        string memory _bloodTestResults
    ) public onlyMedicalStaff {
        require(
            donationTransactions[msg.sender][_transactionID].status ==
                TransactionStatus.Shipped,
            "Invalid transaction status"
        );
        require(
            donationTransactions[msg.sender][_transactionID].donor != address(0),
            "Invalid donor address"
        );

        donationTransactions[msg.sender][_transactionID].medicalStaff = msg.sender;
        donationTransactions[msg.sender][_transactionID].bloodType = _bloodType;
        donationTransactions[msg.sender][_transactionID].status = TransactionStatus.Active;
        donationTransactions[msg.sender][_transactionID].bloodTestResult = _bloodTestResults;
        allDonationTransactions[_transactionID].medicalStaff = msg.sender;
        allDonationTransactions[_transactionID].bloodType = _bloodType;
        allDonationTransactions[_transactionID].status = TransactionStatus.Active;
        allDonationTransactions[_transactionID].bloodTestResult = _bloodTestResults;
        donorContract.updateDonorBloodType(donationTransactions[msg.sender][_transactionID].donor, _bloodType);
        donorContract.updateDonationHistory(donationTransactions[msg.sender][_transactionID].donor, _transactionID);

        uint256 recordID = block.timestamp;
        medicalRecords[msg.sender][recordID] = MedicalRecord({
            recordID: recordID,
            transactionID: _transactionID,
            donor: donationTransactions[msg.sender][_transactionID].donor,
            bloodType: _bloodType,
            HIV: _HIV,
            liverFever: _liverFever,
            medicalStaff: msg.sender,
            bloodPressure: _bloodPressure,
            hemoglobinLevel: _hemoglobinLevel,
            bloodTestResults: _bloodTestResults
            // donationHistory: new uint256[](0)
        });
        medicalRecordsArr.push(recordID);

        // uint256 payment = calculatePayment(
        //     donors[donationTransactions[_transactionID].donor].donatedVolume
        // );
        // uint256 payment = calculatePayment(_transactionID);
        // donors[donationTransactions[_transactionID].donor]
        //     .totalPayment += payment;
        // payable(msg.sender).transfer(payment);
    }

    function fullFillBloodToRecipient(
        uint256 _transactionID,
        address _recipientAddress,
        string memory _recipientName,
        string memory _recipientPhoneNumber,
        string memory _bloodType
    ) public onlyMedicalStaff {
        require(
            donationTransactions[msg.sender][_transactionID].status ==
                TransactionStatus.Active,
            "Invalid transaction status"
        );
        require(compareString(donationTransactions[msg.sender][_transactionID].bloodTestResult, "ACCEPTED"), "Invalid transaction status");
       /* require(
            donationTransactions[msg.sender][_transactionID].donor != address(0),
            "Invalid donor address"
        ); */

        donationTransactions[msg.sender][_transactionID].recipient = _recipientAddress;
        donationTransactions[msg.sender][_transactionID].status = TransactionStatus.Fullfilled;
        allDonationTransactions[_transactionID].recipient = _recipientAddress;
        allDonationTransactions[_transactionID].status = TransactionStatus.Fullfilled;

        uint256 recipientID = block.timestamp;
        recipients[msg.sender][recipientID] = Recipient({
            recipientID: recipientID,
            transactionID: _transactionID,
            recipientAddress: _recipientAddress,
            recipientName: _recipientName,
            recipientPhoneNumber: _recipientPhoneNumber,
            bloodType: _bloodType
        });

        recipientArr.push(recipientID);
    }

    function getRecipientsArr()
        public
        view
        returns (uint256[] memory)
    {
        return recipientArr;
    }

    function getRecipient(
        address _medicalCenterAddress,
        uint256 _recipientID
    )
        public
        view
        returns (
            uint256 recipientID,
            uint256 transactionID,
            address recipientAddress,
            string memory recipientName,
            string memory recipientPhoneNumber,
            string memory bloodType
        )
    {
        Recipient memory recipient = recipients[_medicalCenterAddress][_recipientID];
        recipientID = recipient.recipientID;
        transactionID = recipient.transactionID;
        recipientAddress = recipient.recipientAddress;
        recipientName = recipient.recipientName;
        recipientPhoneNumber = recipient.recipientPhoneNumber;
        bloodType = recipient.bloodType;
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
            uint256 transactionID,
            address donorAddress,
            string memory bloodType,
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
        transactionID = medicalRecord.transactionID;
        donorAddress = medicalRecord.donor;
        bloodType = medicalRecord.bloodType;
        medicalStaff = medicalRecord.medicalStaff;
        bloodPressure = medicalRecord.bloodPressure;
        hemoglobinLevel = medicalRecord.hemoglobinLevel;
        bloodTestResult = medicalRecord.bloodTestResults;
    }

    // ---------------- End Complete Donation  ------------------------

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

    function requestBloodSupply(uint256 _transactionID, address _medicalCenterPublicAddress , address requester_) external onlyMedicalStaff {
        DonationTransaction storage donationTransaction = donationTransactions[_medicalCenterPublicAddress][_transactionID];
        require(allDonationTransactions[_transactionID].supplyStatus == BloodSupplyStatus.Available, "This transaction is not Available");

        donationTransaction.requester = requester_;
        donationTransaction.supplyStatus = BloodSupplyStatus.Requested;

        donationTransactions[_medicalCenterPublicAddress][_transactionID] = donationTransaction;
        allDonationTransactions[_transactionID] = donationTransaction;
    }

    function approvalBloodSupplied(uint256 _transactionID, address _medicalCenterPublicAddress, address transporterAddress_ ) external onlyMedicalStaff {

        DonationTransaction storage donationTransaction = donationTransactions[_medicalCenterPublicAddress][_transactionID];
        require(allDonationTransactions[_transactionID].supplyStatus == BloodSupplyStatus.Requested, "This transaction should be requested first");

        donationTransaction.transporter = transporterAddress_;
        donationTransaction.supplyStatus = BloodSupplyStatus.Approved;

        donationTransactions[_medicalCenterPublicAddress][_transactionID] = donationTransaction;
        allDonationTransactions[_transactionID] = donationTransaction;
        transportContract.updateTransportationHistory(transporterAddress_, _transactionID);
    }

    function supply(address _medicalCenterPublicAddress, uint256 _transactionID) external {
        //DonationTransaction storage donationTransaction = donationTransactions[_medicalCenterPublicAddress][_transactionID];

        //donationTransaction.isSupplied = true;
        donationTransactions[_medicalCenterPublicAddress][_transactionID].isSupplied = true;
        allDonationTransactions[_transactionID].isSupplied = true;

    }

}
