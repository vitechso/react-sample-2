import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import * as R from 'ramda';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { constants } from '@accordo-feed/aco-styled-components';

import { PATHS, SUBMODULES } from 'src/constants';
import { Tooltip } from 'src/pages/page.styled';
import { customerUtils } from 'src/pages/customers/customers.utils';
import { lang } from 'src/pages/customers/customers.lang';
import { sortByAlph, sortByNumber } from 'src/utils';
import {
  CONNECTION_STATES,
  // CONNECTION_STATES_LANG_MAP,
  RETRY_DATA_COLLECTION_AFTER,
  CUSTOMER_DATA_OUTDATED_THRESHOLD_HOURS,
  CONNECTION_TYPE
} from 'src/pages/customers/customers.constants';
import { getLinkButtonText } from 'src/statecharts/linkButtonText';
import ClockIcon from 'src/images/clock.svg';
import O365Icon from 'src/images/office365.svg';
import ConnectedActiveSvg from 'src/images/connection_icon_active.svg';
import ConnectedInactiveSvg from 'src/images/connection_icon_inactive.svg';
import CircleRedSvg from 'src/images/completed_circle_red.svg';
import CircleBlueSvg from 'src/images/completed_circle_blue.svg';
import CircleGreenSvg from 'src/images/completed_circle_green.svg';
import HeaderSvg from 'src/images/companies_center_header.svg';
import * as Styled from 'src/pages/customers/customers.styled';
import { COL_WIDTHS } from './customerTable.constants';
import * as TableStyled from './customerTable.styled';

const tableLang = lang.table;
// const authLang = tableLang.authState;
const { colors } = constants;
const {
  compareByAlph,
  getConnectionState,
  hasDelayedConsumptionInitFromPartnerCenter,
  // inactiveHasDelegatedAccessNotAppConnect,
  // hasDelegatedAccess,
  hasLinkButton,
  isConnected,
  isInactive,
  // isNeedPermissions,
  isProcessFailed
} = customerUtils;

/***************
 *   CONFIGS   *
 ***************/

