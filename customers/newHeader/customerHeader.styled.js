import styled from 'styled-components';
import { mixins, constants } from '@accordo-feed/aco-styled-components';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import MicrosoftSvg from 'src/images/microsoft.svg';
import SyncIcon from 'src/images/syncIcon.svg';
import { hexToRgb } from 'src/utils';

const { colors, fontSize } = constants;
const containerHeight = '80px';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.white};
  margin-bottom: 3px;
  padding: 8px 24px;
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

export const HighlightWrapper = styled.div`
  padding: 25px 0;
  display: flex;
  position: relative;
  width: 80%;
  background: linear-gradient(93.27deg, ${colors.skyBlue} 25.91%, ${colors.skyBlue2} 85.11%);
  box-shadow: 0 4px 9px rgba(${hexToRgb(colors.darkGrey1)}, 0.4);
  border-radius: 7px;
  flex-basis: 45%;
`;

export const NumberBox = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:nth-last-child(n + 2) {
    border-right: 1px solid ${colors.lightTintGrey};
  }

  label {
    color: ${colors.white};
    font-size: 12px;
  }
  span {
    color: ${colors.white};
    font-size: 45px;
    line-height: 45px;
    font-weight: 600;
  }
`;

export const CardTitle = styled.div`
  color: ${colors.white};
  font-size: 12px;
  position: absolute;
  top: 5px;
  left: 12px;
`;

export const VendorCardsWrapper = styled.div`
  display: flex;
  flex-basis: 50%;
`;

export const VendorCard = styled.div`
  box-shadow: 0 4px 9px rgba(${hexToRgb(colors.darkGrey1)}, 0.4);
  border-radius: 8px;
  width: 242px;
  padding: 10px;
  margin-right: 8px;
`;

export const SyncIconSvg = styled(SyncIcon)``;

export const SyncButton = styled.button`
  height: 27px;
  width: 86px;
  border: 1.5px solid ${colors.darkIndigo};
  border-radius: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  position: relative;

  & > span {
    font-size: 11px;
    margin-right: 4px;
  }

  & > ${SyncIconSvg} {
    position: absolute;
    right: 4px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 24px 0;
  height: 80px;
`;

export const LogoText = styled.div`
  display: flex;
  color: ${colors.grey};
`;

export const VendorHelperText = styled.div`
  font-size: 10px;
  margin-right: 8px;
  flex-basis: 60%;
`;
