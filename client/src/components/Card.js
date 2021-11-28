import styled from 'styled-components';
import { colors } from '../theme';

const Card = styled.div`
  max-width: 500px;
  background-color: #000;
  width: 100%;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px,
    rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 15px;
  border-color: ${colors.green};
  padding: 20px;
`;

export default Card;
