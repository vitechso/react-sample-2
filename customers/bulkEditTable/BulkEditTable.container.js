// @flow

import * as R from 'ramda';
import { connect } from 'react-redux';
import { redux } from '@accordo-feed/micro-frontends';

import * as bulkEditTableSelectors from './bulkEditTable.selector';
import BulkEditTable from './BulkEditTable.component';
import { setSelectedRowKeys } from './bulkEditTable.duck';

const { bindActionCreatorsCurried } = redux;

/*************
 *   REDUX   *
 *************/

const mapStateToProps = R.applySpec({
  selectedRowKeys: bulkEditTableSelectors.selectedRowKeysIncludingMergedSelector,
  companies: bulkEditTableSelectors.bulkEditFilteredDataSelector,
  dataLength: bulkEditTableSelectors.dataLengthSelector,
  loading: bulkEditTableSelectors.isLoadingSelector
});

const mapDispatchToProps = bindActionCreatorsCurried({
  setSelectedRowKeys
});

export default connect(mapStateToProps, mapDispatchToProps)(BulkEditTable);
