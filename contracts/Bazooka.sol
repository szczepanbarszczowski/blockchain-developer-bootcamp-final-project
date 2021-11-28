//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bazooka is ERC20 {
    /* 🚀 */
    constructor() public ERC20("Bazooka", "BZK") {
		// Ropsten address https://ropsten.etherscan.io/address/0x070797CAB363ba22caaa998201AEB6088517c00f
        _mint(msg.sender, 1000 * (10**18));
    }
}
