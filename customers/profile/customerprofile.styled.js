import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { constants } from '@accordo-feed/aco-styled-components';
import Widget from 'src/components/widget';
import { appLabelColor } from 'src/App.styled';

const { fontSize } = constants;
export const width = '1300px';

export const Label = styled.span`
  color: ${appLabelColor};
  font-size: ${fontSize.xsmall};
  line-height: 18px;
`;

export const Chart = styled(ReactECharts).attrs({
  style: {
    height: '100%',
    width: '100%'
  }
})``;

export const CustomWidget = styled(Widget)`
  .widget-body {
    padding: 15px;
  }
`;

export const BudgetInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const BudgetInfo = styled.div``;
