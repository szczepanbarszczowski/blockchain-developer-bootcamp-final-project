import { InjectedConnector } from '@web3-react/injected-connector';
// import { NetworkConnector } from "@web3-react/network-connector";
import config from './config'

export const injected = new InjectedConnector({ supportedChainIds: config.supportedChainIds });

// 5777 is default chainId from ganache
// export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337, 5777] });

// export const network = new NetworkConnector({
//   urls: {
//     5777: 'http://localhost:8545',
//   },
//   defaultChainId: 1,
// });
