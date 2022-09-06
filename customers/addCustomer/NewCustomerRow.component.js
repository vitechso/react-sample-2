import React from 'react';
import { Field } from 'formik';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { DeleteOutlined } from '@ant-design/icons';
import { Row } from 'antd';

import CountryPicker from 'src/components/countryPicker';
import Dropdown from 'src/components/dropdown';
import ErrorMessage from 'src/components/errorMessage';
import { ColField, FieldLabel } from 'src/CustomComponent.styled';
import { CUSTOMER_TYPES } from 'src/constants';
import { lang } from './addCustomer.lang';
import * as Styled from './addCustomer.styled.js';

/*************
 *   TYPES   *
 *************/

type Props = {
  customer: {
    id: string,
    name: string,
    email: string,
    countryCode: string,
    organizationType: string,
    accountManager: string
  },
  index: number,
  accountManagers: Array<string>,
  hasDeleteButton: boolean,
  isLinking: boolean,
  handleDelete: Function,
  handleCountryChange: Function,
  handleTypeChange: Function,
  handleManagerChange: Function
};

/*****************
 *   COMPONENT   *
 *****************/

export default ({
  accountManagers,
  customer,
  index,
  hasDeleteButton,
  handleDelete,
  handleCountryChange,
  handleTypeChange,
  handleManagerChange,
  isLinking
}: Props) => (
  <Styled.RowWrapper>
    <Row gutter={24}>
      <ColField span={3}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusType} />
        </FieldLabel>
        <Field
          name={`customers[${index}].organizationType`}
          render={() => (
            <Dropdown
              defaultValue="Customer"
              data={CUSTOMER_TYPES}
              value={customer.organizationType}
              className="at_custCountryField"
              onSelect={handleTypeChange}
            />
          )}
        />
        <ErrorMessage name={`customers[${index}].organizationType`} />
      </ColField>
      <ColField span={4}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusName} />
        </FieldLabel>
        <Field name={`customers[${index}].name`} className="ant-input at_custNameField" />
        <ErrorMessage name={`customers[${index}].name`} />
      </ColField>
      <ColField span={4}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusEmail} />
        </FieldLabel>
        <Field name={`customers[${index}].email`} className="ant-input at_custEmailField" />
        <ErrorMessage name={`customers[${index}].email`} />
      </ColField>
      <ColField span={4}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusTenantId} />
        </FieldLabel>
        <Field name={`customers[${index}].microsoft.tenantId`} className="ant-input at_custEmailField" />
        <ErrorMessage name={`customers[${index}].microsoft.tenantId`} />
      </ColField>
      <ColField span={4}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusCountry} />
        </FieldLabel>
        <Field
          name={`customers[${index}].countryCode`}
          render={() => (
            <CountryPicker
              onSelect={handleCountryChange}
              value={customer.countryCode}
              includeAllCountries={false}
              className="at_custCountryField"
            />
          )}
        />
        <ErrorMessage name={`customers[${index}].countryCode`} />
      </ColField>
      <ColField span={4}>
        <FieldLabel>
          <LanguageEntry {...lang.colCusManager} />
        </FieldLabel>
        <Field
          name={`customers[${index}].accountManager`}
          render={() => (
            <Dropdown
              data={accountManagers}
              path={['fullName']}
              value={customer.accountManager?.fullName}
              className="at_custAccountManager"
              onSelect={(e, option) => handleManagerChange(accountManagers[option.key])}
            />
          )}
        />
        <ErrorMessage name={`customers[${index}].accountManager`} />
      </ColField>
      <ColField span={1}>
        {hasDeleteButton && (
          <Styled.ButtonDelete onClick={handleDelete} variant="danger" disabled={isLinking}>
            <DeleteOutlined />
          </Styled.ButtonDelete>
        )}
      </ColField>
    </Row>
  </Styled.RowWrapper>
);
