import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { mixins, constants } from '@accordo-feed/aco-styled-components';

import UIButton from 'src/components/UI/button';

const rowBotMargin = 20;
const { colors } = constants;

/****************
 *   WRAPPERS   *
 ****************/

export const AddCustomerWrapper = styled.div`
  ${mixins.boxShadow()};
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: -20px;
`;

export const NewCustomersWrapper = styled.div`
  button {
    font-size: 14px;
    min-width: 100px;
    text-align: center;
    border-radius: 2px;
  }
`;

export const RowWrapper = styled.div`
  margin: ${rowBotMargin}px 0;
`;

export const BottomWrapper = styled.div`
  display: flex;
  margin-top: ${rowBotMargin}px;
  gap: 20px;
`;

/***************
 *   ELEMENTS   *
 ***************/

export const IconClose = styled(CloseOutlined)`
  font-size: 20px;
  margin: 10px 10px 0 0;
  cursor: pointer;
  color: ${colors.lightShadeGrey};
`;

export const PlusSymbol = styled.span`
  margin-right: 5px;
`;

export const ButtonDelete = styled(UIButton)`
  margin-top: 30px;
  min-width: 20px !important;
`;

export const DropdownInputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
`;

export const DropdownAddButton = styled.div`
  flex: none;
  padding: 8px;
  cursor: pointer;
`;
