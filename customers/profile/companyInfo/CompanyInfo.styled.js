import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';
import { appLabelColor, appTextColor, subHeaderTextColor, popOverBackground } from 'src/App.styled';
import { Avatar } from 'antd';

const { colors, fontSize } = constants;

export const RootWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 20px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.darkCyan};
  border-radius: 100%;
  padding: 3px;
  box-shadow: 0 0 10px ${colors.darkCyan};
  width: 60px;
  height: 60px;
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
`;

export const UserAvatars = styled(Avatar)`
  && {
    font-size: ${fontSize.normal} !important;
    background-color: ${popOverBackground};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    color: ${appTextColor};
  }
`;

export const SpinContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 0;
  justify-content: center;
`;

export const Label = styled.div`
  color: ${appLabelColor};
  font-size: ${fontSize.small};
  font-weight: normal;
`;

export const Value = styled.div`
  color: ${subHeaderTextColor};
  font-size: ${fontSize.small};
  word-break: break-word;
  ${props => (props.isLink ? 'text-decoration: underline;' : '')}
`;
