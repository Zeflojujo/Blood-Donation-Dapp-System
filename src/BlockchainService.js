import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import abi from "./abis/BloodDonationBlockchainSystem.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = abi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(abi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return window.print("Please install Metamask");
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
  bloodType,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addDonor(publicAddress, name, bloodType, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const registerTransporter = async ({
  publicAddress,
  name,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addTransporter(publicAddress, name, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const registerMedicalStaff = async ({
  publicAddress,
  name,
  phoneNumber,
  password,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .addMedicalCenter(publicAddress, name, phoneNumber, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const medicalCenterLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .medicalCenterLogin(publicAddress, password)
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

const displayDonors = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();

    const donorAddressArray = await contract.methods.getDonorsArr().call();

    const donorAddressData = [];

    if (donorAddressArray.length === 0) {
      console.log("NO DATA");
    }

    for (let i = 0; i < donorAddressArray.length; i++) {
      const donorAddress = donorAddressArray[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const _donor = await contract.methods.getDonor(donorAddress).call();
      donorAddressData.push(_donor);
      console.log("Donor :", _donor);
    }

    setGlobalState("donors", donorAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayTransporters = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();

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

    const contract = await getEtheriumContract();

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
      console.log("Medical Center :", _medicalCenter);
    }

    setGlobalState("medicalCenters", medicalCenterAddressData);
  } catch (error) {
    console.log(error);
  }
};

const displayDonationTransaction = async () => {
  try {
    if (!ethereum) return window.alert("Please install Metamask");

    const contract = await getEtheriumContract();

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
        .getDonationTransaction(transactionId)
        .call();
      donationTransactionData.push(_donationTransaction);
      console.log("Donation Transaction :", _donationTransaction);
    }

    setGlobalState("donationTransactions", donationTransactionData);
  } catch (error) {
    console.log(error);
  }
};

const initiateDonationTransaction = async ({
  publicAddress,
  donatedVolume,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .donateBloodToMedicalCenter(publicAddress, donatedVolume)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const completeDonationTransaction = async ({
  transactionId,
  medicalCenter,
  bloodPressure,
  hemoglobinLevel,
  bloodTestResults,
}) => {
  try {
    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .completeDonationToMedicalCenter(
        Number(transactionId),
        medicalCenter,
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
  displayDonors,
  displayTransporters,
  displayMedicalCenters,
  displayDonationTransaction,
  initiateDonationTransaction,
  completeDonationTransaction,
};
