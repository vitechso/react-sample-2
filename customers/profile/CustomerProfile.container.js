// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import { getOrganizationData } from 'src/pages/recommendations/recommendations.duck';
import { recommendationsDataSelector } from 'src/pages/recommendations/recommendations.selector';
import * as securityScoreSelectors from 'src/pages/dashboard/securityScore/drawer/drawer.selector';
import * as selectors from 'src/redux/selectors';
import { fetchCustomerDetails } from '../customers.duck';
import CustomerProfile from './CustomerProfile.component';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  theme: selectors.appThemeSelector,
  customers: selectors.customersFilteredDataSelector,
  overrides: recommendationsDataSelector,
  securityScoreData: securityScoreSelectors.dataSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  fetchCustomerDetails,
  getOrganizationData
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(CustomerProfile);