const COL_MAP = {
  CUSTOMERS: {
    COL_COMPANY_TYPE: {
      title: <LanguageEntry {...tableLang.colCompanyType} />,
      key: 'COMPANY_TYPE',
      render: (text, customer, index) => {
        return [<CircleBlueSvg />, <CircleGreenSvg />, <CircleRedSvg />][index % 3];
      }
    },

    COL_NAME: {
      title: <LanguageEntry {...tableLang.colCusNameV2} />,
      className: 'at_colCustName',
      dataIndex: 'name',
      key: 'COMPANY_NAME',
      sorter: sortByAlph('name'),
      render: (name, customer) => {
        const stateFE = getConnectionState(customer);
        return (
          <>
            {/* {isNeedPermissions(customer) && (
              <TableStyled.CustomerRowOverlay isNeedPermissions={true}>
                <Styled.WarningIcon />
                <LanguageEntry {...tableLang.permissionOverlay} />
              </TableStyled.CustomerRowOverlay>
            )}
            {inactiveHasDelegatedAccessNotAppConnect(customer) && (
              <TableStyled.CustomerRowOverlay>
                <Styled.FastActivationHoverIcon />
                <LanguageEntry {...tableLang.fastActivationOverlay} />
              </TableStyled.CustomerRowOverlay>
            )} */}
            {/* {hasDelegatedAccess(customer) && <Styled.RowHightlight />} */}
            <Styled.CustomerNameSpan
              state={stateFE}
              opacity={stateFE === CONNECTION_STATES.IN_PROGRESS ? 0.4 : 1}
              to={`/companies/${customer.id}`}
            >
              {name}
            </Styled.CustomerNameSpan>
          </>
        );
      }
    },

    COL_ACTIVE_USERS: {
      title: <LanguageEntry {...tableLang.colActiveUsersV2} />,
      className: 'at_colActiveUsers odd',
      dataIndex: ['office365', 'totalActivePaidUsers'],
      width: COL_WIDTHS.ACTIVE_USERS,
      key: 'COMPANY_USERS',
      render: (totalUsers, customer) => isConnected(customer) && totalUsers
    },

    COL_TOTAL_LICENCES: {
      title: (
        <>
          <LanguageEntry {...tableLang.colLicencesTotal} />
          <Tooltip title={<LanguageEntry {...tableLang.tooltip.colLicencesTotal} />} />
        </>
      ),
      className: 'at_colLicencesTotal odd',
      dataIndex: ['office365', 'totalLicenses'],
      sorter: sortByNumber('office365', 'totalLicenses'),
      defaultSortOrder: 'descend',
      width: COL_WIDTHS.TOTAL_LICENCES,
      key: 'COMPANY_TOTAL_LICENCES',
      render: (totalLicenses, customer) => isConnected(customer) && totalLicenses
    },

    COL_AVAL_LICENCES: {
      title: (
        <>
          <LanguageEntry {...tableLang.colLicencesAval} />
          <Tooltip title={<LanguageEntry {...tableLang.tooltip.colLicencesAval} />} />
        </>
      ),
      className: 'at_colLicencesAval odd',
      dataIndex: ['office365', 'availableLicenses'],
      sorter: sortByNumber('office365', 'availableLicenses'),
      width: COL_WIDTHS.AVAL_LICENCES,
      key: 'COMPANY_AVAL_LICENCES',
      render: (availableLicenses, customer) => isConnected(customer) && availableLicenses
    },

    COL_VISIT_CONNECTION: {
      title: <LanguageEntry {...tableLang.colVisitConnectionV2} />,
      dataIndex: 'connectionLink',
      className: 'at_colVisitConnection odd',
      width: COL_WIDTHS.VISIT_CONNECTION,
      key: 'COMPANY_CONNECTION',
      render: (connectionLink, customer) =>
        isConnected(customer) && (
          <Styled.ConnectionLinkWrapper className="at_o365btn">
            <Styled.SVGButtonOptimizer>
              <Link
                to={{
                  pathname: `/${SUBMODULES.OFFICE_365_OPTIMIZER}/${customer.id}/`,
                  state: { prevPath: PATHS.CUSTOMERS.ROOT }
                }}
              >
                <O365Icon width="20" height="20" fill={colors.red} />
                O365
              </Link>
            </Styled.SVGButtonOptimizer>
            {/* TODO: bring back once Azure is ready to launch */}
            {/* <Styled.SVGButtonOptimizer>
                <AzureIcon width="20" height="20" fill={colors.blue} />
                Azure
              </Styled.SVGButtonOptimizer> */}
          </Styled.ConnectionLinkWrapper>
        )
    },
    // TODO: bring back lines below once Azure is ready to launch
    // COL_AZURE_TENANTS: {
    //   title: <LanguageEntry {...tableLang.colAzureTenantsV2} />,
    //   dataIndex: 'azureTenants',
    //   className: 'at_colAzureTenants',
    //   width: 160,
    //   render: (state, customer) => {
    //     return <></>;
    //   }
    // },

    COL_CONNECTION_STATUS: {
      title: <LanguageEntry {...tableLang.colConnectStatusV2} />,
      dataIndex: ['office365', 'authState'],
      className: 'at_colConnectStatus odd',
      sorter: (a, b) => compareByAlph(getConnectionState(a), getConnectionState(b)),
      width: COL_WIDTHS.CONNECTION_STATUS,
      key: 'COMPANY_CONNECTION_STATUS',
      render: (state, customer) => {
        const stateFE = getConnectionState(customer);
        // console.log(`=> ~ stateFE`, stateFE)
        // const stateWithLang = <LanguageEntry {...authLang[CONNECTION_STATES_LANG_MAP[stateFE]]} />;
        return stateFE === 'Active' ? <ConnectedActiveSvg /> : <ConnectedInactiveSvg />;
        // return (
        //   <>
        //     <Styled.StatusSpan state={stateFE} opacity={stateFE === CONNECTION_STATES.IN_PROGRESS ? 0.4 : 1}>
        //       <span className="connection-status-text">{stateWithLang}</span>
        //     </Styled.StatusSpan>
        //     {stateFE === CONNECTION_STATES.IN_PROGRESS && <Spin size="small" />}
        //   </>
        // );
      }
    },

    COL_LAST_REFRESHED: {
      title: <LanguageEntry {...tableLang.colLastRefreshedV2} />,
      dataIndex: ['office365', 'lastProcessed'],
      className: 'at_colLastRefreshed odd',
      width: COL_WIDTHS.LAST_REFRESHED,
      key: 'COMPANY_LAST_REFRESHED',
      render: (lastProcessedString, customer) => {
        const lastProcessed = moment.utc(lastProcessedString);
        const dateNow = moment.utc();
        const time = new Date(lastProcessedString) > new Date() ? 'A few hours' : dateNow.from(lastProcessed, true);
        const diffInHours = moment.duration(dateNow.diff(lastProcessed)).asHours();
        const isRecent = diffInHours <= CUSTOMER_DATA_OUTDATED_THRESHOLD_HOURS;

        return lastProcessedString ? (
          <Styled.LastRefreshedSpan recent={isRecent}>
            <LanguageEntry {...tableLang.timeAgo} values={{ time }} />
          </Styled.LastRefreshedSpan>
        ) : null;
      }
    },

    COL_CONNECTION_TYPE: {
      title: <LanguageEntry {...tableLang.colConnectionTypeV2} />,
      dataIndex: ['office365', 'connectionType'],
      className: 'at_colConnectionType odd',
      width: COL_WIDTHS.CONNECTION_TYPE,
      key: 'COMPANY_CONNECTION_TYPE',
      render: (state, customer) => {
        const type = R.path(['office365', 'connectionType'], customer);
        const showType =
          type === CONNECTION_TYPE.CUSTOMER_ADMIN ||
          type === CONNECTION_TYPE.PARTNER_ADMIN ||
          (type === CONNECTION_TYPE.APP_CONNECT && !isInactive(customer));
        const isDaily = R.anyPass([R.equals(CONNECTION_TYPE.CUSTOMER_ADMIN), R.equals(CONNECTION_TYPE.APP_CONNECT)])(
          type
        );

        return (
          showType && (
            <Styled.ConnectionTypeSpan>
              <Styled.ClockIconWrapper>
                <ClockIcon fill={isDaily ? colors.blue : colors.lightGrey} />
              </Styled.ClockIconWrapper>
              <LanguageEntry {...tableLang[type]} />
            </Styled.ConnectionTypeSpan>
          )
        );
      }
    },

    COL_LINK_CONNECTION: {
      title: <LanguageEntry {...tableLang.colLinkConnection} />,
      className: 'at_colLinkConnection odd',
      width: COL_WIDTHS.LINK_CONNECTION,
      key: 'COMPANY_LINK_CONNECTION',
      render: (text, customer) => {
        if (hasLinkButton(customer)) {
          const buttonText = getLinkButtonText(customer);

          return (
            !hasDelayedConsumptionInitFromPartnerCenter(customer) && (
              <Styled.ButtonLinkConnection
                secondary="true"
                disabled={customer.isLinking}
                onClick={e => {
                  e.stopPropagation();
                  // TODO: bring back this modal trigger once Azure is ready to launch
                  // customer.actions.setConnectionCustomer(customer);
                  customer.actions.actionButtonClicked(customer);
                }}
                className="at_linkConnection"
              >
                <LanguageEntry {...tableLang[buttonText]} />
              </Styled.ButtonLinkConnection>
            )
          );
        }

        if (isProcessFailed(customer)) {
          return (
            <>
              {customer.showProcessButton ? (
                <Styled.ButtonReProcess
                  disabled={customer.isLinking}
                  loading={customer.isUserProcessing}
                  onClick={e => {
                    e.stopPropagation();
                    customer.actions.handleCustomerReProcess(customer);
                  }}
                >
                  <LanguageEntry {...tableLang.btnReProcess} />
                </Styled.ButtonReProcess>
              ) : (
                <Styled.Countdown
                  title={<LanguageEntry {...tableLang.countDownTitle} />}
                  value={moment(customer.office365.processFailed) + RETRY_DATA_COLLECTION_AFTER}
                  format="mm:ss"
                  onFinish={() =>
                    customer.actions.mergeCustomerById({
                      customerOrgId: customer.id,
                      merged: { showProcessButton: true }
                    })
                  }
                />
              )}
            </>
          );
        }
      }
    },

    COL_RESOURCES: {
      title: <LanguageEntry {...tableLang.colResources} />,
      className: 'odd',
      key: 'COMPANY_RESOURCES',
      render: (text, customer) => null
    },

    COL_BUDGET: {
      title: <LanguageEntry {...tableLang.colBudget} />,
      className: 'odd',
      key: 'COMPANY_BUDGET',
      render: (text, customer) => null
    },

    COL_ACTUAL: {
      title: <LanguageEntry {...tableLang.colActual} />,
      className: 'odd',
      key: 'COMPANY_ACTUAL',
      render: (text, customer) => null
    },

    COL_SALESFORCE_PLACEHOLDER: {
      title: '',
      width: 300,
      key: 'COMPANY_SALESFORCE_PLACEHOLDER',
      render: (text, customer) => null
    },

    COL_EDIT_BUTTON: {
      title: '',
      dataIndex: 'editButton',
      className: 'at_colEditButton',
      width: COL_WIDTHS.EDIT_BUTTON,
      key: 'COMPANY_EDIT_BUTTON',

      render: (state, customer) => {
        const { setCustomerLoadingState, setCustomerDrawerFormUpdated, setSelectedCustomerId } = customer.actions;
        const connectionState = getConnectionState(customer);
        return (
          connectionState !== CONNECTION_STATES.IN_PROGRESS && (
            <Styled.ButtonEdit
              onClick={() => {
                setCustomerLoadingState(true);
                setCustomerDrawerFormUpdated(false);
                setSelectedCustomerId(customer.id);
              }}
              disabled={customer.isLinking}
            >
              <Styled.IconEdit />
            </Styled.ButtonEdit>
          )
        );
      }
    }
  }
};

