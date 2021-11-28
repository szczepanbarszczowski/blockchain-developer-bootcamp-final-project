import { useContract } from './useContract';
import BAZOOKA_TOKEN from '../contracts/Bazooka.json';
import useIsValidNetwork from '../hooks/useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { utils } from 'ethers';
import {toast} from "react-toastify";

export const useBazookaToken = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const bazookaTokenContractAddress = '0x070797CAB363ba22caaa998201AEB6088517c00f'; // ropsten
  const bazookaTokenContract = useContract(bazookaTokenContractAddress, BAZOOKA_TOKEN.abi);
  const { setBazookaTokenBalance, setTxnStatus, bazookaTokenBalance } = useAppContext();

  const fetchBazookaTokenBalance = async () => {
    const bazookaTokenBalance = await bazookaTokenContract.balanceOf(account);
    setBazookaTokenBalance(utils.formatEther(bazookaTokenBalance));
  };

  const fetchBazookaAddressBalance = async (address) => {
    const bazookaTokenBalance = await bazookaTokenContract.balanceOf(address);
    return bazookaTokenBalance;
  }

  const approveBzk = async (address, amount) => {
    let txn
    try {
      setTxnStatus('LOADING');
      txn = await bazookaTokenContract.approve(address, utils.parseEther(amount), {
        from: account
      })
      await txn.wait(1);
      setTxnStatus('COMPLETE');
    } catch (error) {
      console.log(error)
      setTxnStatus('ERROR');
      toast(error?.data?.message);
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetchBazookaTokenBalance();
  //   }
  //   fetchData();
  // }, [account]);

  return {
    bazookaTokenBalance,
    approveBzk,
    fetchBazookaTokenBalance,
    fetchBazookaAddressBalance,
  };
};
