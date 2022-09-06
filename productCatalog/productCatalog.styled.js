import styled from 'styled-components';
import { Input as AntInput, Carousel } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { constants } from '@accordo-feed/aco-styled-components';

import Widget from 'src/components/widget';
import { WidgetHeaderWrapper } from 'src/components/widget/widget.styled';
import { hexToRgb } from 'src/utils';
import { appTextColor, widgetBackground, widgetBorderColor, pageHeaderTextColor, appLabelColor } from 'src/App.styled';

const { colors } = constants;

export const CustomWidget = styled(Widget)`
  border: 0;
  border-radius: 0;
  background: none;
  padding: 0 0 40px;
  box-shadow: none;
`;

export const CustomWidgetHeaderWrapper = styled(WidgetHeaderWrapper)`
  padding: 11px 24px;
  font-size: 18px;
`;

export const CustomSlider = styled(Carousel)`
  padding: 0 12px;
  color: ${appTextColor};

  .slick-list {
    .slick-slide {
      pointer-events: auto;
      > div {
        margin: 0 10px;
      }
    }
  }

  .slick-prev {
    left: 6px;
  }

  .slick-next {
    right: 6px;
    transform: translateY(-50%);
  }

  /* stylelint-disable property-no-vendor-prefix */
  .slick-next,
  .slick-prev {
    position: absolute;
    z-index: 999;
    top: 50%;
    width: 30px;
    height: 30px;
    transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    cursor: pointer;
    border: none;
    outline: 0;
    box-shadow: rgba(9, 30, 66, 0.08) 0 0 0 1px, rgba(9, 30, 66, 0.08) 0 2px 4px 1px;
    background: rgba(207, 207, 206, 0.5);
    border-radius: 180px;
    font-size: 40px;
    color: ${colors.skyBlue};
    line-height: 0.4;
    &:hover {
      color: ${colors.skyBlue};
      background: rgba(207, 207, 206, 0.5);
    }

    &::before {
      content: '';
      display: none;
    }
  }

  .slick-dots {
    position: absolute;
    bottom: -30px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;

    li {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;

      button {
        font-size: 0;
        line-height: 0;
        display: block;
        width: 20px;
        height: 20px;
        padding: 5px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: 0;
        background: 0 0;

        &::before {
          font-size: 40px;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: '•';
          text-align: center;
          color: ${colors.skyBlue};
        }
      }

      &.slick-active {
        width: 20px;
        button {
          background: none;
          &::before {
            opacity: 0.75;
            color: ${colors.skyBlue};
          }
        }
      }
    }
  }
`;

export const Seperator = styled.hr`
  margin: 0 24px;
  border-color: ${widgetBorderColor};
`;

export const Product = styled.div`
  border-radius: 10px;
  padding: 15px;
  border: 1px solid ${widgetBorderColor};
  background: ${widgetBackground};
  cursor: pointer;
  &:hover {
    border: 1px solid ${colors.blue};
  }
  &:focus,
  &:active {
    border: 1px solid ${colors.blue};
    box-shadow: 0 0 22px rgba(${hexToRgb(colors.blue)}, 0.6);
  }
`;

export const ProductHeader = styled.div`
  margin-bottom: 31px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductName = styled.div`
  color: ${colors.skyBlue};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductInfoLeft = styled.span``;

export const ProductInfoRight = styled.span``;

export const ProductDetailsWrapper = styled.div`
  padding: 8px 15px;
`;

export const ProductDetailsRow = styled.div`
  display: flex;
`;

export const Label = styled.div`
  color: ${appTextColor};
`;

export const Value = styled.div`
  color: ${appLabelColor};
  margin-left: 10px;
`;

export const ProductBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.div`
  color: ${pageHeaderTextColor};
  font-size: 16px;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const ProductPricingEmptyState = styled.div`
  padding: 15px;
`;

export const Input = styled(AntInput)`
  color: ${appTextColor};
  border-radius: 6px;
  min-height: 29px;
  width: 50px;
  border: 1px solid ${colors.lightGrey};
  padding: 4px 6px;
  background-color: ${widgetBorderColor};
  margin-left: 10px;
  text-align: right;
  &:hover,
  &:active,
  &:focus {
    border-color: ${props => props.readOnly && colors.lightGrey};
  }
`;

export const Arrow = styled.div`
  text-align: center;
`;

export const SettingIcon = styled(SettingOutlined)`
  color: ${colors.darkGrey};
`;

export const ProductActionsWrap = styled.div`
  display: flex;
  gap: 10px;
`;
