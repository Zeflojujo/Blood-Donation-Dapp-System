/*global artifacts*/
/*eslint no-undef: "error"*/

const BloodDonationBlockchainSystem = artifacts.require('BloodDonationBlockchainSystem');

module.exports = function(deployer) {
    return deployer.deploy(BloodDonationBlockchainSystem);
}