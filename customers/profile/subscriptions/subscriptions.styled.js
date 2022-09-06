import styled from 'styled-components';
import { WarningOutlined } from '@ant-design/icons';
import { constants } from '@accordo-feed/aco-styled-components';
import { tableEvenRowBackground } from 'src/App.styled';

const { colors, fontSize } = constants;

export const Container = styled.div`
  display: flex;
  padding: 15px;
`;

export const DisplayWidget = styled.div`
  width: 200px;
  min-width: 200px;
  margin-left: 15px;
  padding: 15px;
  border-radius: 15px;
  background-color: ${tableEvenRowBackground};
`;

export const DisplaySelection = styled.div`
  padding: 10px;
`;

export const DisplayTitle = styled.p`
  margin: 0;
  color: ${colors.darkCyan};
`;

export const SubscriptionType = styled.span`
  color: ${colors.darkCyan};
`;

export const RenewalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Renewal = styled.span`
  font-size: ${fontSize.small};
  color: ${props => (props.enabled ? colors.lightGreen : colors.alertRed)};
`;

export const AttentionIcon = styled(WarningOutlined)`
  padding-left: 5px;
  font-size: 16px;
  color: ${colors.alertRed};
`;

export const TermBalance = styled.span`
  color: ${props => (props.enabled ? colors.darkOrangeColor : '')};
`;
