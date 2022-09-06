import * as R from 'ramda';
import styled, { css } from 'styled-components';
import { Modal, Button } from 'antd';
import { mixins, constants } from '@accordo-feed/aco-styled-components';

import DataTable from 'src/components/dataTable';
import Office365Svg from 'src/images/office365_2.svg';
import AzureSvg from 'src/images/azure2.svg';
import SalesforceSvg from 'src/images/salesforce.svg';
import { modalBackgroundColor } from 'src/App.styled';

import { COL_WIDTHS } from './customerTable.constants';

const { colors, borderRadius, fontSize } = constants;

export const ConnectionModal = styled(Modal)`
  && {
    .ant-modal-content {
      background-color: ${modalBackgroundColor};
      border-radius: 0;
      min-width: 600px;
    }
  }

  .ant-modal-title {
    text-align: center;
    font-size: ${fontSize.large};
  }

  .ant-modal-body {
    flex-direction: column;
    ${mixins.flexVerticalCenter()};
  }
`;

export const ConnectionButton = styled(Button)`
  ${mixins.flexCenter()};
  width: 250px;
  height: 40px;
  border-color: ${colors.blue};
  border-radius: ${borderRadius};
  margin-top: 20px;

  svg {
    margin-right: 5px;
  }
`;

const comingSoonMixin = css`
  border-color: ${colors.darkGrey};
  color: ${colors.darkGrey};
`;

export const ComingSoonButton = styled(ConnectionButton)`
  ${comingSoonMixin};
  cursor: not-allowed;

  :hover {
    ${comingSoonMixin};
  }
`;

export const ComingSoonText = styled.div`
  font-size: ${fontSize.xSmall};
  color: ${colors.shadeGreen};
`;

export const CustomerRowOverlay = styled.div`
  ${mixins.flexVerticalCenter()};
  padding: 0 16px;
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: ${props =>
    R.sum([
      COL_WIDTHS.ACTIVE_USERS,
      COL_WIDTHS.TOTAL_LICENCES,
      COL_WIDTHS.AVAL_LICENCES,
      props.isNeedPermissions ? 0 : COL_WIDTHS.VISIT_CONNECTION
    ])}px;
  background: ${colors.blueHighlight};
  opacity: 0;
  transition: opacity 0.2s;
`; // Temporarily suspend this until the company Type can be resolved

/* stylelint-disable */ export const Table = styled(DataTable)`
  .ant-table {
    .at_colCustName {
      position: relative;
    }
    .at_colCustName {
      width: 220px;
    }
    .ant-table-thead {
      tr:nth-child(1) > th {
        height: 40px;
        background: ${colors.white};
        padding: 0;
        text-align: left;
        border-bottom: 1px solid ${colors.lightGrey3};

        .ant-table-header-column {
          color: ${colors.darkIndigo};
          padding-left: 8px;

          .ant-table-column-title {
            display: flex;

            span {
              margin-left: 8px;
            }
          }
        }
      }

      tr:nth-child(2) > th {
        height: 42px;
        background: ${colors.white};
        padding: 0;

        .ant-table-header-column {
          color: ${colors.darkIndigo};
        }
      }

      tr:nth-child(3) > th {
        background: ${colors.blackishBlue2};

        .ant-table-header-column {
          color: ${colors.lightGrey4};
        }
      }
    }

    .ant-table-body {
      background: #ffffff;
      box-shadow: 0px 4px 9px rgb(160 174 193 / 30%);
      border-radius: 7px;
      overflow: hidden;

      tr:nth-child(even) {
        background: #fafbfc !important;
      }

      td {
        border: none;
      }
    }

    table {
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }
    .ant-table-content .ant-table-body th.odd {
      background: #132145 !important;
    }

    th.ant-table-column-has-sorters {
      &:hover {
        background: #030c23 !important;
      }
    }
    th .ant-table-header-column .ant-table-column-sorters {
      &:hover:before {
        background: rgba(0, 0, 0, 0) !important;
      }
    }

    .ant-table-row {
      &.aco-row-has-hover-overlay {
        &:hover {
          background: ${colors.blueHighlight};
          ${CustomerRowOverlay} {
            opacity: 1;
          }

          .at_linkConnection:enabled {
            background-color: ${colors.blue};
            color: ${colors.white};
          }
        }
      }
    }
  }
`;
/* stylelint-enable */

export const MicrosoftLogo = styled(Office365Svg)`
  ${mixins.size('115px', 'auto')};
  margin-top: 12px;
`;

export const AzureLogo = styled(AzureSvg)`
  ${mixins.size('115px', 'auto')};
`;

export const SalesforceLogo = styled(SalesforceSvg)``;
