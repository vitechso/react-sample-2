import styled from 'styled-components';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { mixins, constants } from '@accordo-feed/aco-styled-components';
import MicrosoftSvg from 'src/images/microsoft.svg';
import { hexToRgb } from 'src/utils';

const { colors, fontSize } = constants;
const containerHeight = '80px';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${containerHeight};
  background-color: ${colors.white};
  margin-bottom: 3px;
`;

export const LeftContainer = styled.div`
  ${mixins.flexVerticalCenter()};
  padding-left: 45px;
  border-right: 1px solid ${colors.lightTintGrey};
`;

export const RightContainer = styled.div`
  flex-grow: 1;
  justify-content: space-between;
  position: relative;
  padding-right: 20px;
  ${mixins.flexVerticalCenter()};
`;

export const InfoContainer = styled.div`
  ${mixins.flexVerticalCenter()};
  max-width: 550px;
  padding-left: 20px;
  height: ${containerHeight};
  font-size: ${fontSize.small};
  color: ${colors.lightShadeGrey};
`;

export const ConnectButton = styled.button`
  ${mixins.size('145px', '40px')};
  background-color: ${props => (props.disabled ? `rgba(${hexToRgb(colors.blue)}, 0.5)` : colors.blue)};
  color: ${colors.white};
  font-size: ${fontSize.small};
  border-radius: 2px;
  border: 1px solid ${colors.blue};
  cursor: ${props => (props.disabled ? 'wait' : 'pointer')};
`;

export const DisconnectButton = styled.button`
  color: ${colors.blue};
  font-size: ${fontSize.small};
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 15px;
  margin-left: 5px;
`;

export const MicrosoftLogo = styled(MicrosoftSvg)`
  ${mixins.size('115px', 'auto')};
  border-right: 1px solid ${colors.darkGrey};
  padding-right: 10px;
  margin-right: 10px;
`;

export const MoreHorizIcon = styled(EllipsisOutlined)`
  box-sizing: initial;
  font-size: ${fontSize.xLarge};
  color: ${colors.darkGrey};
  border-radius: 2px;
  border: 1px solid ${colors.darkGrey};
  padding: 3px;
  &:hover,
  &:focus,
  &:active {
    border-color: ${colors.blue};
    color: ${colors.blue};
  }
`;

export const HeaderTitle = styled.span`
  font-size: ${fontSize.small};
  margin-right: 18px;
  color: ${colors.darkShadeGrey};
`;

export const DownIcon = styled(DownOutlined)`
  margin-left: 5px;
`;

export const StatusWrapper = styled.div`
  font-size: ${fontSize.xSmall};
  color: ${colors.darkShadeGrey};
  margin-right: 20px;
`;

export const StatusContainer = styled.div`
  ${mixins.flexVerticalCenter()};
`;

export const StatusIndicator = styled.span`
  display: inline-block;
  margin-right: 10px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${props => (props.connected ? 'green' : 'red')};
`;

export const LastUpdated = styled.span`
  margin-left: 15px;
`;

export const NumberOfCustomers = styled.span`
  color: ${colors.darkShadeGrey};
`;
