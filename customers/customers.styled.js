import styled, { css } from 'styled-components';
import { Link } from 'react-router';
import { Statistic, Button } from 'antd';
import {
  CheckCircleOutlined,
  EllipsisOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  WarningFilled,
  PlusCircleFilled,
  EditOutlined
} from '@ant-design/icons';
import { mixins, constants } from '@accordo-feed/aco-styled-components';

import Search from 'src/components/search';
import UIButton from 'src/components/UI/button';
import { SectionWrapper } from 'src/pages/page.styled';
import { hexToRgb } from 'src/utils';
import { appTextColor } from 'src/App.styled';
import { CONNECTION_STATES } from './customers.constants';

const headerItemHeight = '40px';
const { Countdown: AntCountdown } = Statistic;
const { colors, fontSize, zIndex } = constants;

const transparentMixin = `
  background-color: transparent;
  border-color: transparent;
`;

export const ButtonEdit = styled(Button)`
  display: flex;
  justify-content: center;
  box-shadow: none;
  width: 32px;

  &,
  :hover,
  :focus,
  &[disabled],
  :hover[disabled] {
    ${transparentMixin}
  }
`;

export const IconEdit = styled(EditOutlined)`
  font-size: 16px;
  color: ${colors.lightGrey};
`;

export const ButtonLinkConnection = styled(UIButton)`
  font-size: 12px;
  padding: 0 8px;
  white-space: nowrap;
  background-color: transparent;
  min-width: 110px;
`;

export const SVGButtonOptimizer = styled(ButtonLinkConnection)`
  color: ${colors.black};
  min-width: 80px;
`;

export const ButtonReProcess = styled(ButtonLinkConnection)`
  color: ${colors.red};
`;

export const IconWrapper = styled.span`
  ${mixins.flexVerticalCenter()};
  margin-left: 20px;
  padding: 5px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 50%;
  background-color: ${colors.white};

  svg {
    fill: ${colors.red};
  }
`;

export const ConnectionLinkWrapper = styled.div`
  a {
    width: fit-content;
    text-decoration: none;
    ${mixins.flexVerticalCenter()};
  }
`;

export const SpanCusQty = styled.span`
  color: ${colors.darkGrey};
  font-size: ${fontSize.xSmall};
  margin-left: 10px;
`;

export const ButtonAddCus = styled(UIButton)`
  min-width: 168px;
  height: 40px;
`;

export const SearchBoxWrapper = styled.div`
  width: 300px;
  margin-left: auto;
  input {
    height: ${headerItemHeight};
    border-radius: 0;
  }
`;

export const HeadWrapper = styled.div`
  ${mixins.flexVerticalCenter()};
  margin: 20px 0;
  padding: 0 20px;
  justify-content: space-between;
`;

export const StatusSpan = styled.span`
  color: ${props =>
    [
      CONNECTION_STATES.DENIED,
      CONNECTION_STATES.AUTH_FAILED,
      CONNECTION_STATES.PROCESS_FAILED,
      CONNECTION_STATES.NEEDS_PERMISSIONS
    ].includes(props.state)
      ? colors.red
      : colors.black};
  opacity: ${props => props.opacity};
  margin-right: 10px;
`;

export const RowHightlight = styled.div`
  position: absolute;
  top: 0;
  bottom: -1px; /* account for border width */
  left: 0;
  width: 3px;
  background-color: ${colors.blue};
`;

export const CustomerNameSpan = styled(Link)`
  opacity: ${props => props.opacity};
`;

export const LastRefreshedSpan = styled.span`
  color: ${props => (props.recent ? 'inherit' : colors.red)};
`;

export const ConnectionTypeSpan = styled.span`
  ${mixins.flexVerticalCenter()};
`;

export const ClockIconWrapper = styled.div`
  ${mixins.flexCenter()};
  ${mixins.size('30px', '30px')};
  background-color: ${colors.white};
  border-radius: 50%;
  border: 1px solid ${colors.lightGrey};
  margin-right: 10px;
`;

export const Countdown = styled(AntCountdown)`
  .ant-statistic-content {
    font-size: 14px;
  }
`;

export const WarningIcon = styled(WarningFilled).attrs({
  style: { color: colors.yellow, fontSize: '30px' }
})`
  margin-right: 10px;
`;

export const FastActivationHoverIcon = styled(CheckCircleOutlined).attrs({
  style: { color: colors.lightBlue, fontSize: '25px' }
})`
  margin-right: 10px;
`;

export const WarningWrapper = styled.div`
  ${mixins.flexVerticalCenter()};
`;

export const ActiveConnectionsCount = styled.span`
  font-size: ${fontSize.small};
  color: ${colors.black};

  span {
    color: ${colors.darkGrey};
  }
`;

export const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    margin: 0 20px;
  }
`;

export const StyledSearch = styled(Search)`
  margin-bottom: 10px !important;
`;

export const FilterWrapper = styled.div`
  display: flex;

  > div:first-child {
    margin-right: 20px;
  }
`;

export const FilterGroups = styled.div`
  .ant-checkbox-group {
    .ant-checkbox-group-item {
      min-width: 100px;
      margin-bottom: 0;
    }
  }
`;

export const FilterTitle = styled.p`
  color: ${appTextColor};
  margin: 0;
`;

export const CustomerSectionWrapper = styled(SectionWrapper)`
  padding: 0 24px;
  height: 100%;
  ${({ isBulkEditView }) =>
    isBulkEditView &&
    css`
      z-index: ${zIndex + 4};
      position: relative;
    `}
`;

export const SectionHeaderWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: max-content;
  max-width: max-content;
  height: 27px;
  padding: 0 6px 0 15px;
  border: 1.5px solid ${colors.lightGreen};
  box-sizing: border-box;
  border-radius: 21px;
  font-size: ${fontSize.xxSmall};
  color: ${colors.lightGreen};
  cursor: pointer;
`;

export const IconAddComp = styled(PlusCircleFilled)`
  font-size: 14px;
  color: ${colors.lightGreen};
  margin-left: 8px;
`;

export const ConnectionStatus = styled.div`
  color: ${colors.white};
  font-size: ${fontSize.small};
  line-height: 21px;
  text-transform: capitalize;
  width: 95px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: 1px solid ${props => (props.active ? colors.lightGreen : colors.aquaRed)};
  background-color: ${props =>
    props.active ? `rgba(${hexToRgb(colors.lightGreen)}, 0.49)` : `rgba(${hexToRgb(colors.aquaRed)}, 0.6)`};
`;

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const MoreHorizIcon = styled(EllipsisOutlined)`
  font-size: ${fontSize.xLarge};
  color: ${colors.darkGrey};
  padding: 3px;
  margin-left: 30px;
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    color: ${colors.blue};
  }
`;

export const LoadingIcon = styled(LoadingOutlined)`
  margin-left: 7px;
  color: ${colors.blue};
`;

export const PDFFileIcon = styled(FilePdfOutlined)`
  margin-left: 7px;
  color: ${colors.blue};
`;
