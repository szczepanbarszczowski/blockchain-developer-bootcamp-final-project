import React, { useEffect } from 'react';
import Text from './Text';
import Card from './Card';
import { colors } from '../theme';
import { useWeb3React } from '@web3-react/core';
import useEth from '../hooks/useEth';
import { useBazookaToken } from '../hooks/useBazooka';
import { useAppContext } from '../AppContext';
import {useDex} from "../hooks/useDex";

const BalanceCard = () => {
  const { account } = useWeb3React();
  const { fetchEthBalance, ethBalance } = useEth();
  const { fetchBazookaTokenBalance, bazookaTokenBalance } = useBazookaToken();
  const { fetchDexLiquidityBalance, totalLiquidity } = useDex();

  useEffect(() => {
    if (account) {
      fetchEthBalance().then();
      fetchBazookaTokenBalance().then();
      fetchDexLiquidityBalance().then();
    }
  }, [account]);

  return (
    <Card style={{ maxWidth: 300 }}>
      <Text block color={colors.green}>
        ETH balance: {ethBalance}
      </Text>
      <Text block color={colors.green}>
        BZK balance: {bazookaTokenBalance}
      </Text>
      {/*<Text block color={colors.green}>*/}
      {/*  Total DEX liquidity: {totalLiquidity}*/}
      {/*</Text>*/}
    </Card>
  );
};

export default BalanceCard;
