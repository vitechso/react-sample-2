import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';
import { widgetBorderColor, subHeaderTextColor } from 'src/App.styled';

const { fontSize } = constants;

export const Wrapper = styled.div`
  padding: 10px 20px;
`;

export const NumberBox = styled.div`
  display: flex;
  flex-direction: column;
  border-color: ${widgetBorderColor};
  text-align: center;
`;

export const NumberLabel = styled.span`
  color: ${props => (props.theme === 'light' ? '#374151' : '#61ABDC')};
  font-size: 25px;
  line-height: 2.5rem;
  font-weight: bold;
`;

export const Text = styled.span`
  color: ${subHeaderTextColor} !important;
  font-size: ${fontSize.xSmall};
  line-height: 100%;
`;
