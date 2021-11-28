import React from 'react';
import styled from 'styled-components';
import ethLogo from '../assets/eth-logo.svg';
import Text from './Text';
import { colors } from '../theme';

const InputContainer = styled.div`
  border: 1px solid ${colors.green};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${colors.green};
    padding: 5px;
  }
`;

const EthLogo = styled.img.attrs({
  src: ethLogo,
})`
  height: 36px;
  width: 36px;
`;

const BzkLogo = styled.span`
  height: 36px;
  width: 36px;
`;

const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconMapping = {
  eth: (
    <IconWrapper>
      <EthLogo />
      <Text lineHeight="35px" color={colors.brown}>
        ETH
      </Text>
    </IconWrapper>
  ),
  bzk: (
    <IconWrapper>
      <BzkLogo role="img">
        🚀
      </BzkLogo>
      <Text lineHeight="35px" color={colors.brown}>
        BZK
      </Text>
    </IconWrapper>
  )
};

const BalanceInput = ({ balance, value, setValue, currency = 'default', title = 'From' }) => {
  return (
    <InputContainer>
      <HeaderInput>
        <Text color={colors.green}>{title}</Text>
        <Text color={colors.green}>Balance: {balance}</Text>
      </HeaderInput>
      <InputWrapper>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            if (setValue && e.target.value >= 0) {
              setValue(e.target.value);
            }
          }}
        />
        {IconMapping[currency.toLowerCase()]}
      </InputWrapper>
    </InputContainer>
  );
};

export default BalanceInput;
