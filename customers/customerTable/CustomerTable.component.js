// @flow

import * as R from 'ramda';
import React, { useState } from 'react';
import { useTranslate } from '@accordo-feed/language.entry';
import { constants } from '@accordo-feed/aco-styled-components';

import * as Styled from './customerTable.styled';
import AwsIcon from 'src/images/aws.svg';
import AzureIcon from 'src/images/azure.svg';
import O365Icon from 'src/images/office365.svg';
import { CONNECTION_STATES } from 'src/pages/customers/customers.constants';
import { TABLE_COLUMN_SETTINGS } from './customerTable.config';
import { customerUtils } from 'src/pages/customers/customers.utils';
import { lang } from 'src/pages/customers/customers.lang';

const { colors } = constants;

/*************
 *   TYPES   *
 *************/

type ActionsType = {
  setSelectedCustomerId: Function,
  actionButtonClicked: Function,
  setCustomerDrawerFormUpdated: Function,
  setCustomerLoadingState: Function,
  mergeCustomerById: Function,
  setConnectionCustomer: Function
};

export type CustomerType = {
  office365: {
    authState: string,
    totalActivePaidUsers: number,
    totalLicenses: number,
    availableLicenses: number,
    totalSpend: number,
    processFailed: string
  },
  actions: ActionsType,
  isLinking: boolean,
  showProcessButton: boolean,
  item: Object,
  refIndex: number,
  organizationType: string,
  office365Status: string
};

type Props = {
  actions: ActionsType,
  isLinking: boolean,
  customers: CustomerType[],
  isLoading: boolean,
  formatCurrency: Function,
  selectedCustomerId: string
};

/*****************
 *   COMPONENT   *
 *****************/

export default ({ actions, isLinking, customers, isLoading, formatCurrency, selectedCustomerId }: Props) => {
  const [connectionCustomer, setConnectionCustomer] = useState({});

  const translate = useTranslate();
  const { connectionModal } = lang;

  const dataSource = customers.map(item => {
    const { office365 } = item;
    item.actions = R.mergeDeepRight(actions, { setConnectionCustomer });
    item.isLinking = isLinking;

    if (office365) {
      if (customerUtils.isProcessFailedExpiry(office365)) {
        item.showProcessButton = true;
      }

      return {
        ...item,
        office365: {
          ...office365,
          totalSpendCurrency: formatCurrency(office365.totalSpend)
        }
      };
    }
    return item;
  });

  const rowClassName = record => {
    const classNames = [];

    if (record.id === selectedCustomerId) {
      classNames.push('aco-table-selected-row');
    }

    if (customerUtils.getConnectionState(record) === CONNECTION_STATES.IN_PROGRESS) {
      classNames.push('aco-row-loading');
    }

    if (record.office365) {
      if (customerUtils.isNeedPermissions(record) || customerUtils.inactiveHasDelegatedAccessNotAppConnect(record)) {
        // classNames.push('aco-row-has-hover-overlay');
      }
    }

    return classNames.join(' ');
  };

  const props = {
    dataSource,
    columns: TABLE_COLUMN_SETTINGS.CUSTOMERS,
    loading: isLoading,
    selectedCustomerId,
    actions,
    rowClassName,
    pageSize: 30
  };

  return (
    <>
      <Styled.ConnectionModal
        title={connectionCustomer.name}
        visible={!R.isEmpty(connectionCustomer)}
        onCancel={() => setConnectionCustomer({})}
        wrapClassName="at_connectionsModal"
        footer={null}
      >
        <div>{translate(connectionModal.title)}</div>
        <div>
          <Styled.ConnectionButton
            disabled={isLinking}
            onClick={() => connectionCustomer.actions.getCustomerLoginLink(connectionCustomer)}
            className="at_o365SignInButton"
          >
            <O365Icon width="25" height="25" fill={colors.red} />
            {translate(connectionModal.o365Button)}
          </Styled.ConnectionButton>
        </div>
        <div>
          <Styled.ConnectionButton disabled={isLinking} className="at_azureSignInButton">
            <AzureIcon width="25" height="25" fill={colors.blue} />
            {translate(connectionModal.azureButton)}
          </Styled.ConnectionButton>
        </div>
        <div>
          <Styled.ComingSoonButton disabled={isLinking} className="at_awsSignInButton">
            <AwsIcon width="25" height="25" />
            {translate(connectionModal.awsButton)}
          </Styled.ComingSoonButton>
        </div>
        <Styled.ComingSoonText>{translate(connectionModal.footer)}</Styled.ComingSoonText>
      </Styled.ConnectionModal>
      <Styled.Table {...props} />
    </>
  );
};
