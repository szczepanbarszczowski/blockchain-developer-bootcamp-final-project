import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useWeb3React} from "@web3-react/core";
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import {colors} from '../theme';
import Switch from '../assets/switch.svg';
import {useBazookaToken} from '../hooks/useBazooka';
import {useDex} from '../hooks/useDex';
import useEth from '../hooks/useEth';
import useTransaction from '../hooks/useTransaction';
import Input from "../components/Input";
import useWalletConnectionModal from '../hooks/useWalletConnectionModal';
import ConnectWalletModal from "../components/ConnectWalletModal";
import useIsValidNetwork from "../hooks/useIsValidNetwork";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
`;

const Home = () => {
  const {isValidNetwork} = useIsValidNetwork();
  const [ethAmount, setEthAmount] = useState(0);
  const [bzkAmount, setBzkAmount] = useState(0);
  const [ethToBzk, switchAssets] = useState(true);
  const {bazookaTokenBalance, approveBzk} = useBazookaToken();
  const {active} = useWeb3React();
  const {ethBalance} = useEth();
  const {ethToBazooka, bazookaToEth, init, dexTokenContractAddress} = useDex();
  const {txnStatus, setTxnStatus} = useTransaction();
  const {isWalletConnectModalOpen} = useWalletConnectionModal();

  const handleSubmit = async () => {
    if (ethToBzk) {
      await ethToBazooka(ethAmount);
    } else {
      await bazookaToEth(bzkAmount);
    }
  };

  useEffect(() => {
    setBzkAmount(0);
    setEthAmount(0);
  }, [ethToBzk]);

  if (!isValidNetwork) {
    return (
      <Container show>
        <Card style={{
          maxWidth: 420,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ textAlign: 'center' }}>
            This app is working only on Ropsten. Please change your network to Ropsten and connect to Metamask.
          </Text>
        </Card>
      </Container>
    )
  }

  if (txnStatus === 'LOADING') {
    return (
      <Container show>
        <Card style={{
          maxWidth: 420,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="spin" />
        </Card>
      </Container>
    );
  }

  if (txnStatus === 'COMPLETE') {
    return (
      <Container show>
        <Card style={{maxWidth: 420, minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text block center className="mb-5">
            Txn Was successful!
          </Text>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')}>Go Back</Button>
        </Card>
      </Container>
    );
  }

  if (txnStatus === 'ERROR') {
    return (
      <Container show>
        <Card style={{maxWidth: 420, minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text>Txn ERROR</Text>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')}>Go Back</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container show>
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      <Card style={{maxWidth: 420, minHeight: 400}}>
        <Text block t2 color={colors.green} className="mb-3">
          Swap
        </Text>

        {ethToBzk
          ? <Input setValue={setEthAmount} value={ethAmount} title={ethToBzk ? "From" : "To"} currency='eth'
                   balance={ethBalance} />
          : <Input setValue={setBzkAmount} value={bzkAmount} title={ethToBzk ? "To" : "From"} currency='bzk'
                   balance={bazookaTokenBalance} />
        }

        <div className="App-switch" onClick={() => switchAssets(!ethToBzk)}>
          <img className="App-switch-image" width={20} height={20} src={Switch} alt="Switch icon" />
        </div>

        {ethToBzk
          ? <Input setValue={setBzkAmount} value={bzkAmount} title={ethToBzk ? "To" : "From"} currency='bzk'
                   balance={bazookaTokenBalance} />
          : <Input setValue={setEthAmount} value={ethAmount} title={ethToBzk ? "From" : "To"} currency='eth'
                   balance={ethBalance} />
        }

        {
          !ethToBzk && (
            <Button onClick={() => approveBzk(dexTokenContractAddress, '100')} style={{marginBottom: 10, width: '100%'}}>
              Approve BZK
            </Button>
          )
        }

        <Button disabled={!active || (ethToBzk ? ethAmount <= 0 : bzkAmount <= 0)} onClick={handleSubmit}
                style={{width: '100%'}}>
          Swap {ethToBzk ? ethAmount : bzkAmount} {ethToBzk ? 'ETH' : 'BZK'}
        </Button>
      </Card>

      {/*<Card>*/}
      {/*  <Button onClick={init}>*/}
      {/*    Init*/}
      {/*  </Button>*/}
      {/*</Card>*/}
    </Container>
  );
};

export default Home;
