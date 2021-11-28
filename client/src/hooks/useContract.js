import { useMemo } from 'react';
import {
  Contract,
  constants,
  // ContractInterface
} from 'ethers';
import { useWeb3React } from '@web3-react/core';

export function useContract(contractAddress, ABI) {
  if (contractAddress === constants.AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  const { library, account } = useWeb3React();

  const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library;

  return useMemo(() => {
    return new Contract(contractAddress, ABI, signerOrProvider);
  }, [contractAddress, ABI, signerOrProvider]);
}
