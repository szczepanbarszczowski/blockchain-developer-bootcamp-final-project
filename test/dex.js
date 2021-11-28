const DEX = artifacts.require("./DEX.sol");
const Bazooka = artifacts.require("./Bazooka.sol");
const { ethers } = require("ethers");

contract("DEX", accounts => {
  let dex;
  let bazooka;
  const acc1 = accounts[0];
  const acc2 = accounts[1];

  before(async () => {
    bazooka = await Bazooka.deployed();
    dex = await DEX.deployed(bazooka.address);
    await bazooka.approve(dex.address, String(100 * (10**18))); // Approve 100 tokens
  });

  // Checks if contract is deployed properly
  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await dex.address

      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
    })
  })

  // Checks if contract can be initialized by owner
  describe("initializing a dex", async () => {
    it("should initialize dex properly", async () => {
      const bazookaBalanceBeforeInit = String(await bazooka.balanceOf(acc1));
      const ethBalanceBeforeInit = await web3.eth.getBalance(acc1);
      const initAmount = String(50 * (10**18)); // 50 tokens
      await dex.init(initAmount, { from: acc1, value: initAmount }); // Initialize with 50 bazooka and 50 ETH
      const bazookaBalanceAfterInit = String(await bazooka.balanceOf(acc1));
      const ethBalanceAfterInit = await web3.eth.getBalance(acc1);
      const ethValueAfterInit = web3.utils.fromWei(ethBalanceAfterInit, 'ether');
      const ethValueBeforeInitMinusInitAmount = web3.utils.fromWei(String(BigInt(ethBalanceBeforeInit) - BigInt(initAmount)), 'ether');

      assert.equal(bazookaBalanceAfterInit, bazookaBalanceBeforeInit - initAmount, "Dex not initialized with Bazooka properly");
      assert.equal(Math.floor(ethValueAfterInit), Math.floor(ethValueBeforeInitMinusInitAmount), "Dex not initialized with Eth properly");
    });
  });

  describe("using a dex", async () => {
    // Checks if price of an asset is properly calculated
    it("should properly calculate price", async () => {
      const inputAmount = 10;
      const inputReserve = 100;
      const outputReserve = 100;
      const price = await dex.price(
        String(inputAmount*10**18),
        String(inputReserve*10**18),
        String(outputReserve*10**18)
      );
      const inputAmountWithFee = 10 * 0.997;
      const numerator = inputAmountWithFee * outputReserve;
      const denominator = (inputReserve * 1.000) + inputAmountWithFee;
      const calculatedPrice = String(numerator / denominator);

      // Slice the string to 15 significant digits
      assert.equal(
        String(price).slice(0, 15), // Cast to string and compare first  15 significant numbers
        String(calculatedPrice).replace('.', '').slice(0, 15), // Cast to string, remove dot for comparison and compare first  15 significant numbers
        "Price not calculated properly"
      );
    });

    // Checks if swapping eth to bzk is working properly
    it("should exchange eth to bazooka", async () => {
      const tenEth = String(10 * (10 ** 18));
      await dex.ethToBazooka({ from: acc2, value: tenEth });
      const bazookaBalanceAfterSwap = await bazooka.balanceOf(acc2);

      assert.notEqual(String(bazookaBalanceAfterSwap), 0, 'Bazooka balance should be more than 0');
    });

    // Checks if swapping bzk to eth is working properly
    it("should exchange bazooka to eth", async () => {
      const bazookaBalanceBeforeSwap = String(await bazooka.balanceOf(acc1));
      const tenBazooka = String(10 * (10 ** 18));
      await dex.bazookaToEth(tenBazooka, { from: acc1 });
      const bazookaBalanceAfterSwap = await bazooka.balanceOf(acc1);

      assert.notEqual(String(bazookaBalanceBeforeSwap), String(bazookaBalanceAfterSwap), 'Bazooka balance should be different');
      assert.equal(bazookaBalanceAfterSwap, '940000000000000000000', "Balance should be exactly 940000000000000000000");
    });

    // TODO: Add deposit test
    // it("should deposit liquidity", async () => {
    //
    // });

    // TODO: Add withdraw test
    // it("should withdraw liquidity", async () => {
    //
    // });
  });
});