const PARENT_COL_MAP = {
  COL_COMPANY_INFO: {
    title: <LanguageEntry {...tableLang.colCompanyInfo} />,
    key: 'COL_COMPANY_INFO',
    children: [COL_MAP.CUSTOMERS.COL_COMPANY_TYPE, COL_MAP.CUSTOMERS.COL_NAME]
  },
  COL_MICROSOFT: {
    title: <TableStyled.MicrosoftLogo />,
    key: 'COL_MICROSOFT',
    children: [
      COL_MAP.CUSTOMERS.COL_ACTIVE_USERS,
      COL_MAP.CUSTOMERS.COL_TOTAL_LICENCES,
      COL_MAP.CUSTOMERS.COL_AVAL_LICENCES,
      COL_MAP.CUSTOMERS.COL_VISIT_CONNECTION,
      COL_MAP.CUSTOMERS.COL_CONNECTION_STATUS
    ]
  },
  COL_AZURE: {
    // title: <TableStyled.AzureLogo />,
    title: <div />,
    key: 'COL_AZURE',
    children: [COL_MAP.CUSTOMERS.COL_RESOURCES, COL_MAP.CUSTOMERS.COL_BUDGET, COL_MAP.CUSTOMERS.COL_ACTUAL]
  },
  COL_SALESFORCE: {
    // title: <TableStyled.SalesforceLogo />,
    title: <div />,
    key: 'COL_SALESFORCE',
    children: [COL_MAP.CUSTOMERS.COL_SALESFORCE_PLACEHOLDER]
  }
};

