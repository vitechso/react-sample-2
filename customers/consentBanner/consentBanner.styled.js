import styled from 'styled-components';
import Banner from 'src/components/banner';
import { constants } from '@accordo-feed/aco-styled-components';

const { colors } = constants;

export const BannerAlert = styled(Banner)`
  background-color: ${colors.lightTintGrey};
  border-color: ${colors.lightTintGrey};
  margin-bottom: 10px;
`;
