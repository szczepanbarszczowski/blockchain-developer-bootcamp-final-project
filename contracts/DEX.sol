//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Importing ERC20 interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
/// Import Ownable contract to extend Dex contract functionality to have ownership management
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title Simple Decentralized Exchange smart contract
/// @author Szczepan Barszczowski
/// @notice This contract gives you ability to trade between Eth and Bazooka coins
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract

contract DEX is Ownable {
    using SafeMath for uint256;

    IERC20 bazookas;

    uint256 public totalLiquidity;
    mapping (address => uint256) public liquidity;

    // EVENTS
    event Initialization(address indexed _from, uint256 _value, uint256 _tokens);
    event EthToBzkSwap(address indexed _from, uint256 _tokens_bought);
    event BzkToEthSwap(address indexed _from, uint256 _eth_bought);
    event DepositLiquidity(address indexed _from, uint256 _liquidity_minted);
    event WithdrawLiquidity(address indexed _from, uint256 _eth_withdrawn, uint _token_withdrawn);

    // Checks if dex is already initialized with liquidity.
    modifier checkIfInitialized {
      require(totalLiquidity > 0, "DEX is not initialized");
      _;
    }

    constructor(address tokenAddress) public {
      bazookas = IERC20(tokenAddress);
    }

    /// @notice Initializes DEX with liquidity
    /// @dev User should have BZX tokens to properly initialize exchange. Tokens may be acquired from a faucet
    /// @param tokens, Number of BZK tokens to initialize dex with
    /// @return Returns total liquidity of a contract
    function init(uint256 tokens) public payable onlyOwner returns (uint256) {
      require(totalLiquidity == 0, "DEX is already initialized");
      totalLiquidity = msg.value;
      liquidity[msg.sender] = totalLiquidity;
      require(bazookas.transferFrom(msg.sender, address(this), tokens));
      emit Initialization(msg.sender, msg.value, tokens);
      return totalLiquidity;
    }

    /// @notice Calculates price of a pair based on current reserve
    /// @dev This formula x * y = k is used to maintain 1:1 ratio between token pair
    /// @param input_amount, amount of input asset
    /// @param input_reserve, amount of input reserve
    /// @param output_reserve, amount of output reserve
    /// @return Price of an asset
    function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public pure returns (uint256) {
      uint256 input_amount_with_fee = input_amount.mul(997);
      uint256 numerator = input_amount_with_fee.mul(output_reserve);
      uint256 denominator = input_reserve.mul(1000).add(input_amount_with_fee);
      return numerator / denominator;
    }

    /// @notice Change ETH for BZK
    /// @return Amount of tokens swapped.
    function ethToBazooka() public payable checkIfInitialized returns (uint256) {
      uint256 token_reserve = bazookas.balanceOf(address(this));
      uint256 tokens_bought = price(msg.value, address(this).balance.sub(msg.value), token_reserve);
      require(bazookas.transfer(msg.sender, tokens_bought));
      emit EthToBzkSwap(msg.sender, tokens_bought);
      return tokens_bought;
    }

    /// @notice Change BZK for ETH
    /// @return Amount of tokens swapped.
    function bazookaToEth(uint256 tokens) public checkIfInitialized returns (uint256) {
      uint256 token_reserve = bazookas.balanceOf(address(this));
      uint256 eth_bought = price(tokens, token_reserve, address(this).balance);
      payable(msg.sender).transfer(eth_bought);
      require(bazookas.transferFrom(msg.sender, address(this), tokens));
      emit BzkToEthSwap(msg.sender, eth_bought);
      return eth_bought;
    }

    /// @notice Lets you deposit liquidity to an exchange
    /// @return Returns amount of liquidity minted from this operation
    function depositLiquidity() public payable checkIfInitialized returns (uint256) {
      uint256 eth_reserve = address(this).balance.sub(msg.value);
      uint256 token_reserve = bazookas.balanceOf(address(this));
      uint256 token_amount = (msg.value.mul(token_reserve) / eth_reserve).add(1);
      uint256 liquidity_minted = msg.value.mul(totalLiquidity) / eth_reserve;
      liquidity[msg.sender] = liquidity[msg.sender].add(liquidity_minted);
      totalLiquidity = totalLiquidity.add(liquidity_minted);
      require(bazookas.transferFrom(msg.sender, address(this), token_amount));
      emit DepositLiquidity(msg.sender, liquidity_minted);
      return liquidity_minted;
    }

    /// @notice Lets you withdraw liquidity from a contract
    /// @dev The actual amount of ETH and tokens a liquidity provider withdraws will be higher than what they deposited because of the 0.3% fees collected from each trade
    /// @return Amount of ETH withdrawn and BZX withdrawn
    function withdrawLiquidity(uint256 amount) public checkIfInitialized returns (uint256, uint256) {
      uint256 token_reserve = bazookas.balanceOf(address(this));
      uint256 eth_amount = amount.mul(address(this).balance) / totalLiquidity;
      uint256 token_amount = amount.mul(token_reserve) / totalLiquidity;
      liquidity[msg.sender] = liquidity[msg.sender].sub(eth_amount);
      totalLiquidity = totalLiquidity.sub(eth_amount);
      payable(msg.sender).transfer(eth_amount);
      require(bazookas.transfer(msg.sender, token_amount));
      emit WithdrawLiquidity(msg.sender, eth_amount, token_amount);
      return (eth_amount, token_amount);
    }
}
