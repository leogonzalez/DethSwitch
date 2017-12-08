var ERC20 = artifacts.require("./AnyERC20Token.sol")

contract('events', function(accounts) {
  it("should watch for events", function() {
    var contract_instance;

    var acc1 = accounts[0];
    var acc2 = 0xd7b36df1281787fa48d70113f7eeeb580e2b010b;
    ERC20.deployed().then((instance) => {
      contract_instance = instance;
      // console.log(acc1);
      // console.log(acc2);
      var events = instance.Transfer();
      events.watch((err,res) => {
        console.log(res.args);
        events.stopWatching();
      });


    contract_instance.transfer(acc2,2);

    });

  });
});
