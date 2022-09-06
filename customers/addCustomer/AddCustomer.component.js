// @flow

import React from 'react';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { PlusOutlined } from '@ant-design/icons';

import UIButton from 'src/components/UI/button';
import * as Styled from './addCustomer.styled';
import NewCustomerRow from './NewCustomerRow.component';
import type Actions from './AddCustomer.container';
import { FieldArray, Formik, Form } from 'formik';
import { lang } from './addCustomer.lang';
import { newCustomersSchema } from './addCustomer.config';

/*************
 *   TYPES   *
 *************/

type Props = {
  accountManagers: Array<string>,
  newCustomers: Array<any>,
  handleAddMore: Function,
  translate: Function,
  actions: Actions,
  isLinking: boolean
};

/***************
 *   HELPERS   *
 ***************/

// const onSubmit = actionCreator => R.pipe(R.prop('customers'), R.map(R.omit(['id'])), values => actionCreator(values));
/******************
 *   COMPONENTS   *
 ******************/

const MAX_ROWS = 10;

export default (props: Props) => {
  const { accountManagers, newCustomers, handleAddMore, translate, actions, isLinking } = props;

  const createCustomerRows = ({ customers, isMultiple, arrayHelpers, setFieldValue }) =>
    customers.map((customer, index) => (
      <NewCustomerRow
        key={customer.id}
        index={index}
        customer={customer}
        accountManagers={accountManagers}
        isLinking={isLinking}
        hasDeleteButton={isMultiple}
        handleDelete={() => arrayHelpers.remove(index)}
        handleCountryChange={newCountry => setFieldValue(`customers[${index}].countryCode`, newCountry, true)}
        handleTypeChange={organizationType =>
          setFieldValue(`customers[${index}].organizationType`, organizationType, true)
        }
        handleManagerChange={accountManager =>
          setFieldValue(`customers[${index}].accountManager`, accountManager, true)
        }
      />
    ));

  return (
    <Styled.AddCustomerWrapper>
      <Styled.NewCustomersWrapper>
        <Formik
          initialValues={{ customers: newCustomers }}
          validationSchema={newCustomersSchema(translate)}
          onSubmit={values => actions.postCustomerData(values)}
          children={({ values, setFieldValue, errors }) => {
            const isMultiple = values.customers.length > 1;
            return (
              <Form>
                <FieldArray
                  name="customers"
                  render={arrayHelpers => (
                    <>
                      {createCustomerRows({
                        customers: values.customers,
                        isMultiple,
                        arrayHelpers,
                        setFieldValue
                      })}
                      <Styled.BottomWrapper>
                        <UIButton
                          htmlType="submit"
                          loading={!values.shouldLink ? isLinking : false}
                          variant="primary"
                          onClick={() => setFieldValue('shouldLink', false)}
                        >
                          <LanguageEntry {...lang.btnSave} />
                        </UIButton>

                        {!isMultiple && (
                          <UIButton
                            htmlType="submit"
                            loading={values.shouldLink ? isLinking : false}
                            variant="primary"
                            onClick={() => setFieldValue('shouldLink', true)}
                          >
                            <LanguageEntry {...lang.btnSaveLink} />
                          </UIButton>
                        )}

                        <UIButton
                          type="button"
                          onClick={() => arrayHelpers.push(handleAddMore())}
                          disabled={values.customers.length >= MAX_ROWS}
                          variant="outline"
                        >
                          <PlusOutlined style={{ fontSize: '11px' }} />
                          <LanguageEntry {...lang.btnAddMore} />
                        </UIButton>
                      </Styled.BottomWrapper>
                    </>
                  )}
                />
              </Form>
            );
          }}
        />
      </Styled.NewCustomersWrapper>

      <Styled.IconWrapper>
        <span className="at_addCustomerPanelCloseBtn" onClick={() => actions.setAddDialogOpened(false)}>
          <Styled.IconClose />
        </span>
      </Styled.IconWrapper>
    </Styled.AddCustomerWrapper>
  );
};
