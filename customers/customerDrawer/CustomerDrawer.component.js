import * as R from 'ramda';
import React, { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { ButtonElement } from '@accordo-feed/aco-styled-components';
import { LanguageEntry } from '@accordo-feed/language.entry';

import CustomModal from 'src/components/modal';
import ErrorMessage from 'src/components/errorMessage';
import { customerSchema } from 'src/pages/customers/addCustomer/addCustomer.config';
import { customerUtils } from 'src/pages/customers/customers.utils';
import { loaderInlineHOC } from 'src/hoc';
import { CONNECTION_STATES } from 'src/pages/customers/customers.constants';
import { CUSTOMER_TYPES, PATHS, SUBMODULES } from 'src/constants';

import * as Styled from './customerDrawer.styled';
import { lang } from './customerDrawer.lang';

/*************
 *   TYPES   *
 *************/

type Props = {
  accountManagers: Array<string>,
  customerDeletedState: string,
  selectedCustomerId: string,
  customer: Object,
  isFormUpdated: boolean,
  isCustomerUpdating: boolean,
  licenses: Array<Object>,
  plans: Array<Object>,
  plansTotal: number,
  onFormValueChange: Function,
  onClose: Function,
  onDeleteClose: Function,
  onNeedConfirmDelete: Function,
  onConfirmDelete: Function,
  translate: Function,
  spinner: Object,
  isLoading: boolean,
  onSubmit: Function,
  isLinked: boolean,
  onClickLinkCustomer: Function,
  onUpdateCustomerManagers: Function,
  afterVisibleChange: Function,
  customers: Array<Object>,
  hasInitDelay: boolean
};

/******************
 *   COMPONENTS   *
 ******************/

const InitialManager = {
  fullName: '',
  emailAddress: '',
  phoneNumber: ''
};

const loaderMsg = <LanguageEntry id="loading.loaderInline.language.id" defaultMessage="Loading..." />;

const LicenseItem = ({ name, purchased }) => (
  <Styled.LicenseItem>
    <Styled.LicenseNumber>{purchased}</Styled.LicenseNumber>
    <Styled.LicenseName>{name}</Styled.LicenseName>
  </Styled.LicenseItem>
);

const CustomerDrawerComp = ({
  accountManagers,
  selectedCustomerId,
  customer,
  customers,
  isFormUpdated,
  plans,
  plansTotal = 0,
  onFormValueChange,
  onClose,
  translate,
  isLoading,
  spinner,
  customerDeletedState,
  onDeleteClose,
  onNeedConfirmDelete,
  onConfirmDelete,
  onSubmit,
  isCustomerUpdating,
  isLinked,
  onClickLinkCustomer,
  onUpdateCustomerManagers,
  afterVisibleChange,
  hasInitDelay
}: Props) => {
  const props = {
    onClose,
    title: customer.name,
    visible: customer?.id && customerDeletedState === '',
    afterVisibleChange,
    destroyOnClose: true
  };

  const [accountManager, setAccountManager] = useState(null);
  const [accountManagerErrMsg, setAccountManagerErrMsg] = useState('');

  const genId = id => `${customer.id}-${id}`;
  const orgId = R.propOr(false, 'id', customer);

  const customerStatus = customerUtils.getCustomerStatusById(orgId)(customers);
  const isLinkFailed = orgId && [CONNECTION_STATES.PROCESS_FAILED].includes(customerStatus);
  const isNeedPermissions = [CONNECTION_STATES.NEEDS_PERMISSIONS].includes(customerStatus);

  const showConfirmModal = !!selectedCustomerId && customerDeletedState === 'needConfirm';

  const renderCustomerLinkBtn = () => {
    if (orgId) {
      if (isLinked) {
        return (
          <Styled.LinkCustomerBtn
            to={{
              pathname: `/${SUBMODULES.OFFICE_365_OPTIMIZER}/${customer.id}/`,
              state: { prevPath: PATHS.CUSTOMERS.ROOT }
            }}
            className="at__o365Drawer"
          >
            <Styled.O365Icon />
            {translate(lang.buttonO365SignIn)}
          </Styled.LinkCustomerBtn>
        );
      }

      return (
        <Styled.ConnectionButtonWrapper disabled={isLinkFailed}>
          <Styled.ConnectionButton
            onClick={onClickLinkCustomer}
            disabled={isLinkFailed || hasInitDelay}
            className="at__o365Drawer"
          >
            <Styled.O365Icon />
            {translate(isNeedPermissions ? lang.buttonO365UpdatePermissions : lang.buttonO365LinkConnection)}
          </Styled.ConnectionButton>
        </Styled.ConnectionButtonWrapper>
      );
    }
  };

  return (
    <>
      <div className={isLoading ? 'aco-loading' : ''}>
        <CustomModal
          title={`${translate(lang.deleteCustomer.deleteTitle)} ${customer.name ? customer.name : ''} ?`}
          isModalOpen={showConfirmModal}
          closeModal={onDeleteClose}
          description={
            <>
              <div>{translate(lang.deleteCustomer.alertLineOne)}</div>
              <div>{translate(lang.deleteCustomer.alertLineTwo)}</div>
            </>
          }
          leftButtonText={translate(lang.deleteCustomer.buttonCancel)}
          rightButtonText={translate(lang.deleteCustomer.buttonConfirm)}
          leftButtonOnClick={onDeleteClose}
          rightButtonOnClick={() => onConfirmDelete(selectedCustomerId)}
          rightButtonLoadingStatus={customerDeletedState}
        >
          {!customer.name ? spinner : ''}
        </CustomModal>
      </div>

      <Styled.Drawer placement="right" width={400} {...props} className="at__customerDrawer">
        <div className={isLoading ? 'aco-loading' : ''}>
          <Styled.Title>{translate(lang.customerTitle)}</Styled.Title>
          <Formik
            enableReinitialize={true}
            initialValues={customer}
            validationSchema={customerSchema(translate)}
            onSubmit={onSubmit}
            children={({ values, handleSubmit, setFieldValue }) => {
              const handleTextInputChange = key => event => {
                onFormValueChange();
                setFieldValue(key, event.target.value);
              };

              const handleNewAccountManagerChange = key => e => {
                const temp = { ...accountManager };
                temp[key] = e.target.value;
                setAccountManager(temp);
                setAccountManagerErrMsg('');
              };

              const handleAddNewAccountManager = () => {
                if (accountManager.fullName === '') {
                  setAccountManagerErrMsg('Please enter a full name.');
                } else if (accountManager.emailAddress === '') {
                  setAccountManagerErrMsg('Please enter an email address.');
                } else if (accountManager.phoneNumber === '') {
                  setAccountManagerErrMsg('Please enter a phone number.');
                } else if (R.includes(accountManager, accountManagers)) {
                  setAccountManagerErrMsg('This account is already existing.');
                } else {
                  onUpdateCustomerManagers([...accountManagers, accountManager]);
                  onFormValueChange();
                  setFieldValue('accountManager', accountManager);
                  setAccountManager(null);
                  setAccountManagerErrMsg('');
                }
              };

              return (
                <React.Fragment>
                  <Styled.DetailsList>
                    <Form>
                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('organizationType')}>
                            {translate(lang.customerType)}
                          </Styled.DetailsLabel>
                          <Styled.StyledDropdown
                            name="organizationType"
                            data={CUSTOMER_TYPES}
                            value={values.organizationType}
                            className="at__custTypeDrawer"
                            onChange={value => {
                              onFormValueChange();
                              setFieldValue('organizationType', value);
                            }}
                          />
                        </Styled.DetailsItem>
                        <ErrorMessage name="organizationType" />
                      </Styled.FormRow>

                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('name')}>
                            {translate(lang.customerName)}
                          </Styled.DetailsLabel>
                          <Styled.Input
                            id={genId('name')}
                            value={values.name}
                            onChange={handleTextInputChange('name')}
                            name="name"
                            className="at__custNameDrawer"
                          />
                        </Styled.DetailsItem>
                        <ErrorMessage name="name" />
                      </Styled.FormRow>

                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('email')}>
                            {translate(lang.customerEmail)}
                          </Styled.DetailsLabel>
                          <Styled.Input
                            id={genId('email')}
                            value={values.email}
                            onChange={handleTextInputChange('email')}
                            name="email"
                            className="at__custEmailDrawer"
                          />
                        </Styled.DetailsItem>
                        <ErrorMessage name="email" />
                      </Styled.FormRow>

                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('tenantId')}>
                            {translate(lang.customerTenantId)}
                          </Styled.DetailsLabel>
                          <Styled.Input
                            id={genId('tenantId')}
                            value={values.microsoft?.tenantId}
                            placeholder="00000000-0000-0000-0000-000000000000"
                            onChange={handleTextInputChange('microsoft.tenantId')}
                            name="tenantId"
                            className="at__custNameDrawer"
                          />
                        </Styled.DetailsItem>
                        <ErrorMessage name="tenantId" />
                      </Styled.FormRow>

                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('country')}>
                            {translate(lang.customerCountry)}
                          </Styled.DetailsLabel>
                          <Styled.CountryPicker
                            id={genId('country')}
                            value={values.countryCode}
                            onChange={value => {
                              onFormValueChange();
                              setFieldValue('countryCode', value);
                            }}
                            name="countryCode"
                            includeAllCountries={false}
                            className="at__custCountryDrawer"
                          />
                        </Styled.DetailsItem>
                        <ErrorMessage name="countryCode" />
                      </Styled.FormRow>

                      <Styled.FormRow>
                        <Styled.DetailsItem>
                          <Styled.DetailsLabel htmlFor={genId('accountManager')}>
                            {translate(lang.customerManager)}
                          </Styled.DetailsLabel>
                          <Styled.StyledDropdown
                            name="accountManager"
                            data={accountManagers}
                            path={['fullName']}
                            value={values.accountManager?.fullName}
                            className="at__custManagerDrawer"
                            onSelect={(e, option) => {
                              onFormValueChange();
                              setFieldValue('accountManager', accountManagers[option.key]);
                            }}
                          />
                          <ButtonElement type="link" size="small" onClick={() => setAccountManager(InitialManager)}>
                            <PlusOutlined />
                          </ButtonElement>
                        </Styled.DetailsItem>
                        <ErrorMessage name="accountManager" />
                      </Styled.FormRow>
                      {accountManager && (
                        <Styled.FormRow>
                          <Styled.DetailsItem bottom={5}>
                            <Styled.DetailsLabel htmlFor={genId('fullName')} size="small">
                              {translate(lang.managerFullName)}
                            </Styled.DetailsLabel>
                            <Styled.Input
                              id={genId('fullName')}
                              value={accountManager.fullName}
                              onChange={handleNewAccountManagerChange('fullName')}
                              name="fullName"
                              className="at__custNameDrawer"
                            />
                          </Styled.DetailsItem>
                          <Styled.DetailsItem bottom={5}>
                            <Styled.DetailsLabel htmlFor={genId('emailAddress')} size="small">
                              {translate(lang.managerAddress)}
                            </Styled.DetailsLabel>
                            <Styled.Input
                              id={genId('emailAddress')}
                              value={accountManager.emailAddress}
                              onChange={handleNewAccountManagerChange('emailAddress')}
                              name="emailAddress"
                              className="at__custNameDrawer"
                            />
                          </Styled.DetailsItem>
                          <Styled.DetailsItem bottom={5}>
                            <Styled.DetailsLabel htmlFor={genId('phoneNumber')} size="small">
                              {translate(lang.managerPhone)}
                            </Styled.DetailsLabel>
                            <Styled.Input
                              id={genId('phoneNumber')}
                              value={accountManager.phoneNumber}
                              onChange={handleNewAccountManagerChange('phoneNumber')}
                              name="phoneNumber"
                              className="at__custNameDrawer"
                            />
                          </Styled.DetailsItem>
                          {accountManagerErrMsg !== '' && (
                            <ErrorMessage>
                              <span>{accountManagerErrMsg}</span>
                            </ErrorMessage>
                          )}
                          <Styled.AccountFooter>
                            <ButtonElement variant="danger" onClick={() => setAccountManager(null)}>
                              {translate(lang.cancelButton)}
                            </ButtonElement>
                            <ButtonElement variant="primary" onClick={handleAddNewAccountManager}>
                              {translate(lang.addButton)}
                            </ButtonElement>
                          </Styled.AccountFooter>
                        </Styled.FormRow>
                      )}
                    </Form>
                  </Styled.DetailsList>

                  <Styled.Line />
                  {R.not(R.isEmpty(plans)) ? (
                    <Styled.LicensesCollapse>
                      <Styled.LicensesPannel header={translate(lang.licensesTitle, { num: plansTotal })}>
                        <ul>
                          {plans.map(item => (
                            <LicenseItem key={item.name} {...item} />
                          ))}
                        </ul>
                      </Styled.LicensesPannel>
                    </Styled.LicensesCollapse>
                  ) : (
                    <Styled.Description>
                      <Styled.Title className="ant-collapse-header">{translate(lang.noPlanTitle)}</Styled.Title>
                      {isLinkFailed ? translate(lang.linkFailedMessage) : translate(lang.noPlanMessage)}
                    </Styled.Description>
                  )}

                  <Styled.Line />
                  <Styled.Title>{translate(lang.connectionsTitle)}</Styled.Title>

                  {renderCustomerLinkBtn()}
                  <Styled.ConnectionButtonWrapper disabled>
                    <Styled.ConnectionButton disabled noMargin>
                      <Styled.AzureIcon />
                      {translate(lang.buttonAzureSignIn)}
                    </Styled.ConnectionButton>
                  </Styled.ConnectionButtonWrapper>
                  <Styled.ComingSoon>{translate(lang.azureMsg)}</Styled.ComingSoon>

                  <Styled.Footer>
                    <ButtonElement variant="danger" onClick={onNeedConfirmDelete}>
                      <DeleteOutlined />
                      {translate(lang.deleteButton)}
                    </ButtonElement>
                    <ButtonElement
                      variant="primary"
                      disabled={!isFormUpdated}
                      onClick={handleSubmit}
                      loading={isCustomerUpdating}
                    >
                      {translate(lang.saveButton)}
                    </ButtonElement>
                  </Styled.Footer>
                </React.Fragment>
              );
            }}
          />
          {spinner}
        </div>
      </Styled.Drawer>
    </>
  );
};

export default loaderInlineHOC({
  message: loaderMsg
})(CustomerDrawerComp);
