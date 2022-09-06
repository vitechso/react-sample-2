import styled from 'styled-components';
import { Button, Checkbox } from 'antd';
import { constants, mixins } from '@accordo-feed/aco-styled-components';

import { DeleteCancelButton } from 'src/pages/customers/customerDrawer/customerDrawer.styled';
import { HeadWrapper } from 'src/pages/customers/customers.styled';
import { appTextColor, tableEvenRowBackground, bodyBackground } from 'src/App.styled';

const { colors, fontSize, zIndex } = constants;

export const BulkEditViewWrapper = styled.div`
  position: absolute;
  z-index: ${zIndex + 4};
  height: 100%;
  width: 100%;
  background: ${bodyBackground};
  margin-top: -50px;
`;

export const ImportClientWrapper = styled(HeadWrapper)`
  height: 110px;
  background: ${tableEvenRowBackground};
  margin: 0;
  padding: 0 15px;
`;

export const SelectedImportCount = styled(Checkbox)`
  color: ${appTextColor};
  font-size: ${fontSize.normal};
  margin-top: 20px;
  .ant-checkbox {
    & + span {
      color: ${appTextColor};
    }
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    background-color: ${colors.lightTintGrey} !important;
  }
`;

export const ImportClientButton = styled(Button).attrs({
  type: 'primary',
  size: 'large'
})`
  border-radius: 0;
`;

export const ButtonGroupWrapper = styled.div`
  ${mixins.flexCenter()};
`;

export const CancelViewButton = styled(DeleteCancelButton)`
  margin-right: 5px;
  font-size: ${fontSize.normal};
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-left: 0;
  }
`;
