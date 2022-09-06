// @flow

import * as R from 'ramda';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import { setBulkEditView } from 'src/pages/customers/customers.duck';
import {
  setIsCheckedState,
  syncClientsData,
  setSelectedRowKeys
} from 'src/pages/customers/bulkEditTable/bulkEditTable.duck';
import { setSearchTerm } from 'src/redux/modules/searchTerm/searchTerm.duck';
import * as bulkEditTableSelectors from 'src/pages/customers/bulkEditTable/bulkEditTable.selector';
import * as selectors from 'src/redux/selectors';
import BulkEditView from './BulkEditView.component';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  isChecked: bulkEditTableSelectors.isCheckedSelectedSelector,
  selectedRowKeys: bulkEditTableSelectors.selectedRowKeysSelector,
  totalCount: bulkEditTableSelectors.dataLengthSelector,
  allAvailableKeyCount: bulkEditTableSelectors.allAvailableKeyCountSelector,
  isLoading: bulkEditTableSelectors.isLoadingSelector,
  theme: selectors.appThemeSelector,
  searchTerm: selectors.searchTermSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  setIsCheckedState,
  syncClientsData,
  setBulkEditView,
  setSelectedRowKeys,
  setSearchTerm
});

export default connect(mapStateToProps, mapDispatchToProps)(BulkEditView);
