import styled from 'styled-components';
import { mixins, constants } from '@accordo-feed/aco-styled-components';
import { hexToRgb } from 'src/utils';

const { colors, fontSize, zIndex, borderRadius } = constants;

export const Wrapper = styled.div`
  ${mixins.flexCenter()};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  z-index: ${zIndex + 5};
`;

export const Container = styled.div`
  background-color: rgba(${hexToRgb(colors.black)}, 0.78);
  border-bottom: 3px solid ${props => (props.success ? colors.shadeGreen : colors.blue)};
  border-radius: ${borderRadius};
  box-shadow: 0 4px 12px rgba(${hexToRgb(colors.black)}, 0.15);
  color: ${colors.white};
  padding: 10px 16px;
  .anticon {
    color: ${colors.white};
    font-size: ${fontSize.normal};
    margin-right: 8px;
  }
`;

export const Content = styled.span`
  font-size: ${fontSize.small};
`;
