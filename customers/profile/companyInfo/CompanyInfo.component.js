import React from 'react';
import moment from 'moment';
import { Col, Row, Spin } from 'antd';

import { formatCurrencyHOC } from 'src/hoc';
import { EXTERNAL_LINKS } from 'src/constants';
import { CompanyType } from '../customerProfile.constants';
import * as Styled from './CompanyInfo.styled';

type CompanyInfoProps = {
  company: CompanyType,
  formatCurrency: Function
};

const CompanyInfo = ({ company, formatCurrency }: CompanyInfoProps) => {
  const renderInfoItem = (label, value, hasLink = false, link) => {
    const linkProps = {};
    if (hasLink) {
      linkProps.href = link ?? 'https://partner.microsoft.com/en-us/dashboard';
      linkProps.as = 'a';
      linkProps.target = '_blank';
      linkProps.isLink = true;
    }

    return (
      <Row>
        <Col xs={24}>
          <Styled.Label>{label}</Styled.Label>
        </Col>
        <Col xs={24}>
          <Styled.Value {...linkProps}>{value ?? ''}</Styled.Value>
        </Col>
      </Row>
    );
  };

  if (!company) {
    return (
      <Styled.SpinContainer>
        <Spin />
      </Styled.SpinContainer>
    );
  }

  const { name: companyName, created, email, microsoft, planHighlights } = company;
  const DATE_FORMAT = 'MM-DD-YY';

  const companyInitials = companyName
    ? companyName
        .match(/(^\S\S?|\b\S)?/g)
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('')
        .toUpperCase()
    : '';
  const companyPartnerCenterLink = microsoft?.tenantId
    ? EXTERNAL_LINKS.PARTNER_CENTER_SUBSCRIPTIONS.replace(/{{ tenantId }}/, microsoft?.tenantId)
    : null;

  return (
    <Styled.RootWrapper>
      <Styled.Logo>
        <Styled.UserAvatars>{companyInitials}</Styled.UserAvatars>
      </Styled.Logo>
      <Row gutter={[5, { xs: 4, sm: 4, md: 12, lg: 8, xxl: 32 }]}>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Company Name', companyName)}
        </Col>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Tenant ID', microsoft?.tenantId, true, companyPartnerCenterLink)}
        </Col>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Admin Contact', email, true, `mailto:${email}`)}
        </Col>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Customer Since', moment(created).format(DATE_FORMAT))}
        </Col>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Annual Spend', formatCurrency(planHighlights?.annualSpend ?? 0))}
        </Col>
        <Col xs={24} sm={12} xxl={8}>
          {renderInfoItem('Billing Contact', email, true, `mailto:${email}`)}
        </Col>
        {/* {renderInfoItem('Last Synced', moment(lastUpdated).format(DATE_FORMAT))} */}
        {/* {renderInfoItem('Country', getName(countryCode))} */}
        {/* {renderInfoItem('Admin User', company.name)} */}
        {/* {renderInfoItem('Currency', 'USD')} */}
      </Row>
    </Styled.RootWrapper>
  );
};

export default formatCurrencyHOC(CompanyInfo);
