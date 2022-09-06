import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';

const { colors } = constants;

export const PriorityBadge = styled.div`
  border-radius: 12px;
  width: 87px;
  color: ${colors.white};
  padding: 2px 4px;
  text-align: center;
  background-color: ${props =>
    ({
      high: '#F04B4B',
      medium: '#FF9B05',
      low: '#0189D6'
    }[props.priority])};
`;
