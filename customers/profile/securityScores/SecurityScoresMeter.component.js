import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import * as R from 'ramda';
import { constants } from '@accordo-feed/aco-styled-components';
import * as Styled from './securityScoresMeter.styled';

const { colors } = constants;

const Chart = styled(ReactECharts).attrs({
  style: {
    height: 250,
    width: '100%'
  }
})``;

export default ({ securityScore, theme }) => {
  const percentage = R.pathOr(0, ['percentage'], securityScore);
  const currentScore = R.pathOr(0, ['currentScore'], securityScore);
  const maxScore = R.pathOr(0, ['maxScore'], securityScore);
  const option = useMemo(
    () => ({
      series: [
        {
          type: 'gauge',
          startAngle: 270,
          endAngle: -90,
          itemStyle: {
            color: colors.aquaBlue
          },
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: false
          },
          axisLine: {
            lineStyle: {
              width: 20
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 20
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            show: true,
            width: '60%',
            offsetCenter: [0, 0],
            formatter: function(value) {
              return '{value|' + value + '}{unit|%}';
            },
            rich: {
              value: {
                fontSize: 30,
                fontWeight: 'bolder',
                fontFamily: 'Poppins',
                color: 'inherit'
              },
              unit: {
                fontSize: 20,
                color: 'inherit',
                padding: [-15, 0, 0, 5]
              }
            }
          },
          data: [{ value: percentage }]
        }
      ]
    }),
    [securityScore]
  );

  return (
    <>
      <Chart option={option} />
      <Styled.Wrapper>
        <Row type="flex">
          <Col xs={12}>
            <Styled.NumberBox>
              <Styled.NumberLabel theme={theme}>{currentScore}</Styled.NumberLabel>
              <Styled.Text>Current Score</Styled.Text>
            </Styled.NumberBox>
          </Col>
          <Col xs={12}>
            <Styled.NumberBox>
              <Styled.NumberLabel theme={theme}>{maxScore}</Styled.NumberLabel>
              <Styled.Text>Max Score</Styled.Text>
            </Styled.NumberBox>
          </Col>
        </Row>
      </Styled.Wrapper>
    </>
  );
};
