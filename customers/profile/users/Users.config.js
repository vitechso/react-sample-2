import React, { useState } from 'react';
import * as R from 'ramda';
import { Tooltip } from 'antd';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { Email } from '@accordo-feed/aco-styled-components';

import VerticalMenu from 'src/components/verticalMenu';
import { renderSpend } from 'src/pages/masterList/masterList.config';
import { convertBytes, dateConverter, sortByAlph, sortByNumber, sortByDate } from 'src/utils';
import { EXTERNAL_LINKS, TIME_FORMATS } from 'src/constants';
import { Tooltip as TooltipIcon } from 'src/pages/page.styled';
import { USERS_LICENSES_PARTNER_CENTER, USERS_LICENSES_AZURE_ACTIVE } from './constants';
import lang from './Users.lang';
import * as Styled from './Users.styled';

/***************
 *   CONFIGS   *
 ***************/

const menuOptions = ['Edit User (Partner Center)', 'Edit User (Azure AD)', 'Edit License'];

const handleClickMenu = (userId, tenantId) => e => {
  switch (e) {
    case 'Edit User (Partner Center)':
      window.open(
        USERS_LICENSES_PARTNER_CENTER.url.replace(/{{ tenantId }}/, tenantId).replace(/{{ userId }}/, userId),
        '_blank'
      );
      break;

    case 'Edit User (Azure AD)':
      window.open(USERS_LICENSES_AZURE_ACTIVE.url.replace(/{{ userId }}/, userId), '_blank');
      break;

    case 'Edit License':
      window.open(EXTERNAL_LINKS.PARTNER_CENTER_SUBSCRIPTIONS.replace(/{{ tenantId }}/, tenantId), '_blank');
      break;

    default:
      break;
  }
};

const MaskEmail = ({ email }) => {
  const [show, setShow] = useState(false);
  if (!email || email === '') return null;
  return (
    <Styled.EmailWrapper onClick={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {show ? <Email address={email} /> : <span>#########</span>}
    </Styled.EmailWrapper>
  );
};

const UserCell = ({ name, tenantId, userId }) => {
  const partnerLink =
    tenantId && userId
      ? USERS_LICENSES_PARTNER_CENTER.url.replace(/{{ tenantId }}/, tenantId).replace(/{{ userId }}/, userId)
      : null;
  const licensesLink = userId ? USERS_LICENSES_AZURE_ACTIVE.url.replace(/{{ userId }}/, userId) : null;
  return (
    <Styled.UserNameWrapper>
      {name}
      {partnerLink && (
        <Styled.UserLink href={partnerLink}>
          <Styled.UserLinkImg src={USERS_LICENSES_PARTNER_CENTER.image} alt={USERS_LICENSES_PARTNER_CENTER.altText} />
        </Styled.UserLink>
      )}
      {licensesLink && (
        <Styled.UserLink href={licensesLink}>
          <Styled.UserLinkImg src={USERS_LICENSES_AZURE_ACTIVE.image} alt={USERS_LICENSES_AZURE_ACTIVE.altText} />
        </Styled.UserLink>
      )}
    </Styled.UserNameWrapper>
  );
};

export const generateTableColumns = props => {
  const { tenantId } = props;

  return [
    {
      width: 80,
      title: <LanguageEntry {...lang.table.status} />,
      className: 'at_columnName aco-vertical-middle',
      dataIndex: 'accountEnabled',
      fixed: 'left',
      key: 'useractive',
      render: accountEnabled => (
        <Tooltip
          placement="right"
          title={<LanguageEntry {...(accountEnabled ? lang.tooltip.accountEnabled : lang.tooltip.accountDisabled)} />}
        >
          <Styled.UserActive active={accountEnabled} />
        </Tooltip>
      ),
      sorter: sortByNumber('accountEnabled')
    },
    {
      title: <LanguageEntry {...lang.table.user} />,
      className: 'at_columnName aco-vertical-middle',
      dataIndex: 'name',
      key: 'user',
      fixed: 'left',
      width: 220,
      sorter: sortByAlph('name'),
      render: (name, { id }) => <UserCell name={name} tenantId={tenantId} userId={id} />
    },
    {
      width: 200,
      title: <LanguageEntry {...lang.table.contact} />,
      className: 'at_columnContact aco-vertical-middle aco-td-no-padding',
      dataIndex: 'email',
      key: 'contact',
      sorter: sortByAlph('email'),
      render: e => <MaskEmail email={e} />
    },
    {
      title: <LanguageEntry {...lang.table.department} />,
      className: 'at_columnDepartment aco-vertical-middle',
      dataIndex: 'department',
      key: 'department',
      sorter: sortByAlph('department')
    },
    {
      title: <LanguageEntry {...lang.table.plans} />,
      className: 'at_columnPlans aco-vertical-middle',
      dataIndex: 'plans',
      key: 'plans',
      sorter: sortByAlph('plans')
    },
    {
      title: <LanguageEntry {...lang.table.costs} />,
      className: 'at_columnCosts aco-vertical-middle',
      dataIndex: 'cost',
      key: 'costs',
      render: renderSpend,
      sorter: sortByNumber('cost')
    },
    {
      title: (
        <>
          <LanguageEntry {...lang.table.storage} />
          <TooltipIcon title={<LanguageEntry {...lang.tooltip.oneDriveStorageUsed} />} />
        </>
      ),
      className: 'at_columnStorage aco-vertical-middle',
      dataIndex: 'storageUsed',
      key: 'storage',
      render: convertBytes,
      sorter: sortByNumber('storageUsed')
    },
    {
      title: (
        <>
          <LanguageEntry {...lang.table.activity} />
          <TooltipIcon title={<LanguageEntry {...lang.tooltip.lastActivity} />} />
        </>
      ),
      className: 'at_columnActivity aco-vertical-middle',
      dataIndex: 'lastActivity',
      key: 'activity',
      render: dateConverter(TIME_FORMATS.TILL_NOW),
      sorter: sortByDate('lastActivity')
    },
    {
      className: 'aco-vertical-middle',
      width: 50,
      dataIndex: 'id',
      key: 'vertical-menu',
      render: id => {
        let options = [...menuOptions];
        if (!id) {
          options = R.filter(e => e !== 'Edit User (Partner Center)' && e !== 'Edit User (Azure AD)', options);
        }
        if (!tenantId) {
          options = R.filter(e => e !== 'Edit User (Partner Center)' && e !== 'Edit License', options);
        }
        return <VerticalMenu options={options} onClick={handleClickMenu(id, tenantId)} />;
      }
    }
  ];
};
