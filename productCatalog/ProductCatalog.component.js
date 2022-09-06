import React, { useState } from 'react';
import * as R from 'ramda';
import { Responsive } from 'react-grid-layout';
import { SizeMe } from 'react-sizeme';

import Widget from 'src/components/widget';
import { useModalProps } from 'src/hooks';
import { LAYOUTS, BREAKPOINTS, COLS, PRODUCTS, dataSource, companyProductOveride } from './constants';
import ProductGallery from './productGallery/';
import ProductBreakout from './productBreakout/';
import ProductPricing from './productPricing/';
import ProductSettingModal from './ProductModal.component';
import * as Styled from './productCatalog.styled';

/*************
 *   TYPES   *
 *************/

type Props = {
  theme?: 'light' | 'dark'
};

/*****************
 *   COMPONENT   *
 *****************/

const ProductCatalog = ({ theme = 'light' }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductSetting, setSelectedProductSetting] = useState({ productName: '', partnerUnitCostPrice: '' });

  const [selectedRecord, setSelectedRecord] = useState({ company: '', subscribedProduct: '' });

  const { isModalOpen, openModal, closeModal } = useModalProps();
  const modalProps = { isModalOpen, closeModal, openModal, ...selectedProductSetting };

  const handleReset = () => {
    setSelectedProduct('');
    setSelectedRecord({ company: '', subscribedProduct: '' });
  };

  const handleProductCardClick = name => {
    setSelectedProduct(name);
  };

  const handleSettings = (name, partnerUnitCost) => e => {
    e.stopPropagation();
    setSelectedProductSetting({ productName: name, partnerUnitCostPrice: partnerUnitCost });
    openModal();
  };

  const handleRowClick = (company, product) => {
    setSelectedRecord({ company: company, subscribedProduct: product });
  };

  const filterTableData = selectedProduct => {
    const matchItem = item => item.product === selectedProduct;
    return R.filter(matchItem, dataSource);
  };

  const tableData = selectedProduct ? filterTableData(selectedProduct) : [];

  const isRecordSelected = selectedRecord.company && selectedRecord.subscribedProduct;

  const filterCompanyProductOveride = () => {
    const matchItem = item =>
      item.company === selectedRecord.company && item.product === selectedRecord.subscribedProduct;
    return R.filter(matchItem, companyProductOveride);
  };

  const WIDGETS = [
    <Widget key="productBreakout" title={selectedProduct ? selectedProduct : 'Product Breakout'} subTitle="By Company">
      <ProductBreakout tableData={tableData} handleRowClick={handleRowClick} />
    </Widget>,
    <Widget
      key="companyPricing"
      title={
        isRecordSelected ? [selectedRecord.company, selectedRecord.subscribedProduct].join(' - ') : 'Product Pricing'
      }
      subTitle="Product Settings"
    >
      {isRecordSelected ? (
        filterCompanyProductOveride().map(item => {
          return <ProductPricing item={item} />;
        })
      ) : (
        <Styled.ProductPricingEmptyState>
          Select a company to see company specific pricing
        </Styled.ProductPricingEmptyState>
      )}
    </Widget>
  ];

  const renderWidgets = () => {
    return WIDGETS.map(e => e);
  };

  return (
    <>
      <Styled.CustomWidget key="productGallery">
        <ProductGallery
          handleReset={handleReset}
          products={PRODUCTS}
          handleSettings={handleSettings}
          handleProductCardClick={handleProductCardClick}
        />
      </Styled.CustomWidget>

      <Styled.Seperator />

      <SizeMe>
        {({ size }) => (
          <Responsive
            breakpoints={BREAKPOINTS}
            cols={COLS}
            containerWidth={size.width ? size.width : 0}
            width={size.width ? size.width : 0}
            className="layout"
            rowHeight={80}
            containerPadding={[24, 30]}
            margin={[24, 24]}
            isResizable={false}
            isDraggable={false}
            layouts={LAYOUTS}
          >
            {renderWidgets()}
          </Responsive>
        )}
      </SizeMe>

      <ProductSettingModal {...modalProps} />
    </>
  );
};

export default ProductCatalog;
