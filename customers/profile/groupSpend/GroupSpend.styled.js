import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';

export const SpinContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Chart = styled(ReactEcharts).attrs({
  style: {
    width: '100%',
    height: '100%'
  }
})``;
