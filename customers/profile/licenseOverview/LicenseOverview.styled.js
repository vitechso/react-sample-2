import styled from 'styled-components';
import { constants } from '@accordo-feed/aco-styled-components';

import { NumberBox } from 'src/pages/dashboard/widgets/opportunitiesHighlights/opportunitiesHighlights.styled';
import { Tooltip } from 'src/pages/page.styled';
import { tableHeaderTextColor } from 'src/App.styled';

const { colors, fontSize } = constants;

export const LicenseTooltip = styled(Tooltip)`
  position: absolute;
  right: 6px;
`;

export const LicenseBoxWrapper = styled.div`
  display: flex;
  gap: 22px 0;
  flex-wrap: wrap;
`;

export const LicenseNumberBox = styled(NumberBox)`
  justify-content: flex-end;
  width: 25%;
  && {
    border-color: rgba(121, 199, 255, 0.5);
  }

  label {
    color: ${colors.lightGrey4};
    font-size: ${fontSize.xxSmall};
    line-height: 100%;
    margin-top: 10px;
  }

  span {
    color: ${tableHeaderTextColor};
    font-size: ${fontSize.large};
    line-height: 23px;
    font-weight: bold;
  }

  &.total-users {
    border-right: none;
    label {
      margin-top: 0;
    }
    span {
      color: ${colors.aquaBlue};
      font-size: 30px;
      line-height: 2.5rem;
    }
  }

  &.licenses {
    border-right: none;
    label {
      margin-top: 0;
    }
    span {
      color: ${colors.aquaGreen};
      font-size: 30px;
      line-height: 2.5rem;
    }
  }

  &.unassigned {
    border-right: none;
    label {
      margin-top: 0;
    }
    span {
      color: ${colors.aquaRed};
      font-size: 30px;
      line-height: 2.5rem;
    }
  }

  &.misassigned-licenses {
    border-right: none;
    label {
      margin-top: 0;
    }
    span {
      color: ${colors.warmYellowColor};
      font-size: 30px;
      line-height: 2.5rem;
    }
  }
`;
