// @flow

import React, { useState } from 'react';
import moment from 'moment';
import { useTranslate } from '@accordo-feed/language.entry';

import * as Styled from './customerHeader.styled';
import CompleteModal from 'src/components/completeModal';
import Dropdown from './dropdown';
import lang from './customerHeader.lang';
import {
  DeleteConfirmationModal,
  DeleteOkButton,
  DeleteCancelButton
} from 'src/pages/customers/customerDrawer/customerDrawer.styled';

/*************
 *   TYPES   *
 *************/

type Props = {
  actions: Object,
  isConnected: boolean,
  isFailedConnected: boolean,
  isLoading: boolean,
  isSecureApp: boolean,
  lastUpdated: string,
  spinner: Object,
  totalPartnerCenterCustomers: number
};

/*****************
 *   COMPONENT   *
 *****************/

const Status = ({ hasError, lastUpdated }) => {
  const translate = useTranslate();
  const timeAgo = moment.utc().from(moment.utc(lastUpdated), true);

  return (
    <Styled.StatusWrapper>
      <span>
        <Styled.StatusIndicator connected={!hasError} />
        {translate(hasError ? lang.failed : lang.connected)}
      </span>
      {!hasError && <Styled.LastUpdated>{translate(lang.updated, { time: timeAgo })}</Styled.LastUpdated>}
    </Styled.StatusWrapper>
  );
};

export default ({
  actions,
  isConnected,
  isFailedConnected,
  isLoading,
  isSecureApp,
  lastUpdated,
  spinner,
  totalPartnerCenterCustomers
}: Props) => {
  const [showDeleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const translate = useTranslate();

  const showStatus = isConnected || isFailedConnected;

  return (
    <Styled.HeaderWrapper>
      <Styled.LeftContainer>
        <Styled.MicrosoftLogo />
        <Styled.HeaderTitle>{translate(lang.title)}</Styled.HeaderTitle>
      </Styled.LeftContainer>

      <Styled.RightContainer>
        {!isLoading && (
          <>
            <Styled.InfoContainer>
              {isConnected ? (
                <Styled.NumberOfCustomers>
                  {translate(lang[isSecureApp ? 'numberOfAppConnectCustomers' : 'numberOfCustomers'], {
                    count: totalPartnerCenterCustomers
                  })}
                </Styled.NumberOfCustomers>
              ) : (
                !isFailedConnected && translate(lang.info)
              )}
            </Styled.InfoContainer>

            <Styled.StatusContainer>
              {showStatus && <Status hasError={isFailedConnected} lastUpdated={lastUpdated} />}
              <Dropdown>
                {isConnected ? (
                  <Styled.MoreHorizIcon />
                ) : (
                  <Styled.ConnectButton>
                    {translate(lang.connect)}
                    <Styled.DownIcon />
                  </Styled.ConnectButton>
                )}
              </Dropdown>
            </Styled.StatusContainer>
          </>
        )}
        {spinner}
      </Styled.RightContainer>

      {/* Modal with confirmation button to remove PC connection */}
      <DeleteConfirmationModal
        title={translate(lang.disconnectPC)}
        visible={showDeleteConfirmationModal}
        footer={[
          <DeleteOkButton
            key="ok"
            onClick={() => {
              setDeleteConfirmationModal(false);
              setSuccessModal(true);
            }}
          >
            {translate(lang.confirmDisconnect)}
          </DeleteOkButton>,
          <DeleteCancelButton key="cancel" onClick={() => setDeleteConfirmationModal(false)}>
            {translate(lang.cancel)}
          </DeleteCancelButton>
        ]}
        onCancel={() => setDeleteConfirmationModal(false)}
      >
        <div>{translate(lang.disconnectWarning)}</div>
      </DeleteConfirmationModal>

      {/* PC connection removal confirmation popup */}
      <CompleteModal visible={showSuccessModal} onCancel={() => setSuccessModal(false)}>
        <span>{translate(lang.disconnectedSuccessfully)}</span>
      </CompleteModal>
    </Styled.HeaderWrapper>
  );
};
