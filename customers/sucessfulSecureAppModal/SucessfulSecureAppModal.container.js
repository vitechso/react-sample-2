// @flow

import * as R from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as selectors from 'src/pages/customers/customers.selector';
import SucessfulSecureAppModal from './SucessfulSecureAppModal.component';
import { closeSecureAppModal } from 'src/pages/customers/customers.duck';

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  secureAppModalState: selectors.showSecureAppModalSelector
});

const mapDispatchToProps = redux.bindActionCreatorsCurried({
  closeSecureAppModal
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(SucessfulSecureAppModal);
