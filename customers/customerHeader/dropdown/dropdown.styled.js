import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import { constants } from '@accordo-feed/aco-styled-components';
import { appTextColor, bodyBackground, widgetBorderColor } from 'src/App.styled';

const { fontSize } = constants;

export const Menu = styled(AntMenu)`
  background-color: ${bodyBackground};
  border: 1px solid ${widgetBorderColor};
  .ant-dropdown-menu-item {
    background-color: ${bodyBackground};
    color: ${appTextColor};
    font-size: ${fontSize.xSmall};
    &:last-child {
      border-top: 1px solid ${widgetBorderColor};
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const DocsIcon = styled(ImportOutlined)`
  transform: rotate(180deg);
  margin-left: 8px;
`;
