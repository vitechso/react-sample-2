// @flow

import React from 'react';
import uuidV4 from 'uuid/v4';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { translateHOC } from '@accordo-feed/language.entry';

import * as selectors from 'src/redux/selectors';
import { postCustomerData, setAddDialogOpened } from 'src/pages/customers/customers.duck';
import AddCustomerComponent from './AddCustomer.component';

/*************
 *   TYPES   *
 *************/

export type Actions = {
  postCustomerData: (values: Array<string>) => Object,
  setAddDialogOpened: (values: boolean) => Object
};

type Props = {
  accountManagers: Array<string>,
  translate: Function,
  actions: Actions,
  isLinking: boolean,
  isAddDialogOpened: boolean
};

/***************
 *   HELPERS   *
 ***************/

const generateNewCustomer = () => ({
  id: uuidV4(),
  organizationType: '',
  name: '',
  email: '',
  countryCode: '',
  microsoft: {
    tenantId: ''
  }
});

/*****************
 *   COMPONENT   *
 *****************/

const AddCustomer = (props: Props) => {
  if (!props.isAddDialogOpened) {
    return null;
  }

  return <AddCustomerComponent newCustomers={[generateNewCustomer()]} handleAddMore={generateNewCustomer} {...props} />;
};

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  accountManagers: selectors.customersAccountManagersSelector(state),
  isLinking: selectors.customersIsLinkingSelector(state),
  isAddDialogOpened: selectors.customersIsAddingCustomerSelector(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ postCustomerData, setAddDialogOpened }, dispatch)
});

export default compose(
  // $FlowIgnore
  connect(mapStateToProps, mapDispatchToProps),
  translateHOC
)(AddCustomer);
