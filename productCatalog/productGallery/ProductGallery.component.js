import React from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { ButtonElement, constants } from '@accordo-feed/aco-styled-components';

import { renderSpend } from 'src/pages/masterList/masterList.config';
import { Tooltip } from 'src/pages/page.styled';
import { numberFormatter } from '../constants';
import * as Styled from '../productCatalog.styled';

const { colors } = constants;

/*************
 *   TYPES   *
 *************/

export type Actions = {};

type Props = {
  products: Array<Object>,
  handleProductCardClick: Function,
  handleReset: Function
};

/*****************
 *   COMPONENT   *
 *****************/

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <Styled.Arrow className={className} style={{ ...style }} onClick={onClick}>
      <LeftOutlined style={{ fontSize: 18, color: colors.darkCyan }} />
    </Styled.Arrow>
  );
};

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <Styled.Arrow className={className} style={{ ...style }} onClick={onClick}>
      <RightOutlined style={{ fontSize: 18, color: colors.darkCyan }} />
    </Styled.Arrow>
  );
};

const settings = {
  dots: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function ProductGallery({ handleReset, products, handleSettings, handleProductCardClick }: Props) {
  return (
    <>
      <Styled.CustomWidgetHeaderWrapper>
        Products
        <ButtonElement type="link" onClick={handleReset}>
          Reset
        </ButtonElement>
      </Styled.CustomWidgetHeaderWrapper>

      <Styled.CustomSlider {...settings}>
        {products.map(product => {
          const { id, name, msrp, partnerUnitCost, seats, addons, spend } = product;
          return (
            <Styled.Product key={id} onClick={() => handleProductCardClick(name)}>
              <Styled.ProductHeader>
                <Styled.ProductName>{name}</Styled.ProductName>
                <Styled.ProductActionsWrap>
                  <Tooltip title={`Product info for ${name}`} />
                  <div onClick={handleSettings(name, partnerUnitCost)}>
                    <Styled.SettingIcon />
                  </div>
                </Styled.ProductActionsWrap>
              </Styled.ProductHeader>
              <Styled.ProductInfo>
                <Styled.ProductInfoLeft>MSRP</Styled.ProductInfoLeft>
                <Styled.ProductInfoRight>{renderSpend(msrp)}</Styled.ProductInfoRight>
              </Styled.ProductInfo>
              <Styled.ProductInfo>
                <Styled.ProductInfoLeft>Partner Unit Cost</Styled.ProductInfoLeft>
                <Styled.ProductInfoRight>{renderSpend(partnerUnitCost)}</Styled.ProductInfoRight>
              </Styled.ProductInfo>
              <Styled.ProductInfo>
                <Styled.ProductInfoLeft>Seats</Styled.ProductInfoLeft>
                <Styled.ProductInfoRight>{numberFormatter.format(seats)}</Styled.ProductInfoRight>
              </Styled.ProductInfo>
              <Styled.ProductInfo>
                <Styled.ProductInfoLeft>Seats w/ Addons</Styled.ProductInfoLeft>
                <Styled.ProductInfoRight>{addons}</Styled.ProductInfoRight>
              </Styled.ProductInfo>
              <Styled.ProductInfo>
                <Styled.ProductInfoLeft>Spend</Styled.ProductInfoLeft>
                <Styled.ProductInfoRight>{renderSpend(spend)}</Styled.ProductInfoRight>
              </Styled.ProductInfo>
            </Styled.Product>
          );
        })}
      </Styled.CustomSlider>
    </>
  );
}

export default ProductGallery;
