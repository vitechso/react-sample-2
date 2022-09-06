import React from 'react';
import { compose } from 'recompose';
import { useTranslate } from '@accordo-feed/language.entry';
import { formatCurrencyHOC, widgetDataHOC } from 'src/hoc';
import { CompanyType } from '../customerProfile.constants';
import { LicenseBoxWrapper, LicenseNumberBox } from './LicenseOverview.styled';
import lang from './LicenseOverview.lang';

type LicenseOverviewProps = {
  company: CompanyType,
  formatCurrency: Function
};

const LicenseOverview = ({ company, formatCurrency }: LicenseOverviewProps) => {
  const translate = useTranslate();

  if (!company.planHighlights) return null;
  const planHighlights = company.planHighlights || {};

  return (
    <LicenseBoxWrapper>
      <LicenseNumberBox className="total-users">
        <span>{company.users ? company.users.length : 0}</span>
        <label>{translate(lang.totalUsers)}</label>
      </LicenseNumberBox>

      <LicenseNumberBox className="licenses">
        <span>{planHighlights.purchased}</span>
        <label>{translate(lang.licenses)}</label>
      </LicenseNumberBox>

      <LicenseNumberBox className="unassigned">
        <span>{planHighlights.unassigned}</span>
        <label>{translate(lang.unassigned)}</label>
      </LicenseNumberBox>

      <LicenseNumberBox className="misassigned-licenses">
        <span>{planHighlights.misassigned || 0}</span>
        <label>{translate(lang.misassignedLicenses)}</label>
      </LicenseNumberBox>
      <LicenseNumberBox>
        <span>{formatCurrency(planHighlights.annualSpend || 0)}</span>
        <label>{translate(lang.totalSpend)}</label>
      </LicenseNumberBox>
      <LicenseNumberBox>
        <span>{formatCurrency(planHighlights.unassignedRevenueImpactAnnually || 0)}</span>
        <label>{translate(lang.unassignedCost)}</label>
      </LicenseNumberBox>
      <LicenseNumberBox>
        <span>{formatCurrency(planHighlights.savings || 0)}</span>
        <label>{translate(lang.potentialSavings)}</label>
      </LicenseNumberBox>
    </LicenseBoxWrapper>
  );
};

export default compose(widgetDataHOC(['company', 'planHighlights'], true), formatCurrencyHOC)(LicenseOverview);
