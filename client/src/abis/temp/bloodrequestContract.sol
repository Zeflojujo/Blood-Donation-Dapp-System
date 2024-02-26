// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// // Smart contract for blood supply-related functionalities
// contract BloodSupplyContract is UserContract {
//     enum BloodSupplyStatus {Available, Requested, Approved, Rejected}

//     struct BloodSupply {
//         BloodType bloodType;
//         uint256 volume;
//         BloodSupplyStatus status;
//         uint256 requestTime; // Timestamp when the request was initiated
//     }

//     mapping(BloodType => BloodSupply) public bloodSupplies;

//     modifier onlyMedicalStaff() {
//         require(users[msg.sender].userType == UserType.MedicalStaff, "Only medical staff can call this function");
//         _;
//     }

//     function addBloodSupply(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(_volume > 0, "Volume must be greater than zero");
//         require(bloodSupplies[_bloodType].status != BloodSupplyStatus.Requested, "Blood type already requested");

//         if (bloodSupplies[_bloodType].status == BloodSupplyStatus.Available) {
//             bloodSupplies[_bloodType].volume += _volume;
//         } else {
//             bloodSupplies[_bloodType] = BloodSupply({
//                 bloodType: _bloodType,
//                 volume: _volume,
//                 status: BloodSupplyStatus.Available,
//                 requestTime: 0
//             });
//         }
//     }

//     function requestBloodType(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Available, "Blood type not available");
//         require(bloodSupplies[_bloodType].volume >= _volume, "Insufficient blood volume");

//         // Update the status to Requested
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Requested;
//         bloodSupplies[_bloodType].requestTime = block.timestamp; // Record the request time

//         // Decrease the blood volume before approval
//         bloodSupplies[_bloodType].volume -= _volume;

//         // Additional logic to handle the request
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // Emit an event or perform other actions as needed
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "Blood request not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Approved;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to reject a blood supply request
//     function rejectBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "No pending request");

//         // Revert the blood volume and reject the request
//         bloodSupplies[_bloodType].volume += _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Available;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to automatically reject unapproved requests after a specified period
//     function autoRejectUnapprovedRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "No pending request");

//         uint256 requestTime = bloodSupplies[_bloodType].requestTime;
//         require(block.timestamp > requestTime + 1 days, "Request is still pending approval");

//         // Revert the blood volume and reject the request
//         bloodSupplies[_bloodType].volume += _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Available;

//         // Emit an event or perform other actions as needed
//     }
// }

// // Combine all the contracts into one
// contract BloodDonationSystem is DonationContract, MedicalContract, TransportContract, BloodSupplyContract {
//     // Additional functionalities or common variables can be added here
//     // ...
// }







// // Smart contract for user-related functionalities
// contract UserContract {
//     enum UserType {Donor, Recipient, MedicalStaff, Transporter}

//     struct User {
//         string userName;
//         UserType userType;
//         string contactNumber;
//         string userAddress;
//     }

//     mapping(address => User) public users;

//     modifier onlyUser() {
//         require(users[msg.sender].userType != UserType(0), "User not registered");
//         _;
//     }

//     function registerUser(
//         string memory _userName,
//         UserType _userType,
//         string memory _contactNumber,
//         string memory _userAddress
//     ) external {
//         users[msg.sender] = User({
//             userName: _userName,
//             userType: _userType,
//             contactNumber: _contactNumber,
//             userAddress: _userAddress
//         });
//     }
// }

// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     enum BloodType {A, B, AB, O, Other}
//     enum TransactionStatus {Pending, Completed, MedicalCenterPending, MedicalCenterCompleted, Rejected}

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

//     mapping(uint256 => DonationTransaction) public donationTransactions;
//     uint256 public transactionCounter;

//     modifier onlyDonor() {
//         require(users[msg.sender].userType == UserType.Donor, "Only donors can call this function");
//         _;
//     }

//     function initiateDonation(
//         address _recipient,
//         BloodType _bloodType,
//         uint256 _volume
//     ) external onlyDonor {
//         require(users[_recipient].userType == UserType.Recipient, "Invalid recipient address");

//         // Update the status to Pending
//         donationTransactions[transactionCounter].status = TransactionStatus.Pending;

//         // Additional logic to handle the donation initiation
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // Increment transaction counter
//         transactionCounter++;
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(uint256 _transactionID) external onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.Pending, "Transaction not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         donationTransactions[_transactionID].status = TransactionStatus.Approved;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to reject a blood supply request
//     function rejectBloodRequest(uint256 _transactionID) external onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.Pending, "Transaction not pending approval");

//         // Revert the blood volume and reject the request
//         // Assuming the volume is already deducted during initiation
//         donationTransactions[_transactionID].status = TransactionStatus.Rejected;

//         // Emit an event or perform other actions as needed
//     }

//     // ... (other contract code)
// }

// // Smart contract for medical-related functionalities
// contract MedicalContract is UserContract {
//     enum TransactionStatus {Pending, Completed}