export const TABLE_COLUMN_SETTINGS = {
  // CUSTOMERS: [
  //   COL_MAP.CUSTOMERS.COL_NAME,
  //   COL_MAP.CUSTOMERS.COL_ACTIVE_USERS,
  //   COL_MAP.CUSTOMERS.COL_TOTAL_LICENCES,
  //   COL_MAP.CUSTOMERS.COL_AVAL_LICENCES,
  //   COL_MAP.CUSTOMERS.COL_VISIT_CONNECTION,
  //   // TODO: bring back lines below once Azure is ready to launch
  //   // COL_MAP.CUSTOMERS.COL_AZURE_TENANTS,
  //   COL_MAP.CUSTOMERS.COL_CONNECTION_STATUS,
  //   COL_MAP.CUSTOMERS.COL_LAST_REFRESHED,
  //   COL_MAP.CUSTOMERS.COL_CONNECTION_TYPE,
  //   COL_MAP.CUSTOMERS.COL_LINK_CONNECTION,
  //   COL_MAP.CUSTOMERS.COL_EDIT_BUTTON
  // ],
  CUSTOMERS: [
    {
      title: (
        <>
          <HeaderSvg />
          <LanguageEntry {...tableLang.tableTitleNew} />
        </>
      ),
      children: [
        PARENT_COL_MAP.COL_COMPANY_INFO,
        PARENT_COL_MAP.COL_MICROSOFT,
        PARENT_COL_MAP.COL_AZURE,
        PARENT_COL_MAP.COL_SALESFORCE
      ]
    }
  ]
};
