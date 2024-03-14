/*global artifacts*/
/*eslint no-undef: "error"*/

const BloodDonationBlockchainSystem = artifacts.require(
  "BloodDonationBlockchainSystem"
);
const DonorContract = artifacts.require("DonorContract");
const CollectionPointContract = artifacts.require("CollectionPointContract");
const TransportContract = artifacts.require("TransportContract");
const MedicalCenter = artifacts.require("MedicalCenters");

module.exports = function (deployer) {
  deployer
    .deploy(MedicalCenter)
    .then(function () {
      return deployer.deploy(CollectionPointContract);
    })
    .then(function () {
      return deployer.deploy(DonorContract, CollectionPointContract.address);
    })
    .then(function () {
      return deployer.deploy(TransportContract);
    })
    .then(function () {
      return deployer.deploy(
        BloodDonationBlockchainSystem,
        DonorContract.address,
        MedicalCenter.address,
        TransportContract.address,
        CollectionPointContract.address
      );
    });
};
