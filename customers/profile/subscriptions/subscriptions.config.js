import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';

import { dateConverter, sortByAlph, sortByDate, formatUsd, capitalizeFirstLetter } from 'src/utils';
import { TIME_FORMATS } from 'src/constants';
import lang from './subscriptions.lang';
import * as Styled from './subscriptions.styled';

/***************
 *   CONFIGS   *
 ***************/

export const generateTableColumns = ({ priceKey = 'msrp' }) => [
  {
    width: '5%',
    title: <LanguageEntry {...lang.table.type} />,
    className: 'at_columnType aco-vertical-middle',
    dataIndex: 'type',
    key: 'type',
    fixed: 'left',
    render: type => <Styled.SubscriptionType>{type}</Styled.SubscriptionType>
  },
  {
    title: <LanguageEntry {...lang.table.name} />,
    className: 'at_columnName aco-vertical-middle',
    dataIndex: 'offerName',
    key: 'name',
    fixed: 'left',
    width: '12%',
    sorter: sortByAlph('offerName')
  },
  {
    title: <LanguageEntry {...lang.table.term} />,
    className: 'at_columnTerm aco-vertical-middle',
    dataIndex: 'term',
    key: 'term',
    render: capitalizeFirstLetter
  },
  {
    width: '12%',
    title: <LanguageEntry {...lang.table.expiration} />,
    className: 'at_columnExpiration aco-vertical-middle',
    dataIndex: 'commitmentEndDate',
    key: 'expiration',
    render: dateConverter(TIME_FORMATS.TILL_NOW),
    sorter: sortByDate('commitmentEndDate')
  },
  {
    title: <LanguageEntry {...lang.table.renewal} />,
    className: 'at_columnRenewal aco-vertical-middle aco-text-center',
    dataIndex: 'autoRenewEnabled',
    key: 'renewal',
    render: (autoRenewEnabled, { attentionNeeded }) => (
      <Styled.RenewalWrapper>
        <Styled.Renewal enabled={autoRenewEnabled}>{autoRenewEnabled ? 'On' : 'Off'}</Styled.Renewal>
        {attentionNeeded && <Styled.AttentionIcon />}
      </Styled.RenewalWrapper>
    )
  },
  {
    title: <LanguageEntry {...lang.table.product} />,
    className: 'at_columnProduct aco-vertical-middle',
    dataIndex: 'friendlyName',
    width: '12%',
    key: 'product'
  },
  {
    title: <LanguageEntry {...lang.table.seats} />,
    className: 'at_columnSeats aco-vertical-middle aco-text-center',
    dataIndex: 'quantity',
    key: 'seats'
  },
  {
    title: <LanguageEntry {...lang.table.price} />,
    className: 'at_columnPrice aco-vertical-middle aco-text-center',
    dataIndex: 'pricePer',
    key: 'price',
    render: pricePer => formatUsd(pricePer[priceKey])
  },
  {
    title: <LanguageEntry {...lang.table.monthly} />,
    className: 'at_columnPrice aco-vertical-middle aco-text-center',
    dataIndex: 'monthlyPrice',
    key: 'monthly',
    render: monthlyPrice => formatUsd(monthlyPrice[priceKey])
  },
  {
    title: <LanguageEntry {...lang.table.annual} />,
    className: 'at_columnPrice aco-vertical-middle aco-text-center',
    dataIndex: 'annual',
    key: 'annual',
    render: annual => formatUsd(annual[priceKey])
  },
  {
    title: <LanguageEntry {...lang.table.balance} />,
    className: 'at_columnBalance aco-vertical-middle aco-text-end',
    dataIndex: 'termBalance',
    key: 'termBalance',
    render: termBalance => <Styled.TermBalance enabled={termBalance > 0}>{formatUsd(termBalance)}</Styled.TermBalance>
  }
];