//     struct MedicalRecord {
//         uint256 recordID;
//         address donor;
//         address medicalStaff;
//         uint256 bloodPressure;
//         uint256 hemoglobinLevel;
//         string bloodTestResults;
//     }

//     mapping(uint256 => MedicalRecord) public medicalRecords;
//     uint256 public recordCounter;

//     modifier onlyMedicalStaff() {
//         require(users[msg.sender].userType == UserType.MedicalStaff, "Only medical staff can call this function");
//         _;
//     }

//     function completeMedicalCheckup(
//         address _donor,
//         uint256 _bloodPressure,
//         uint256 _hemoglobinLevel,
//         string memory _bloodTestResults
//     ) external onlyMedicalStaff {
//         // Implement medical checkup completion logic
//         // ...

//         // Increment record counter
//         recordCounter++;
//     }

//     // ... (other contract code)
// }

// // Smart contract for transportation-related functionalities
// contract TransportContract is UserContract {
//     enum TransportationStatus {InTransit, Delivered}

//     struct TransportationRecord {
//         uint256 recordID;
//         address transporter;
//         address donor;
//         address recipient;
//         uint256 pickupDateTime;
//         uint256 deliveryDateTime;
//         TransportationStatus status;
//     }

//     mapping(uint256 => TransportationRecord) public transportationRecords;
//     uint256 public transportCounter;

//     modifier onlyTransporter() {
//         require(users[msg.sender].userType == UserType.Transporter, "Only transporters can call this function");
//         _;
//     }

//     function completeTransportation(
//         uint256 _recordID
//     ) external onlyTransporter {
//         // Implement transportation completion logic
//         // ...

//         // Increment transport counter
//         transportCounter++;
//     }

//     // ... (other contract code)
// }







// // Smart contract for user-related functionalities
// contract UserContract {
//     enum UserType {Donor, Recipient, MedicalStaff, Transporter}

//     struct User {
//         string userName;
//         UserType userType;
//         string contactNumber;
//         string userAddress;
//     }

//     mapping(address => User) public users;

//     modifier onlyUser() {
//         require(users[msg.sender].userType != UserType(0), "User not registered");
//         _;
//     }

//     function registerUser(
//         string memory _userName,
//         UserType _userType,
//         string memory _contactNumber,
//         string memory _userAddress
//     ) external {
//         users[msg.sender] = User({
//             userName: _userName,
//             userType: _userType,
//             contactNumber: _contactNumber,
//             userAddress: _userAddress
//         });
//     }
// }

// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     enum BloodType {A, B, AB, O, Other}
//     enum TransactionStatus {Pending, Completed, MedicalCenterPending, MedicalCenterCompleted, Rejected}

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

//     mapping(uint256 => DonationTransaction) public donationTransactions;
//     uint256 public transactionCounter;

//     modifier onlyDonor() {
//         require(users[msg.sender].userType == UserType.Donor, "Only donors can call this function");
//         _;
//     }

//     function initiateDonation(
//         address _recipient,
//         BloodType _bloodType,
//         uint256 _volume
//     ) external onlyDonor {
//         require(users[_recipient].userType == UserType.Recipient, "Invalid recipient address");

//         // Update the status to Pending
//         donationTransactions[transactionCounter].status = TransactionStatus.Pending;

//         // Additional logic to handle the donation initiation
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // Increment transaction counter
//         transactionCounter++;
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(uint256 _transactionID) external onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.Pending, "Transaction not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         donationTransactions[_transactionID].status = TransactionStatus.Approved;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to reject a blood supply request
//     function rejectBloodRequest(uint256 _transactionID) external onlyMedicalStaff {
//         require(donationTransactions[_transactionID].status == TransactionStatus.Pending, "Transaction not pending approval");

//         // Revert the blood volume and reject the request
//         // Assuming the volume is already deducted during initiation
//         donationTransactions[_transactionID].status = TransactionStatus.Rejected;

//         // Emit an event or perform other actions as needed
//     }

//     // ... (other contract code)
// }







// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     // ... (previous contract code)

//     enum BloodSupplyStatus {Available, Requested, Approved, Rejected}

//     struct BloodSupply {
//         BloodType bloodType;
//         uint256 volume;
//         BloodSupplyStatus status;
//         uint256 requestTime; // Timestamp when the request was initiated
//     }

//     mapping(BloodType => BloodSupply) public bloodSupplies;

//     // ... (previous contract code)

//     function requestBloodType(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Available, "Blood type not available");
//         require(bloodSupplies[_bloodType].volume >= _volume, "Insufficient blood volume");

//         // Update the status to Requested
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Requested;
//         bloodSupplies[_bloodType].requestTime = block.timestamp; // Record the request time

//         // Decrease the blood volume before approval
//         bloodSupplies[_bloodType].volume -= _volume;

//         // Additional logic to handle the request
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // Emit an event or perform other actions as needed
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "Blood request not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Approved;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to reject a blood supply request
//     function rejectBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "No pending request");

//         // Revert the blood volume and reject the request
//         bloodSupplies[_bloodType].volume += _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Rejected;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to automatically reject unapproved requests after a specified period
//     function autoRejectUnapprovedRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "No pending request");

