// @flow

import React from 'react';
import { useTranslate } from '@accordo-feed/language.entry';

import * as Styled from './customerHeader.styled';
// import AzureSvg from 'src/images/azure2.svg';
// import SalesforceSvg from 'src/images/salesforce.svg';
// import Dropdown from './dropdown';
import lang from './customerHeader.lang';

/*************
 *   TYPES   *
 *************/

type Props = {
  actions: Object,
  isConnected: boolean,
  isFailedConnected: boolean,
  isLoading: boolean,
  isSecureApp: boolean,
  lastUpdated: string,
  spinner: Object,
  totalPartnerCenterCustomers: number,
  summary: Object
};

/*****************
 *   COMPONENT   *
 *****************/
const VendorCard = ({ logo, logoText = '', helperText }) => {
  return (
    <Styled.VendorCard>
      <Styled.LogoWrapper>
        {logo}
        {logoText && <Styled.LogoText>{logoText}</Styled.LogoText>}
      </Styled.LogoWrapper>
      <Styled.Row>
        <Styled.VendorHelperText>{helperText}</Styled.VendorHelperText>
        <div>
          <Styled.SyncButton>
            <span>Sync</span>
            <Styled.SyncIconSvg />
          </Styled.SyncButton>
        </div>
      </Styled.Row>
    </Styled.VendorCard>
  );
};

export default ({
  actions,
  isConnected,
  isFailedConnected,
  isLoading,
  isSecureApp,
  lastUpdated,
  spinner,
  totalPartnerCenterCustomers,
  summary
}: Props) => {
  const translate = useTranslate();
  const { totalCustomers, monthlyActiveUsers, totalLicenses, totalUniquePlans } = summary;

  return (
    <Styled.HeaderWrapper>
      <Styled.HighlightWrapper>
        <Styled.CardTitle>{translate(lang.licenseOverview)}</Styled.CardTitle>
        <Styled.NumberBox className="at_connectedCustomers">
          <span>{totalCustomers}</span>
          <label>{translate(lang.totalCustomers)}</label>
        </Styled.NumberBox>
        <Styled.NumberBox className="at_totalActiveUsers">
          <span>{monthlyActiveUsers}</span>
          <label>{translate(lang.monthlyActiveUsers)}</label>
        </Styled.NumberBox>
        <Styled.NumberBox className="at_totalLicenses">
          <span>{totalLicenses}</span>
          <label>{translate(lang.totalLicenses)}</label>
        </Styled.NumberBox>
        <Styled.NumberBox className="at_totalUniquePlans">
          <span>{totalUniquePlans}</span>
          <label>{translate(lang.totalUniquePlans)}</label>
        </Styled.NumberBox>
      </Styled.HighlightWrapper>
      <Styled.VendorCardsWrapper>
        <VendorCard
          logo={<Styled.MicrosoftLogo />}
          logoText={translate(lang.microsoftLogoHelper)}
          helperText={translate(lang.microsoftHelper)}
        />
        {/* <VendorCard logoText="" logo={<AzureSvg />} helperText={translate(lang.azureHelper)} />
        <VendorCard logoText="" logo={<SalesforceSvg />} helperText={translate(lang.salesforceHelper)} /> */}
      </Styled.VendorCardsWrapper>
    </Styled.HeaderWrapper>
  );
};
