import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../assets/metamask-logo.svg';
import Text from './Text';
import { injected } from '../connectors';
import useWalletConnectionModal from '../hooks/useWalletConnectionModal';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const Modal = styled.div`

`;

const ModalHeader = styled.div`

`;

const ModalBody = styled.div`

`;


const ConnectWalletModal = () => {
  const { activate } = useWeb3React();
  const { setWalletConnectModal } = useWalletConnectionModal();

  return (
    <Modal show onHide={() => setWalletConnectModal(false)}>
      <ModalHeader>
        <MetamaskLogo />
        <Text uppercase color="green" t3 lineHeight="40px" className="mx-2">
          Connect your Metamask wallet
        </Text>
      </ModalHeader>
      <ModalBody>
        <Text block className="mb-5">
          You must connect a wallet to use this decentralized application
        </Text>
        <Button variant="outline-dark" onClick={() => activate(injected)}>
          Connect
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ConnectWalletModal;
