var dethSwitchFactory = artifacts.require("./DethSwitchFactory.sol");

contract('DethSwitchFactory', function(accounts) {

  it("should successfully deploy a new dethSwitch contract", async function() {
      var deth_switch_factory = await dethSwitchFactory.deployed();
      assert.isDefined(deth_switch_factory, "dethSwitchFactory did not deploy successfully");

      let deth_contract_name = 'DSContractOne';
      let heir_account_address = accounts[3];
      let expirationTime = 1;

      let deth_switch_contract_address = await deth_switch_factory.newDethSwitch.call(heir_account_address,deth_contract_name,expirationTime); //.call() obtains return value of the function
      assert.isDefined(deth_switch_contract_address, 'dethSwitch contract did not deploy successfully');
  });

  it("should return 0 owned contracts because parent did not deploy any DS contract", async function() {
    var deth_switch_factory = await dethSwitchFactory.deployed();
    let ownedContracts = await deth_switch_factory.getNumberOfOwnedContracts();
    assert.equal(0,ownedContracts,"Did not return 0 owned contracts when parent did not deploy any DS contract");
  });

  it("should return 0 heir contracts because heir is not recipient of any DS contract", async function() {
    var deth_switch_factory = await dethSwitchFactory.deployed();
    let ownedContracts = await deth_switch_factory.getNumberOfHeirContracts();
    assert.equal(0,ownedContracts,"Did not return 0 heir contracts when heir is not recipient of any DS contract");
  });

  it("should return 1 owned contract from parent and 1 heir contract from heir after 1 deployment of DS contract", async function() {
    var deth_switch_factory = await dethSwitchFactory.deployed();
    let deth_contract_name = "DSContractOne";
    let heir_account_address = accounts[1];
    let expirationTime = 1;

    await deth_switch_factory.newDethSwitch(heir_account_address,deth_contract_name,expirationTime);

    let ownedContract = await deth_switch_factory.getNumberOfOwnedContracts();
    assert.equal(1,ownedContract,"getNumberOfOwnedContracts() did not return 1 owned contract");

    let heirContract = await deth_switch_factory.getNumberOfHeirContracts({from: heir_account_address});
    assert.equal(1,heirContract,"getNumberOfHeirContracts() did not return 1 heir contract");
  });

  it("should have matching DS contract address from parent and heir", async function() {
    var deth_switch_factory = await dethSwitchFactory.deployed();
    let deth_contract_name = "DSContractOne";
    let heir_account_address = accounts[1];
    let expirationTime = 1;

    await deth_switch_factory.newDethSwitch(heir_account_address,deth_contract_name,expirationTime);

    let ownedContract = await deth_switch_factory.getOwnedContracts(0);
    let heirContract = await deth_switch_factory.getHeirContracts(0, {from: heir_account_address});
    assert.equal(ownedContract,heirContract,"stored DS contract address in parent and heir does not match");
  });

  /*
  it("should successfully deploy multiple dethSwitch contracts from 1 parent", async function() {
    var deth_switch_factory = await dethSwitchFactory.deployed();

    var deth_contract_name_one = 'DSContractOne';
    var deth_contract_name_two = 'DSContractTwo';
    var deth_contract_name_three = 'DSContractThree';
    var heir_account_address_one = accounts[1];
    var heir_account_address_two = accounts[2];
    var heir_account_address_three = accounts[3];
    var expirationTime = 1;

    var deth_switch_contract_address = await deth_switch_factory.newDethSwitch.call(heir_account_address_one,deth_contract_name_one,expirationTime);
    assert.isDefined(deth_switch_contract_address, 'DSContractOne did not deploy successfully');
  });
  */
});
