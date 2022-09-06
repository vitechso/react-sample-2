import styled, { css } from 'styled-components';
import { Collapse, Drawer as AntDrawer, Input as AntInput, Modal } from 'antd';
import { Link } from 'react-router';
import { mixins, constants } from '@accordo-feed/aco-styled-components';

import CountryPickerComponent from 'src/components/countryPicker';
import Dropdown from 'src/components/dropdown';
import UIButton from 'src/components/UI/button';
import { headerHeight } from 'src/components/appHeader/appHeader.styled';
import {
  appTextColor,
  bodyBackground,
  tableHeaderTextColor,
  tableRowBorderColor,
  widgetBackground,
  widgetBorderColor,
  modalBackgroundColor
} from 'src/App.styled';
import AzureSvg from 'src/images/azure.svg';
import O365Svg from 'src/images/office365.svg';
import { hexToRgb } from 'src/utils';

const labelWidth = 80;
const { colors, fontSize } = constants;

const commonActionBtnStyles = `
  ${mixins.flexCenter()};
  border: 1px solid ${colors.darkGrey};
  margin-bottom: 20px;
  text-align: center;
  height: 40px;
  cursor: pointer;
  color: ${colors.black};
`;

export const Drawer = styled(AntDrawer)`
  top: ${headerHeight};
  bottom: 20px;
  .ant-collapse {
    padding: 10px 16px;
  }

  .ant-drawer- {
    &content-wrapper {
      height: calc(100% - ${headerHeight});
    }

    &content {
      background: ${widgetBackground};
      background-color: ${bodyBackground};
    }

    &header {
      background: transparent;
      border-bottom: 1px solid ${tableRowBorderColor};
      .ant-drawer-close {
        .anticon-close {
          color: ${appTextColor};
        }
      }
    }

    &title {
      color: ${appTextColor};
      font-size: ${fontSize.large};
      font-weight: normal;
    }

    &body {
      padding: 20px;
    }
  }
`;

export const Title = styled.h2`
  color: ${appTextColor};
  font-size: ${fontSize.small};
  margin-bottom: 20px;
`;

export const Description = styled.div`
  color: ${appTextColor};
`;

export const FormRow = styled.div`
  margin-bottom: 20px;

  > span {
    position: relative;
    left: ${labelWidth}px;
    width: calc(100% - ${labelWidth}px);
  }
`;

export const DetailsItem = styled.div`
  ${mixins.flexVerticalCenter()};
  margin-bottom: ${props => `${props.bottom ?? 0}px`};
`;

export const DetailsList = styled.div`
  ${/* sc-selector */ DetailsItem}:last-child {
    margin-bottom: 0;
  }
`;

export const DetailsLabel = styled.label`
  width: ${labelWidth}px;
  color: ${appTextColor};
  font-size: ${props => (props.size === 'small' ? fontSize.xxSmall : fontSize.small)};
`;

export const Input = styled(AntInput)`
  flex: 1;
  color: ${appTextColor};
  border: 1px solid ${colors.darkGrey6};
  border-radius: 7px;
  background-color: rgba(${hexToRgb(colors.lightGrey7)}, 0.24);
  &:focus,
  &:hover {
    border-color: ${colors.darkGrey6};
  }
`;

export const Line = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${colors.lightGrey};
`;

export const StyledDropdown = styled(Dropdown).attrs({
  size: 'default'
})`
  flex: 1;
`;

export const DropdownInputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
`;

export const DropdownAddButton = styled.div`
  flex: none;
  padding: 8px;
  cursor: pointer;
`;

export const CountryPicker = styled(CountryPickerComponent).attrs({
  size: 'default'
})`
  flex: 1;
  margin-bottom: 0;
`;

export const LicensesPannel = styled(Collapse.Panel)`
  && {
    .ant-collapse-content {
      margin-top: 10px;

      &-box {
        padding: 0 10px;
      }
    }
  }
`;

export const LicensesCollapse = styled(Collapse).attrs({
  bordered: false,
  expandIconPosition: 'right'
})`
  && {
    background-color: ${widgetBorderColor};
    .ant-collapse- {
      &header {
        padding: 0;
        padding-right: 40px;
        font-weight: 500;

        .ant-collapse-arrow {
          color: ${tableHeaderTextColor};
          right: 0;
        }
      }

      &item {
        border-bottom: none;
        .ant-collapse-header {
          color: ${appTextColor};
        }
        .ant-collapse-header,
        .ant-collapse-content {
          color: ${appTextColor};
        }
      }
    }
  }
`;

export const LicenseItem = styled.li`
  ${mixins.verticalLineMiddle('35px')};
`;

export const LicenseNumber = styled.span`
  display: inline-block;
  width: 2em;
  margin-right: 12px;
`;

export const LicenseName = styled.span`
  font-size: ${fontSize.small};
`;

export const ConnectionButtonWrapper = styled.div`
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const ConnectionButton = styled.div`
  ${commonActionBtnStyles};
  ${props =>
    props.disabled &&
    css`
      color: ${colors.darkGrey};
      border-color: ${colors.lightGrey};
      pointer-events: none;
    `}
  ${props =>
    props.noMargin &&
    css`
      margin-bottom: 0;
    `}
`;

const iconMixins = css`
  ${mixins.size('26px')};
  margin-right: 12px;
`;

export const O365Icon = styled(O365Svg)`
  ${iconMixins};
  fill: ${colors.red};
`;

export const AzureIcon = styled(AzureSvg)`
  ${iconMixins};
  fill: ${colors.blue};
`;

export const ComingSoon = styled.div`
  color: ${colors.shadeGreen};
  font-size: ${fontSize.small};
  text-align: center;
  margin-top: 5px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`;

export const DeleteConfirmationModal = styled(Modal)`
  .ant-modal-content {
    padding: 30px;
  }

  .ant-modal-content,
  .ant-modal-header {
    background-color: ${modalBackgroundColor};
    color: ${appTextColor};
  }

  .ant-modal-title,
  .ant-modal-close svg {
    color: ${appTextColor};
  }

  .ant-modal-title {
    font-size: 20px;
    font-weight: 400;
  }

  .ant-modal-header {
    border-bottom: none;
  }

  .ant-modal-footer {
    border-top: none;
    display: flex;
  }
`;

export const DeleteOkButton = styled(UIButton)`
  width: 120px;
  height: 40px;
  color: ${colors.darkBlue};
  margin-right: 20px;
  background-color: ${colors.white};
`;

export const DeleteCancelButton = styled(UIButton)`
  width: 120px;
  height: 40px;
  color: ${colors.white};
  border-color: ${colors.white};
  background-color: ${colors.darkBlue};
`;

export const LinkCustomerBtn = styled(Link)`
  ${commonActionBtnStyles};
`;

export const AccountFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 20px;
`;
