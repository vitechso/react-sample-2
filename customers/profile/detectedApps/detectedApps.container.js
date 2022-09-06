// @flow

import React from 'react';
import DetectedAppsComponent from './DetectedApps.component';

type Props = {
  data: Array<Object>
};

const DetectedApps = ({ data }: Props) => <DetectedAppsComponent dataSource={data} />;

export default DetectedApps;
