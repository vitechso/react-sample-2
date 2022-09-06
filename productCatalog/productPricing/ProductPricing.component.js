import React, { useState, useEffect } from 'react';

import { Tooltip } from 'src/pages/page.styled';
import * as Styled from '../productCatalog.styled';

/*************
 *   TYPES   *
 *************/

export type Actions = {};

type Props = {
  item: Object
};

/*****************
 *   COMPONENT   *
 *****************/

function ProductPricing({ item }: Props) {
  const [priceToCustomer, setPriceToCustomer] = useState('');

  useEffect(() => {
    setPriceToCustomer(item.priceToCustomer);
  }, [item]);

  const handleChange = e => {
    setPriceToCustomer(e.target.value);
  };

  return (
    <Styled.ProductDetailsWrapper>
      <Styled.ProductDetailsRow>
        <Styled.Label>Vendor:</Styled.Label>
        <Styled.Value>Microsoft</Styled.Value>
      </Styled.ProductDetailsRow>
      <Styled.ProductDetailsRow>
        <Styled.Label>Type:</Styled.Label>
        <Styled.Value>Base</Styled.Value>
      </Styled.ProductDetailsRow>
      <Styled.ProductDetailsRow>
        <Styled.Label>Reference URL:</Styled.Label>
        <Styled.Value>https://</Styled.Value>
      </Styled.ProductDetailsRow>

      <Styled.ProductBlock>
        <Styled.Title>Pricing</Styled.Title>
        <Tooltip title="Pricing of product" />
      </Styled.ProductBlock>

      <Styled.Field>
        <Styled.Label>Partner Unit Cost</Styled.Label>
        <Styled.Input value={item.partnerUnitCost} readOnly="readonly" />
      </Styled.Field>

      <Styled.Field>
        <Styled.Label>MSRP (USD)</Styled.Label>
        <Styled.Input value={item.msrp} readOnly="readonly" />
      </Styled.Field>

      <Styled.Field>
        <Styled.Label>Price to Customer</Styled.Label>
        <Styled.Input value={priceToCustomer} onChange={e => handleChange(e)} />
      </Styled.Field>
    </Styled.ProductDetailsWrapper>
  );
}

export default ProductPricing;
