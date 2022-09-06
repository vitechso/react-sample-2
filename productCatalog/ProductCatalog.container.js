// @flow
import React from 'react';
import { connect } from 'react-redux';

import ProductCatalogComponent from './ProductCatalog.component';
import * as selectors from 'src/redux/selectors';

/*****************
 *   COMPONENT   *
 *****************/

const ProductCatalog = props => {
  return (
    <div>
      <ProductCatalogComponent {...props} />
    </div>
  );
};

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  theme: selectors.appThemeSelector(state)
});

export default connect(mapStateToProps)(ProductCatalog);
