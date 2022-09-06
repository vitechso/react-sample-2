import styled, { createGlobalStyle } from 'styled-components';
import { Modal as AntModal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { constants, mixins } from '@accordo-feed/aco-styled-components';
import {
  modalBackgroundColor,
  appTextColor,
  widgetBackground,
  widgetBorderColor,
  appLabelColor,
  pageHeaderTextColor
} from 'src/App.styled';

import UIButton from 'src/components/UI/button';

const { colors, fontSize, zIndex } = constants;

export const GlobalStyle = createGlobalStyle`
  .ant-modal-mask {
    z-index: ${zIndex + 5};
  }
`;

export const Modal = styled(AntModal).attrs({
  closable: true,
  centered: true,
  footer: null,
  zIndex: zIndex + 5,
  mask: true
})`
  animation-duration: 0s !important;
  .ant-modal-content {
    background: ${modalBackgroundColor};
    border: 2px solid ${widgetBorderColor};
    min-width: 480px;
  }

  .ant-modal-close {
    color: ${appTextColor};
  }

  .ant-modal-body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
  }
`;

export const SuccessHeader = styled.div`
  ${mixins.flexCenter()};
  min-height: 100px;
  background: ${widgetBackground};
`;

export const CheckIcon = styled(CheckCircleTwoTone)`
  font-size: 40px;
`;

export const HeaderText = styled.span`
  margin-left: 15px;
  color: ${appLabelColor};
`;

export const ContentWrapper = styled.div`
  padding: 0 40px 30px;
  background: ${widgetBackground};
  flex: 1;
`;

export const ContentTitle = styled.h1`
  color: ${pageHeaderTextColor};
  font-size: ${fontSize.large};
  text-align: center;
  margin: 10px 0 20px;
`;

export const DetailWrapper = styled.div`
  ${mixins.flexVerticalCenter()};
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const StepWrapper = styled.div`
  ${mixins.flexVerticalCenter()};
  min-width: 75px;
  font-size: ${fontSize.xSmall};
  background-color: ${colors.white};
  padding: 5px 15px;
  border-radius: 50px;
  color: ${colors.black};
`;

export const StepNumber = styled.span`
  padding: 3px 8px;
  border-radius: 50%;
  margin-left: 5px;
  background-color: ${colors.darkCyan};
  color: ${colors.white};
`;

export const DescriptionWrapper = styled.div`
  margin-left: 20px;
  color: ${appTextColor};
`;

export const ParagraphTitle = styled.div`
  font-weight: 400;
  color: ${appLabelColor};
  font-size: ${fontSize.medium};
  padding: 4px 0;
`;

export const Paragraph = styled.div`
  text-align: left;
`;

export const ContinueButton = styled(UIButton).attrs({
  size: 'large',
  variant: 'primary'
})`
  font-size: ${fontSize.normal};
  width: 100%;
  border-radius: 180px;
`;

export const NoteText = styled.div`
  font-size: ${fontSize.xSmall};
  margin-top: 15px;
  color: ${appTextColor};
`;
