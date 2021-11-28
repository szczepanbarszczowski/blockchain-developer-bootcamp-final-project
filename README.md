# blockchain-developer-bootcamp-final-project
Blockchain Developer Bootcamp final project - Simple Decentralized Exchange

## About
The purpose of this project is to create simple decentralized exchange allowing users to swap ETH to Bazooka token and Bazooka token to ETH.
It contains two smartcontracts. One simply mints 10000 BZK tokens to the onwer of a smartcontract. Second one contains DEX logic. After deployment owner has to initialize the dex by calling `init` function on a smart contract. After initialization users can swap between ETH and BZK. If you want to swap BZK to ETH you have to first approve the DEX to swap BZK tokens. 

Project is hosted under this url: https://bazooka-dex.surge.sh/
Please use Ropsten network to interact with the dapp.

### Public eth address
For NFT certification: 0x7EB34fE363841feaE6fcb2De6865dAE8B518eFfe

### Youtube showcase
https://youtu.be/oPEAHi0a0Zc

## Example workflow

1. User identifies himself with Metamask wallet
2. User chooses token pair to echange with
3. Users submits exchange intent and allows for swap in Metamask
4. After successfull swap user gets confirmation message and balances are updated

## Prerequisites

- Node v16.13.0

- Yarn 1.22.5

## Directory Structure
The root directory of the project contains the following sub-directories:
```
src
|
+-- client            # folder containing frontend application
|
+-- contracts         # contains all the solidity code
|
+-- migrations        # contains the migration script for deploying solidity contracts to the blockchain
|
+-- node_modules      # contains all smart contract dependencies
|
+-- test              # contains the smart contract unit tests (written in javascript)
```


## Installation

1) First install all the dependencies by executing this command - `yarn`. It should create `node_modules` folder in main folder of an application with all necessary dependencies.


### Testing 
To test run ganache locally on port `8545` with `ganache-cli` and then run `truffle test`. Make sure you have at least 100 eth in ganache first account and more than 10 eth in second account. It is required to run tests properly.


## Frontend app
Frontend application is copied from this repo: https://github.com/ConsenSys/hackathon-2021-dapp-workshop
It is a React app which interacts with ethereum via web3-react library.

### Requirements
You have to have truffle chain set up and running. After truffle migration get the addresses of the contracts and paste them into this files:
`client/src/hooks/useBazooka.js` at line `12` and
`client/src/hooks/useDex.js` at line `15`.

### Installation
Go to `/client` folder and install all the dependencies with this command `yarn`.

### Development
 
To start the dev server: `yarn start`.
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.






