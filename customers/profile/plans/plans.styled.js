import styled from 'styled-components';
import { Link as RouterLink } from 'react-router';
import { appTextColor } from 'src/App.styled';

export const Link = styled(RouterLink)`
  color: ${appTextColor} !important;
  text-decoration: underline;
`;
