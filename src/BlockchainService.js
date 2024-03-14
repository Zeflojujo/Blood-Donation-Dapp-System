import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import abi from "./abis/BloodDonationBlockchainSystem.json";
import mcAbi from "./abis/MedicalCenters.json";
import donorAbi from "./abis/DonorContract.json";
import transAbi from "./abis/TransportContract.json";
import cpAbi from "./abis/CollectionPointContract.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = abi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(abi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getMedicalCenterContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = mcAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(mcAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getCollectionPointContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = cpAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(cpAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getDonorContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = donorAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(donorAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getTransporterContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = transAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(transAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return console.log("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return window.print("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      setGlobalState("connectedAccount", "");
      reportError("Please connect wallet.");
    }
  } catch (error) {
    console.log(error);
  }
};

const addDonor = async ({
  publicAddress,
  name,
  age,
  gender,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getDonorContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addDonor(publicAddress, name, age, gender, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    if (
      error.message.includes("Only collection point can perform this action")
    ) {
      const errorMessage = "Please, Login with administrator wallet account";
      setGlobalState("donorError", errorMessage);
    } else if (error.message.includes("Donor is already registered")) {
      const errorMessage = "Donor is already registered";
      setGlobalState("donorError", errorMessage);
    } else if (error.message.includes("Invalid public address")) {
      const errorMessage = "Invalid publicAddress or Password";
      setGlobalState("donorError", errorMessage);
    } else {
      setGlobalState("smartcontractError", "Donor Registration Failed");
    }
  }
};

const deleteDonor = async ({ publicAddress }) => {
  try {
    const contract = await getDonorContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .deleteDonor(publicAddress)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

// const addDonor = async ({
//   publicAddress,
//   name,
//   bloodType,
//   phoneNumber,
//   password,
// }) => {
//   try {
//     const contract = await getEtheriumContract();
//     // const web3 = getWeb3Instance(); // Assuming you have a function to get web3 instance
//     const account = getGlobalState("connectedAccount");

//     // Get the nonce for the account
//     const nonce = await window.web3.eth.getTransactionCount(account);

//     // Create a transaction object with the method data
//     const transactionObject = contract.methods.addDonor(
//       publicAddress,
//       name,
//       bloodType,
//       phoneNumber,
//       password
//     );

//     // Estimate gas
//     const gasEstimate = await transactionObject.estimateGas();

//     // Get the gas price
//     const gasPrice = await window.web3.eth.getGasPrice();

//     // Create a raw transaction
//     const rawTransaction = {
//       nonce: window.web3.utils.toHex(nonce),
//       gasLimit: window.web3.utils.toHex(gasEstimate),
//       gasPrice: window.web3.utils.toHex(gasPrice),
//       to: contract.options.address,
//       data: transactionObject.encodeABI(),
//     };

//     // Sign the transaction
//     const signedTransaction = await window.web3.eth.accounts.signTransaction(
//       rawTransaction,
//       "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d" // Replace privateKey with the private key of the account
//     );

//     // Send the signed transaction
//     const receipt = await window.web3.eth.sendSignedTransaction(
//       signedTransaction.rawTransaction
//     );

//     console.log("Registration receipt: ", receipt);

//     // Handle success
//     return true;
//   } catch (error) {
//     // Handle errors
//     if (
//       error.message.includes("Only collection point can perform this action")
//     ) {
//       const errorMessage = "Please, Login with administrator wallet account";
//       setGlobalState("donorError", errorMessage);
//     } else if (error.message.includes("Donor is already registered")) {
//       const errorMessage = "Donor is already registered";
//       setGlobalState("donorError", errorMessage);
//     } else if (error.message.includes("Invalid public address")) {
//       const errorMessage = "Invalid publicAddress or Password";
//       setGlobalState("donorError", errorMessage);
//     } else {
//       setGlobalState("smartcontractError", "Donor Registration Failed");
//     }
//   }
// };

const registerTransporter = async ({
  publicAddress,
  name,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getTransporterContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addTransporter(publicAddress, name, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    if (error.message.includes("Restricted to system owner only")) {
      const errorMessage = "Your have no access to perform this action";
      setGlobalState("smartcontractError", errorMessage);
    } else {
      const errorMessage = "Transporter registration failed...";
      setGlobalState("smartcontractError", errorMessage);
    }
  }
};

const registerMedicalStaff = async ({
  publicAddress,
  name,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getMedicalCenterContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addMedicalCenter(publicAddress, name, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const registerCollectionPoint = async ({
  publicAddress,
  name,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getCollectionPointContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addCollectionPoint(publicAddress, name, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const medicalCenterLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getMedicalCenterContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .medicalCenterLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const colletionPointLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getCollectionPointContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .collectionPointLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const systemOwnerLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .systemOwnerLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const donorLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getDonorContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .donorLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const TransporterLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getTransporterContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .transporterLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const displayDonors = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getDonorContract();

    const donorAddressArray = await contract.methods.getDonorsArr().call();

    const donorAddressData = [];

    if (donorAddressArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < donorAddressArray.length; i++) {
      const donorAddress = donorAddressArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donor = await contract.methods.getDonor(donorAddress).call();
      if (!_donor.isDeleted) {
        donorAddressData.push(_donor);
      }
      console.log("Donor :", _donor);
    }

    setGlobalState("donors", donorAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayDonorDonationHistory = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const donorContract = await getDonorContract();
    const transactionContract = await getEtheriumContract();
    const donorAddress = getGlobalState("connectedAccount");

    const _donor = await donorContract.methods.getDonor(donorAddress).call();

    console.log("donor data: ", _donor);
    console.log(
      "donor transactionIdHistoryArray: ",
      _donor.donorTransactionHistory
    );

    const donorTransactionArray = _donor.donorTransactionHistory;

    const donorTransactionData = [];

    for (let i = 0; i < donorTransactionArray.length; i++) {
      const transactionId = donorTransactionArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donationTransaction = await transactionContract.methods
        .getAllDonationTransaction(transactionId)
        .call();
      console.log(
        "donation of blood for specific medical center: ",
        _donationTransaction.transactionID
      );
      // if (_donationTransaction.transactionID !== 0n) {
      donorTransactionData.push(_donationTransaction);
      // }
      // console.log("Donation Transaction :", _donationTransaction);
    }

    setGlobalState("donorTransactionHistory", donorTransactionData);
  } catch (error) {
    console.log(error);
  }
};

const displayTransporters = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getTransporterContract();

    const transportersAddressArray = await contract.methods
      .getTransportersArr()
      .call();

    const transportersAddressData = [];

    if (transportersAddressArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < transportersAddressArray.length; i++) {
      const transportersAddress = transportersAddressArray[i];

      const _transporter = await contract.methods
        .getTransporter(transportersAddress)
        .call();
      transportersAddressData.push(_transporter);
      console.log("Transporter :", _transporter);
    }
    console.log(
      "Transporter from blockchain Service ",
      transportersAddressData
    );

    setGlobalState("transporters", transportersAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayMedicalCenters = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getMedicalCenterContract();

    const MedicalCenterAddressArray = await contract.methods
      .getMedicalCentersArr()
      .call();

    const medicalCenterAddressData = [];

    if (MedicalCenterAddressArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < MedicalCenterAddressArray.length; i++) {
      const medicalCenterAddress = MedicalCenterAddressArray[i];

      const _medicalCenter = await contract.methods
        .getMedicalCenter(medicalCenterAddress)
        .call();
      medicalCenterAddressData.push(_medicalCenter);
      // console.log("Medical Center :", _medicalCenter);
    }

    setGlobalState("medicalCenters", medicalCenterAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayMedicalCenter = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getMedicalCenterContract();
    const medicalCenterAddress = getGlobalState("connectedAccount");

    const medicalCenterData = await contract.methods
      .getMedicalCenter(medicalCenterAddress)
      .call();
    // console.log("Medical Center :", _medicalCenter);

    setGlobalState("medicalCenter", medicalCenterData);
  } catch (error) {
    console.log(error);
  }
};

const displayCollectionPoints = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getCollectionPointContract();

    const collectionPointAddressArray = await contract.methods
      .getCollectionPointsArr()
      .call();

    const collectionPointAddressData = [];

    if (collectionPointAddressArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < collectionPointAddressArray.length; i++) {
      const collectionPointAddress = collectionPointAddressArray[i];

      const _collectionPoint = await contract.methods
        .getCollectionPoint(collectionPointAddress)
        .call();
      collectionPointAddressData.push(_collectionPoint);
      // console.log("Collection Point :", _collectionPoint);
    }

    setGlobalState("collectionPoints", collectionPointAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayDonationTransaction = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    const transactionIdArray = await contract.methods
      .getDonationTransactionArr()
      .call();

    const donationTransactionData = [];

    if (transactionIdArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < transactionIdArray.length; i++) {
      const transactionId = transactionIdArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donationTransaction = await contract.methods
        .getDonationTransaction(account, transactionId)
        .call();
      console.log(
        "donation of blood for specific medical center: ",
        _donationTransaction.transactionID
      );
      if (_donationTransaction.transactionID !== 0n) {
        donationTransactionData.push(_donationTransaction);
      }
      // console.log("Donation Transaction :", _donationTransaction);
    }

    setGlobalState("donationTransactions", donationTransactionData);
  } catch (error) {
    console.log(error);
  }
};

const displayBloodSupplied = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    const transactionIdArray = await contract.methods
      .getDonationTransactionArr()
      .call();

    console.log("list of transactionID", transactionIdArray);

    const donationTransactionData = [];

    if (transactionIdArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < transactionIdArray.length; i++) {
      const transactionId = transactionIdArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donationTransaction = await contract.methods
        .getAllDonationTransaction(transactionId)
        .call();
      console.log(
        "donation of blood for specific medical center: ",
        _donationTransaction
      );
      if (
        _donationTransaction.bloodTestResult === "ACCEPTED" &&
        _donationTransaction.status === 1n
      ) {
        donationTransactionData.push(_donationTransaction);
      }
      // console.log("Donation Transaction :", _donationTransaction);
    }

    setGlobalState("bloodSupplied", donationTransactionData);
  } catch (error) {
    console.log(error);
  }
};

const displayMedicalRecord = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    const medicalRecordIdArray = await contract.methods
      .getMedicalRecordsArr()
      .call();

    const medicalRecordData = [];

    if (medicalRecordIdArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < medicalRecordIdArray.length; i++) {
      const medicalRecordId = medicalRecordIdArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donationTransaction = await contract.methods
        .getMedicalRecord(account, medicalRecordId)
        .call();
      console.log(
        "let me see donationTransaction details: ",
        _donationTransaction.medicalRecordID
      );
      if (_donationTransaction.medicalRecordID !== 0n) {
        medicalRecordData.push(_donationTransaction);
      }
      // console.log("Donation Transaction :", _donationTransaction);
    }

    setGlobalState("medicalRecords", medicalRecordData);
  } catch (error) {
    console.log(error);
  }
};

const initiateDonationTransaction = async ({
  MCPublicAddress,
  DNPublicAddress,
  donatedVolume,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .donateBloodToMedicalCenter(
        MCPublicAddress,
        DNPublicAddress,
        donatedVolume
      )
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const completeDonationTransactions = async ({
  transactionId,
  bloodType,
  bloodPressure,
  hemoglobinLevel,
  bloodTestResults,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    console.log("am reach at this point");

    await contract.methods
      .completeDonationToMedicalCenter(
        Number(transactionId),
        bloodType,
        Number(bloodPressure),
        Number(hemoglobinLevel),
        bloodTestResults
      )
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

export {
  connectWallet,
  isWallectConnected,
  addDonor,
  registerTransporter,
  registerMedicalStaff,
  systemOwnerLogin,
  medicalCenterLogin,
  colletionPointLogin,
  donorLogin,
  TransporterLogin,
  displayDonors,
  displayDonorDonationHistory,
  displayTransporters,
  displayDonationTransaction,
  displayMedicalCenters,
  displayMedicalCenter,
  displayMedicalRecord,
  displayCollectionPoints,
  displayBloodSupplied,
  initiateDonationTransaction,
  completeDonationTransactions,
  deleteDonor,
  registerCollectionPoint,
};
