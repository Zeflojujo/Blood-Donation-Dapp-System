// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./DonorContract.sol";
import "./MedicalCenters.sol";
import "./TransportContract.sol";
import "./AccessControl.sol";

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
    enum BloodSupplyStatus { Available, Requested }

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
        string bloodType;
        uint256 bloodPressure;
        uint256 hemoglobinLevel;
        string bloodTestResults;
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
    mapping(address => mapping(uint256 => DonationTransaction)) public donationTransactions;

    mapping(uint256 => TransportationRecord) public transportationRecords;
    mapping(string => BloodSupply) public bloodSupplies;

    uint256[] public donationTransactionsArr;
    uint256[] public medicalRecordsArr;

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

    constructor(address _donorContractAddress, address _medicalCenter, address _transAddress) {
        sysowner = SystemOwner(owner, "admin", false);
        sysOwnerMap[owner] = sysowner;
        donorContract = DonorContract(_donorContractAddress);
        medicalCenter = MedicalCenters(_medicalCenter);
        transportContract = TransportContract(_transAddress);
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
            address recipientPublicAddress,
            address transporterPublicAddress,
            string memory bloodType,
            uint256 donationDate,
            TransactionStatus status,
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
        donatedVolume = donationTransaction.donatedVolume;
        bloodTestResult = donationTransaction.bloodTestResult;
    }

    // ---------------- End Donation initialization ---------------------

    // ---------------- Start Complete Donation  ------------------------

    function completeDonationToMedicalCenter(
        uint256 _transactionID,
        string memory _bloodType,
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
        donorContract.updateDonorBloodType(donationTransactions[msg.sender][_transactionID].donor, _bloodType);
        donorContract.updateDonationHistory(donationTransactions[msg.sender][_transactionID].donor, _transactionID);

        uint256 recordID = block.timestamp;
        medicalRecords[msg.sender][recordID] = MedicalRecord({
            recordID: recordID,
            transactionID: _transactionID,
            donor: donationTransactions[msg.sender][_transactionID].donor,
            bloodType: _bloodType,
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

    function initiateTransportation(
        address _medicalCenterPublicAddress,
        uint256 _transactionID,
        address _recipient
        // string memory _medicalCenter
    ) public {
        require(
            donationTransactions[_medicalCenterPublicAddress][_transactionID].status ==
                TransactionStatus.Active,
            "Medical center process not Active"
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
            // donatedVolume: DonorContract.readDonors(donationTransactions[_medicalCenterPublicAddress][_transactionID].donor).donatedVolume,
            donatedVolume: 300,
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

}
