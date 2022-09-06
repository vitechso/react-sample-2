// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from 'src/redux/selectors';
import * as securityScoreSelectors from 'src/pages/dashboard/securityScore/drawer/drawer.selector';
import { getSecurityControlProfileData } from 'src/pages/dashboard/securityScore/drawer/drawer.duck';

import LicenseAssignment from './LicenseAssignment.component';
import { fetchCustomerPlans, fetchCustomerUsers, getSecurityRecommendations } from '../customers.duck';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  theme: selectors.appThemeSelector,
  customers: selectors.customersFilteredDataSelector,
  securityScoreData: securityScoreSelectors.dataSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  fetchCustomerPlans,
  fetchCustomerUsers,
  getSecurityRecommendations,
  getSecurityControlProfileData
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(LicenseAssignment);
