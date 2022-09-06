// @flow

import React, { useEffect } from 'react';
import { useTranslate } from '@accordo-feed/language.entry';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';

import * as Styled from './syncCustomersMessage.styled';
import lang from './syncCustomersMessage.lang';

const messageDuration = 10000;

/*************
 *   TYPES   *
 *************/

type Actions = {
  resetSyncCustomersMessageSettings: Function
};

type Props = {
  syncCustomersNum: number,
  isCustomersSynced: boolean,
  isShowSyncCustomersMessage: boolean,
  actions: Actions,
  syncCustomersTimeoutId: ?TimeoutID
};

/******************
 *   COMPONENTS   *
 ******************/

export default ({
  syncCustomersNum,
  isCustomersSynced,
  isShowSyncCustomersMessage,
  actions,
  syncCustomersTimeoutId
}: Props) => {
  const translate = useTranslate();
  const { syncingCustomerText, syncingCustomersText, syncedCustomersText } = lang;
  let langObj;

  useEffect(() => {
    if (isCustomersSynced) {
      // This is remove setTimeout which set from handlerLoadAllCustomers in src/utils/iot/handlers/partnerCenter.js
      syncCustomersTimeoutId && clearTimeout(syncCustomersTimeoutId);

      setTimeout(() => {
        actions.resetSyncCustomersMessageSettings();
      }, messageDuration);
    }
  }, [isCustomersSynced]);

  if (isCustomersSynced) {
    langObj = syncedCustomersText;
  } else {
    if (syncCustomersNum > 1) {
      langObj = syncingCustomersText;
    } else {
      langObj = syncingCustomerText;
    }
  }

  return (
    isShowSyncCustomersMessage && (
      <Styled.Wrapper>
        <Styled.Container success={isCustomersSynced}>
          {isCustomersSynced ? <CheckCircleOutlined /> : <SyncOutlined spin />}
          <Styled.Content>{translate(langObj, { count: syncCustomersNum })}</Styled.Content>
        </Styled.Container>
      </Styled.Wrapper>
    )
  );
};
