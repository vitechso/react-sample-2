// @flow

import * as R from 'ramda';
import React from 'react';
import { useTranslate } from '@accordo-feed/language.entry';

import BulkEditTable from 'src/pages/customers/bulkEditTable';
import UIButton from 'src/components/UI/button';
import Search from 'src/components/search';
import { onSearchChange } from 'src/components/search/seach.util';
import * as Styled from './bulkEditView.styled';
import lang from './bulkEditView.lang';

/*************
 *   TYPES   *
 *************/

type ActionsType = {
  setIsCheckedState: Function,
  syncClientsData: Function,
  setBulkEditView: Function,
  setSelectedRowKeys: Function,
  setSearchTerm: Function
};

type Props = {
  actions: ActionsType,
  isChecked: boolean,
  selectedRowKeys: Array<String>,
  totalCount: number,
  allAvailableKeyCount: number,
  isLoading: boolean,
  theme: string,
  editFromDropdown: boolean,
  searchTerm: string,
  originalDataSource: Array<Object>
};

/*****************
 *   COMPONENT   *
 *****************/

export default ({
  actions,
  isChecked,
  selectedRowKeys,
  totalCount,
  allAvailableKeyCount,
  isLoading,
  theme,
  editFromDropdown,
  searchTerm
}: Props) => {
  const translate = useTranslate();

  const onCancelClicked = () => {
    actions.setBulkEditView(false);
    actions.setSelectedRowKeys([]);
  };

  return (
    <Styled.BulkEditViewWrapper>
      <Styled.ImportClientWrapper>
        <Styled.Wrap>
          <Search
            searchTerm={searchTerm}
            placeholder={translate(lang.table.searchBarPlaceholder)}
            onChange={onSearchChange(actions.setSearchTerm)}
          />

          <Styled.SelectedImportCount
            checked={isChecked}
            indeterminate={!!selectedRowKeys.length && selectedRowKeys.length < allAvailableKeyCount}
            onChange={() => actions.setIsCheckedState(!isChecked)}
            disabled={isLoading || allAvailableKeyCount === 0}
          >
            {translate(lang.header, { amount: selectedRowKeys.length, total: totalCount })}
          </Styled.SelectedImportCount>
        </Styled.Wrap>
        <Styled.ButtonGroupWrapper>
          <UIButton variant="outline" onClick={onCancelClicked}>
            {translate(lang.cancelButton)}
          </UIButton>
          <UIButton
            variant="primary"
            margin="0 0 0 15px"
            theme={theme}
            onClick={actions.syncClientsData}
            disabled={isLoading || R.isEmpty(selectedRowKeys)}
          >
            {translate(lang.syncButton)}
          </UIButton>
        </Styled.ButtonGroupWrapper>
      </Styled.ImportClientWrapper>
      <BulkEditTable />
    </Styled.BulkEditViewWrapper>
  );
};
