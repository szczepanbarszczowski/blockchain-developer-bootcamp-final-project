import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import config from "../config";

const supportedNetworks = config.supportedChainIds;

function useIsValidNetwork() {
  const { chainId } = useWeb3React();

  const isValidNetwork = useMemo(() => {
    return supportedNetworks.includes(chainId);
  }, [chainId]);

  return {
    isValidNetwork,
  };
}

export default useIsValidNetwork;
