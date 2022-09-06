import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';
import { appTextColor } from 'src/App.styled';

const { colors, fontSize } = constants;

export const UserActive = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => (props.active ? colors.lightGreen : colors.alertRed)};
`;

export const EmailWrapper = styled.div`
  min-height: 55px;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    padding: 9px 6px;
    word-break: break-all;
  }

  a {
    color: ${appTextColor};
  }
`;

export const WidgetBodyInner = styled.div`
  height: 100%;
`;

export const UserLinkImg = styled.img`
  display: none;
  width: 18px;
  height: 18px;
`;

export const UserNameWrapper = styled.div`
  display: flex;

  &:hover {
    ${UserLinkImg} {
      display: block;
    }
  }
`;

export const UserLink = styled.a.attrs({
  rel: 'noopener noreferrer',
  target: '_blank'
})`
  margin-left: 10px;
  cursor: pointer;
  font-size: ${fontSize.small};
`;
