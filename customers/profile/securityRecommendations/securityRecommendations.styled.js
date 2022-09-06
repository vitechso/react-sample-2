import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';
import { STATUS, IMPACT } from './securityRecommendations.constants';
import { hexToRgb } from 'src/utils';

const { colors } = constants;

export const StatusBadge = styled.div`
  border-radius: 20px;
  color: ${colors.white};
  text-align: center;
  padding: 1px 15px;
  display: inline-block;
  border: 1px solid ${props => (props.type === STATUS.COMPLETED ? colors.lightGreen : colors.aquaRed)};
  background-color: ${props =>
    props.type === STATUS.COMPLETED
      ? `rgba(${hexToRgb(colors.lightGreen)}, 0.49)`
      : `rgba(${hexToRgb(colors.aquaRed)}, 0.6)`};
`;

export const ImpactBadge = styled.div`
  min-width: 80px;
  border-radius: 20px;
  color: ${colors.white};
  padding: 2px 15px;
  display: inline-block;
  text-align: center;
  background-color: ${props =>
    ({
      [IMPACT.HIGH]: colors.alertRed,
      [IMPACT.MODERATE]: colors.alertYellow,
      [IMPACT.LOW]: colors.alertBlue
    }[props.impact])};
`;
