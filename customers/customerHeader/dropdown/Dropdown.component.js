// @flow

import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { useTranslate } from '@accordo-feed/language.entry';
import { constants } from '@accordo-feed/aco-styled-components';

import { PATHS, EXTERNAL_LINKS } from 'src/constants';
import * as Styled from './dropdown.styled';
import lang from './dropdown.lang';

const MenuItem = Menu.Item;
const { zIndex } = constants;

/*************
 *   TYPES   *
 *************/
type ActionsType = {
  connectPartnerCenter: Function,
  setBulkEditView: Function,
  setStep: Function
};

type Props = {
  actions: ActionsType,
  children: React.Node,
  isConnected: boolean,
  isSecureApp: boolean,
  router: Object
};

/*****************
 *   COMPONENT   *
 *****************/

export default ({ actions, children, isConnected, isSecureApp, router, ...restProps }: Props) => {
  const translate = useTranslate();

  const onAppSettingClick = () => {
    actions.setStep(1);
    router.push(PATHS.SECURE_APP);
  };

  const onEditClientsClick = () => {
    actions.setBulkEditView(true);
  };

  const onHelpDocsClick = () => {
    window.open(EXTERNAL_LINKS.ONLINE_HELP_DOC_LINK, '_blank');
  };

  const onImportClientsClick = () => {
    actions.connectPartnerCenter();
  };

  const overlay = (
    <Styled.Menu>
      <MenuItem key="reconfigure" onClick={onAppSettingClick}>
        {translate(lang[isConnected && isSecureApp ? 'reconfigureApp' : 'appSetup'])}
      </MenuItem>
      {isConnected && isSecureApp && (
        <MenuItem key="edit" onClick={onEditClientsClick}>
          {translate(lang.editCompanies)}
        </MenuItem>
      )}
      <MenuItem key="import" onClick={onImportClientsClick}>
        {translate(lang.importCompanies)}
      </MenuItem>
      <MenuItem key="help" onClick={onHelpDocsClick}>
        {translate(lang.helpDocs)}
        <Styled.DocsIcon />
      </MenuItem>
    </Styled.Menu>
  );

  const props = {
    overlay,
    placement: 'bottomRight',
    trigger: [isConnected ? 'click' : 'hover'],
    overlayStyle: {
      zIndex
    },
    ...restProps
  };

  return <Dropdown {...props}>{children}</Dropdown>;
};
