var AnyERC20Token = artifacts.require("./AnyERC20Token.sol");
var DethSwitch = artifacts.require("./DethSwitch.sol");

module.exports = function(deployer) {
  deployer.deploy(AnyERC20Token);
  deployer.deploy(DethSwitch);
};
