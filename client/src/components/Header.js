import React from 'react';
import styled from 'styled-components';
import MetamaskConnectButton from './MetamaskConnectButton';
import BalancesCard from './BalancesCard';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const Header = () => (
  <Navbar>
    <BalancesCard />
    <MetamaskConnectButton />
  </Navbar>
);

export default Header;
