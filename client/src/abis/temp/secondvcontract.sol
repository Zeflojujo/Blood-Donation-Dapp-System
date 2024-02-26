// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract BloodDonationSystem {
//     enum UserType {Donor, Recipient, MedicalStaff, Transporter}
//     enum BloodType {A, B, AB, O, Other}
//     enum TransactionStatus {Pending, Completed, MedicalCenterPending, MedicalCenterCompleted}
//     enum TransportationStatus {InTransit, Delivered}

//     struct User {
//         string userName;
//         UserType userType;
//         string contactNumber;
//         string userAddress;
//         BloodType bloodType;
//         uint256 donatedVolume;
//         uint256 totalPayment;
//     }

//     struct DonationTransaction {
//         uint256 transactionID;
//         address donor;
//         address recipient;
//         address medicalStaff;
//         address transporter;
//         BloodType bloodType;
//         uint256 donationDate;
//         TransactionStatus status;
//         address medicalCenter;
//         TransactionStatus medicalCenterStatus;
//         uint256 donatedVolume;
//     }

//     struct MedicalRecord {
//         uint256 recordID;
//         address donor;
//         address medicalStaff;
//         uint256 bloodPressure;
//         uint256 hemoglobinLevel;
//         string bloodTestResults;
//         uint256[] donationHistory;
//     }

//     struct TransportationRecord {
//         uint256 recordID;
//         address transporter;
//         address donor;
//         address recipient;
//         uint256 pickupDateTime;
//         uint256 deliveryDateTime;
//         TransportationStatus status;
//     }

//     address public owner;
//     mapping(address => User) public users;
//     mapping(uint256 => DonationTransaction) public donationTransactions;
//     mapping(uint256 => MedicalRecord) public medicalRecords;
//     mapping(uint256 => TransportationRecord) public transportationRecords;

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only the owner can call this function");
//         _;
//     }

//     modifier onlyMedicalStaff() {
//         require(users[msg.sender].userType == UserType.MedicalStaff, "Only medical staff can call this function");
//         _;
//     }

//     modifier onlyTransporter() {
//         require(users[msg.sender].userType == UserType.Transporter, "Only transporters can call this function");
//         _;
//     }

//     constructor() {
//         owner = msg.sender;
//     }

//     function addUser(
//         string memory _userName,
//         UserType _userType,
//         string memory _contactNumber,
//         string memory _userAddress,
//         BloodType _bloodType
//     ) public {
//         require(_userType != UserType.Donor, "Donors cannot be added directly. Use donateBloodToMedicalCenter.");
//         users[msg.sender] = User({
//             userName: _userName,
//             userType: _userType,
//             contactNumber: _contactNumber,
//             userAddress: _userAddress,
//             bloodType: _bloodType,
//             donatedVolume: 0,
//             totalPayment: 0
//         });
//     }

//     function donateBloodToMedicalCenter() public {
//         require(users[msg.sender].userType == UserType.Donor, "Only donors can initiate blood donation");
//         require(users[msg.sender].bloodType != BloodType.Other, "Donor has already initiated a donation");

//         uint256 transactionID = generateTransactionID();
//         donationTransactions[transactionID] = DonationTransaction({
//             transactionID: transactionID,
//             donor: msg.sender,
//             recipient: address(0),
//             medicalStaff: address(0),
//             transporter: address(0),
//             bloodType: users[msg.sender].bloodType,
//             donationDate: block.timestamp,
//             status: TransactionStatus.MedicalCenterPending,
//             medicalCenter: address(0),
//             medicalCenterStatus: TransactionStatus.Pending,
//             donatedVolume: 0
//         });

//         users[msg.sender].bloodType = BloodType.Other;
//     }

//     function completeDonationToMedicalCenter(
//         uint256 _transactionID,
//         address _medicalCenter,
//         uint256 _bloodPressure,
//         uint256 _hemoglobinLevel,
//         string memory _bloodTestResults
//     ) public onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.MedicalCenterPending, "Invalid transaction status");
//         require(donationTransactions[_transactionID].donor != address(0), "Invalid donor address");

//         donationTransactions[_transactionID].medicalStaff = msg.sender;
//         donationTransactions[_transactionID].medicalCenter = _medicalCenter;
//         donationTransactions[_transactionID].medicalCenterStatus = TransactionStatus.Completed;
//         donationTransactions[_transactionID].status = TransactionStatus.Completed;

//         users[donationTransactions[_transactionID].donor].donatedVolume += calculateDonatedVolume(_transactionID);

//         uint256 recordID = generateRecordID();
//         medicalRecords[recordID] = MedicalRecord({
//             recordID: recordID,
//             donor: donationTransactions[_transactionID].donor,
//             medicalStaff: msg.sender,
//             bloodPressure: _bloodPressure,
//             hemoglobinLevel: _hemoglobinLevel,
//             bloodTestResults: _bloodTestResults,
//             donationHistory: new uint256[](0)
//         });

//         users[donationTransactions[_transactionID].donor].donationHistory.push(_transactionID);

//         uint256 payment = calculatePayment(users[donationTransactions[_transactionID].donor].donatedVolume);
//         users[donationTransactions[_transactionID].donor].totalPayment += payment;
//         payable(msg.sender).transfer(payment);
//     }

//     function initiateTransportation(uint256 _transactionID, address _recipient) public onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.Completed, "Medical center process not completed");
//         require(users[_recipient].userType == UserType.Recipient, "Invalid recipient address");

//         uint256 transactionID = generateTransactionID();
//         donationTransactions[transactionID] = DonationTransaction({
//             transactionID: transactionID,
//             donor: donationTransactions[_transactionID].donor,
//             recipient: _recipient,
//             medicalStaff: msg.sender,
//             transporter: address(0),
//             bloodType: donationTransactions[_transactionID].bloodType,
//             donationDate: block.timestamp,
//             status: TransactionStatus.Pending,
//             medicalCenter: address(0),
//             medicalCenterStatus: TransactionStatus.Completed,
//             donatedVolume: 0
//         });
//     }

//     function completeTransportation(uint256 _recordID) public onlyTransporter {
//         require(transportationRecords[_recordID].status == TransportationStatus.InTransit, "Transportation already completed or not initiated");
//         transportationRecords[_recordID].deliveryDateTime = block.timestamp;
//         transportationRecords[_recordID].status = TransportationStatus.Delivered;
//     }

//     function calculateDonatedVolume(uint256 _transactionID) internal view returns (uint256) {
//         return 500; // Assume a fixed volume for each donation (500 milliliters)
//     }

//     function calculatePayment(uint256 _donatedVolume) internal pure returns (uint256) {
//         uint256 paymentRate = 100; // 100 wei per milliliter
//         return _donatedVolume * paymentRate;
//     }

//     function generateTransactionID() internal view returns (uint256) {
//         return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, donationTransactions.length)));
//     }

//     function generateRecordID() internal view returns (uint256) {
//         return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, medicalRecords.length)));
//     }
// }
