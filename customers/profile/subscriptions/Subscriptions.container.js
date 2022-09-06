// @flow

import React from 'react';
import SubscriptionsComponent from './Subscriptions.component';

type Props = {
  subscriptions: Array<Object>
};

const Subscriptions = ({ subscriptions }: Props) => <SubscriptionsComponent dataSource={subscriptions} />;

export default Subscriptions;
