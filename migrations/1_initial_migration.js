var Migrations = artifacts.require("Migrations.sol");
var Bazooka = artifacts.require("Bazooka.sol");
var DEX = artifacts.require("DEX.sol");

module.exports = async function(deployer) {
  try {
    await deployer.deploy(Migrations);
    const bazooka = await deployer.deploy(Bazooka);

    if (!bazooka.address) throw new Error("There is no bazooka contract address passed to dex contract")
    await deployer.deploy(DEX, bazooka.address);
  } catch (e) {
    console.error(e)
  }
};
