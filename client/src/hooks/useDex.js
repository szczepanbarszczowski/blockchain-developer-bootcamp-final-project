import { useEffect } from 'react';
import { utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useContract } from './useContract';
import DEX_CONTRACT from '../contracts/DEX.json';
import useIsValidNetwork from '../hooks/useIsValidNetwork';
import { useAppContext } from '../AppContext';
import { toast } from 'react-toastify';
import useEth from "./useEth";
import {useBazookaToken} from "./useBazooka";

export const useDex = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const dexTokenContractAddress = '0xA8BccA67BD57d7835065Fcf069F440DeB5EE3474'; // ropsten
  const dexTokenContract = useContract(dexTokenContractAddress, DEX_CONTRACT.abi);
  const { setTxnStatus, bazookaTokenBalance, setLiquidityBalance, totalLiquidity } = useAppContext();
  const { fetchEthBalance } = useEth();
  const { fetchBazookaTokenBalance, fetchBazookaAddressBalance } = useBazookaToken();

  const fetchDexLiquidityBalance = async () => {
    const totalEthLiquidity = await dexTokenContract.totalLiquidity();
    const totalBzkLiquidity = await fetchBazookaAddressBalance(dexTokenContractAddress);
    setLiquidityBalance(utils.formatEther(totalEthLiquidity) + ' ETH - ' + utils.formatEther(totalBzkLiquidity) + ' BZK');
  }

  const refetchBalances = async () => {
    await Promise.all([
      fetchDexLiquidityBalance(),
      fetchEthBalance(),
      fetchBazookaTokenBalance()
    ])
  }

  const ethToBazooka = async (amount) => {
    let txn
    try {
      setTxnStatus('LOADING');
      txn = await dexTokenContract.ethToBazooka({
        from: account,
        value: utils.parseEther(amount),
      });
      await txn.wait(1);
      await refetchBalances();
      setTxnStatus('COMPLETE');
    } catch (error) {
      setTxnStatus('ERROR');
      toast(error?.data?.message);
    }
  };

  const bazookaToEth = async (amount) => {
    let txn
    try {
      setTxnStatus('LOADING');
      txn = await dexTokenContract.bazookaToEth(utils.parseEther(amount), {
        from: account,
      });
      await txn.wait(1);
      await refetchBalances();
      setTxnStatus('COMPLETE');
    } catch (error) {
      console.log(error)
      setTxnStatus('ERROR');
      toast(error?.data?.message);
    }
  };

  const init = async () => {
    let txn
    try {
      setTxnStatus('LOADING');
      txn = await dexTokenContract.init(utils.parseEther('50'), {
        from: account,
        value: utils.parseEther('10'),
      });
      await txn.wait(1);
      await refetchBalances();
      setTxnStatus('COMPLETE');
    } catch (error) {
      console.log(error)
      setTxnStatus('ERROR');
      toast(error?.data?.message);
    }
  };

  useEffect(() => {
    if (account) {}
  }, [account]);

  return {
    dexTokenContractAddress,
    totalLiquidity,
    bazookaTokenBalance,
    init,
    ethToBazooka,
    bazookaToEth,
    fetchDexLiquidityBalance,
  };
};