//         uint256 requestTime = bloodSupplies[_bloodType].requestTime;
//         require(block.timestamp > requestTime + 1 days, "Request is still pending approval");

//         // Revert the blood volume and reject the request
//         bloodSupplies[_bloodType].volume += _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Rejected;

//         // Emit an event or perform other actions as needed
//     }

//     // ... (other contract code)
// }



// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     // ... (previous contract code)

//     enum BloodSupplyStatus {Available, Requested, Approved}

//     struct BloodSupply {
//         BloodType bloodType;
//         uint256 volume;
//         BloodSupplyStatus status;
//         uint256 requestTime; // Timestamp when the request was initiated
//     }

//     mapping(BloodType => BloodSupply) public bloodSupplies;

//     // ... (previous contract code)

//     function requestBloodType(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Available, "Blood type not available");
//         require(bloodSupplies[_bloodType].volume >= _volume, "Insufficient blood volume");

//         // Update the status to Requested
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Requested;
//         bloodSupplies[_bloodType].requestTime = block.timestamp; // Record the request time

//         // Decrease the blood volume before approval
//         bloodSupplies[_bloodType].volume -= _volume;

//         // Additional logic to handle the request
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // Emit an event or perform other actions as needed
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "Blood request not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Approved;

//         // Emit an event or perform other actions as needed
//     }

//     // Function to automatically reject unapproved requests after a specified period
//     function autoRejectUnapprovedRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "No pending request");

//         uint256 requestTime = bloodSupplies[_bloodType].requestTime;
//         require(block.timestamp > requestTime + 1 days, "Request is still pending approval");

//         // Revert the blood volume and reject the request
//         bloodSupplies[_bloodType].volume += _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Available;

//         // Emit an event or perform other actions as needed
//     }

//     // ... (other contract code)
// }



// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     // ... (previous contract code)

//     enum BloodSupplyStatus {Available, Requested}

//     struct BloodSupply {
//         BloodType bloodType;
//         uint256 volume;
//         BloodSupplyStatus status;
//     }

//     mapping(BloodType => BloodSupply) public bloodSupplies;

//     // ... (previous contract code)

//     function requestBloodType(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Available, "Blood type not available");
//         require(bloodSupplies[_bloodType].volume >= _volume, "Insufficient blood volume");

//         // Additional logic to handle the request
//         bloodSupplies[_bloodType].volume -= _volume;
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Requested;

//         // You may want to create a new transaction record here
//         // For simplicity, let's assume you have a function to handle this
//         createTransactionRecord(_bloodType, _volume);

//         // Emit an event or perform other actions as needed
//     }

//     // Function to create a new donation transaction record
//     function createTransactionRecord(BloodType _bloodType, uint256 _volume) internal {
//         // Generate a unique transaction ID
//         uint256 transactionID = generateTransactionID();

//         // Create a new donation transaction record
//         donationTransactions[transactionID] = DonationTransaction({
//             transactionID: transactionID,
//             donor: msg.sender, // Assuming the medical staff initiates the request
//             recipient: address(0), // Recipient will be assigned later
//             medicalStaff: msg.sender,
//             transporter: address(0),
//             bloodType: _bloodType,
//             donationDate: block.timestamp,
//             status: TransactionStatus.Pending,
//             medicalCenter: address(0),
//             medicalCenterStatus: TransactionStatus.Completed,
//             donatedVolume: _volume
//         });

//         // Increment the transaction counter
//         transactionCounter++;
//     }
// }



// // Smart contract for donation-related functionalities
// contract DonationContract is UserContract {
//     // ... (previous contract code)

//     enum BloodSupplyStatus {Available, Requested, Approved}

//     struct BloodSupply {
//         BloodType bloodType;
//         uint256 volume;
//         BloodSupplyStatus status;
//     }

//     mapping(BloodType => BloodSupply) public bloodSupplies;

//     // ... (previous contract code)

//     function requestBloodType(BloodType _bloodType, uint256 _volume) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Available, "Blood type not available");
//         require(bloodSupplies[_bloodType].volume >= _volume, "Insufficient blood volume");

//         // Update the status to Requested
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Requested;

//         // Additional logic to handle the request
//         // You might emit an event, notify relevant parties, or perform other actions here

//         // You may want to create a new transaction record here
//         // For simplicity, let's assume you have a function to handle this
//         createTransactionRecord(_bloodType, _volume);

//         // Emit an event or perform other actions as needed
//     }

//     // Function to approve a blood supply request
//     function approveBloodRequest(BloodType _bloodType) external onlyMedicalStaff {
//         require(bloodSupplies[_bloodType].status == BloodSupplyStatus.Requested, "Blood request not pending approval");

//         // Additional approval logic, e.g., verifying recipient information, etc.

//         // Update the status to Approved
//         bloodSupplies[_bloodType].status = BloodSupplyStatus.Approved;

//         // Decrease the blood volume after approval
//         bloodSupplies[_bloodType].volume -= _volume;

//         // Emit an event or perform other actions as needed
//     }

//     // ... (other contract code)
// }
