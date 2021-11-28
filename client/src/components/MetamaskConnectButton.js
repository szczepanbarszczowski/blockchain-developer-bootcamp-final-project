import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../assets/metamask-logo.svg';
import Text from './Text';
import Card from './Card';
import Button from './Button';
import { injected } from '../connectors';
import { shortenAddress } from '../utils/shortenAddress';

// const Button = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: red;
// `;

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const MetamaskConnectButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();

  if (active) {
    return (
      <Card style={{ width: 350, display: 'flex' }}>
        <MetamaskLogo />
        <Text uppercase color="green" t3 lineHeight="40px"  style={{ marginLeft: 10, marginRight: 10 }}>
          {shortenAddress(account)}
        </Text>
        <Button onClick={deactivate}>Log Out</Button>
      </Card>
    );
  }

  return (
    <Card style={{ width: 350, display: 'flex' }}>
      <MetamaskLogo />
      <Text uppercase color="green" t3 lineHeight="40px" style={{ marginLeft: 10, marginRight: 10 }}>
        Metamask
      </Text>
      <Button onClick={() => activate(injected)}>Connect</Button>
    </Card>
  );
};

export default MetamaskConnectButton;
