// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { router, redux } from '@accordo-feed/micro-frontends';

import { connectPartnerCenter } from 'src/redux/modules/partnerCenter/partnerCenter.duck';
import { setBulkEditView } from 'src/pages/customers/customers.duck';
import { setStep } from 'src/pages/secureApp/secureApp.duck';
import * as selectors from 'src/redux/modules/partnerCenter/partnerCenter.selector';
import Dropdown from './Dropdown.component';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  isConnected: selectors.isConnectedSelector,
  isSecureApp: selectors.isSecureAppConnectionTypeSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  connectPartnerCenter,
  setBulkEditView,
  setStep
});

export default compose(connect(mapStateToProps, mapDispatchToProps), router.withRouterHOC)(Dropdown);
