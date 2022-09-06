// @flow
import * as R from 'ramda';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { pdf } from '@react-pdf/renderer';
import FileSaver from 'file-saver';
import { ButtonElement } from '@accordo-feed/aco-styled-components';
import { LanguageEntry, useTranslate } from '@accordo-feed/language.entry';

import CompanyName from 'src/components/companyName';
import CheckboxGroup from 'src/components/checkboxGroup';
import CompleteModal from 'src/components/completeModal';
import VerticalMenu from 'src/components/verticalMenu';
import Widget from 'src/components/widget';
import SimpleTable from 'src/components/simpleTable';
import StyledLink from 'src/components/link';
import SucessfulSecureAppModal from 'src/pages/customers/sucessfulSecureAppModal';
import { onSearchChange } from 'src/components/search/seach.util';
import { CUSTOMER_CONNECTION_STATUS, CUSTOMER_TYPES, PATHS } from 'src/constants';
import { isValidImage, sortByAlph, sortByDate, sortByNumber, dateConverter } from 'src/utils';
import { Status } from 'src/components/widget/widget.styled';

import Dropdown from '../customers/customerHeader/dropdown';
import AddCustomer from './addCustomer';
import BulkEditView from './bulkEditView';
import CustomerDrawer from './customerDrawer';
import PdfReport from './CustomerPDF.report';
import SyncCustomersMessage from './syncCustomersMessage';
import { CUSTOMER_DELETED_STATES } from './customerDrawer/customerDrawer.constants';
import { CONNECTION_STATES } from './customers.constants';
import { customerUtils } from './customers.utils';
import type { CustomerType } from './customerTable/CustomerTable.component';
import { lang as drawerLang } from './customerDrawer/customerDrawer.lang';
import { lang } from './customers.lang';
import * as apiCalls from './customers.api';
import * as Styled from './customers.styled';

const tableLang = lang.table;

const options = [
  'Company Details',
  'Pause Sync',
  'Remove Company',
  'Edit Company',
  'Start Manual Refresh',
  'Copy Invite Link'
];

const now = new Date();

/*************
 *   TYPES   *
 *************/

export type Actions = {
  getCustomerSuccess: Function,
  setAddDialogOpened: Function,
  setCustomerDeletedState: Function,
  setSearchTerm: Function,
  actionButtonClicked: Function,
  pauseSyncConnection: Function,
  refreshOffice365: Function,
  handleCustomerReProcess: Function,
  setCustomerLoadingState: Function,
  setCustomerDrawerFormUpdated: Function,
  copyCompanyInviteLink: Function,
  setSelectedCustomerId: Function,
  resetCustomer: Function,
  showErrorToaster: Function
};

type Props = {
  actions: Actions,
  customerDeletedState: string,
  customers: Array<CustomerType>,
  formatCurrency: Function,
  isLoading: boolean,
  translate: Function,
  searchTerm: string,
  router: Object,
  isBulkEditView: boolean,
  bulkEditData: Array<Object>,
  selectedCustomerId: string
};

/*****************
 *   COMPONENT   *
 *****************/

const NormalUserView = props => {
  const {
    actions: { setCustomerDeletedState },
    customerDeletedState,
    customers,
    filters,
    searchTerm,
    onChangeFilters
  } = props;
  // const oldPermissionCount = R.filter(customerUtils.isNeedPermissions, customers).length;
  const activeConnectionsCount = R.filter(customerUtils.isConnected, customers).length;
  // const showSecurityBanner = oldPermissionCount > 0;
  const translate = useTranslate();

  return (
    <>
      <Styled.MiddleWrapper>
        <Styled.StyledSearch
          searchTerm={searchTerm}
          placeholder={translate(tableLang.searchBarPlaceholder)}
          onChange={onSearchChange(props.actions.setSearchTerm)}
        />
        <Styled.FilterWrapper>
          <Styled.FilterGroups>
            <Styled.FilterTitle>{translate(lang.filter.type)}</Styled.FilterTitle>
            <CheckboxGroup
              options={CUSTOMER_TYPES}
              value={filters.type}
              onChange={e => onChangeFilters({ ...filters, type: e })}
            />
          </Styled.FilterGroups>
          <Styled.FilterGroups>
            <Styled.FilterTitle>{translate(lang.filter.status)}</Styled.FilterTitle>
            <CheckboxGroup
              options={CUSTOMER_CONNECTION_STATUS}
              value={filters.status}
              onChange={e => onChangeFilters({ ...filters, status: e })}
            />
          </Styled.FilterGroups>
        </Styled.FilterWrapper>
      </Styled.MiddleWrapper>
      <Styled.HeadWrapper>
        <Styled.ActiveConnectionsCount>
          <span>{translate(tableLang.activelyConnected, { count: activeConnectionsCount })} / </span>
          <span>{translate(tableLang.total, { count: customers.length })}</span>
        </Styled.ActiveConnectionsCount>
        {/* {!showSecurityBanner && (
          <Styled.WarningWrapper>
            <Styled.WarningIcon />
            {translate(tableLang.totalPermissionWarnings, { oldPermissionCount })}
          </Styled.WarningWrapper>
        )} */}
      </Styled.HeadWrapper>

      <AddCustomer />
      <CustomerDrawer />

      <CompleteModal
        visible={customerDeletedState === CUSTOMER_DELETED_STATES.DELETED}
        onCancel={() => {
          setCustomerDeletedState(CUSTOMER_DELETED_STATES.HIDE);
        }}
      >
        <span>{translate(drawerLang.deleteCustomer.deleteNotice)}</span>
      </CompleteModal>
    </>
  );
};

export default (props: Props) => {
  const { actions, customers, isBulkEditView, router } = props;
  const { location } = router;

  const [generating, setGenerating] = useState(null);
  const [filters, setFilters] = useState({ type: [], status: [] });

  const dataSource = useMemo(() => {
    let temp = customers;
    if (!R.isEmpty(filters.type)) {
      temp = R.filter(customer => R.includes(customer.organizationType, filters.type), temp);
    }
    if (!R.isEmpty(filters.status)) {
      temp = R.filter(customer => R.includes(customer.office365Status, filters.status), temp);
    }
    return temp;
  }, [customers, filters]);

  useEffect(() => {
    const { state } = location;
    if (state?.filters) setFilters(state.filters);
  }, [location]);

  const handleClickMenu = company => e => {
    switch (e) {
      case 'Company Details':
        router.push(PATHS.CUSTOMERS.PROFILE.replace(/:id/, company.id));
        break;

      case 'Pause Sync':
        actions.pauseSyncConnection(company);
        break;

      case 'Delete History':
      case 'Link Connection':
        actions.actionButtonClicked(company);
        break;

      case 'Start Manual Refresh':
        actions.refreshOffice365(company.id);
        break;

      case 'Link Connection again':
        actions.handleCustomerReProcess(company);
        break;

      case 'Remove Company':
        actions.setSelectedCustomerId(company.id);
        actions.getCustomerSuccess(company);
        actions.setCustomerDeletedState(CUSTOMER_DELETED_STATES.NEED_CONFIRM);
        actions.setCustomerLoadingState(true);
        break;

      case 'Edit Company':
        actions.resetCustomer();
        actions.setSelectedCustomerId(company.id);
        actions.setCustomerDeletedState('');
        actions.setCustomerLoadingState(true);
        actions.getCustomerSuccess(company);
        break;

      case 'Copy Invite Link':
        actions.copyCompanyInviteLink(company);
        break;

      default:
        break;
    }
  };

  const handleDownloadPDF = async (companyId, partnerId, name, partnerName) => {
    setGenerating(companyId);
    const query = customerUtils.genWorkplaceAssessmentQuery({ clientId: companyId, partnerId });
    const response = await apiCalls.getModernWorkplaceAssessment(query);
    const assessment = R.path(['hits', 'hits', '0', '_source'], response);
    if (assessment) {
      const { logoImageUrl } = assessment;
      const isValidUrl = await isValidImage(logoImageUrl);
      const blob = await pdf(
        <PdfReport data={assessment} logo={isValidUrl ? logoImageUrl : null} orgName={partnerName} name={name} />
      ).toBlob();
      FileSaver.saveAs(blob, `MWA_${name}_${dateConverter('MM-DD-YYYY')(now)}.pdf`);
    } else {
      actions.showErrorToaster({ message: 'The company does not support a modern workplace assessment report yet.' });
    }
    setGenerating(null);
  };

  const columns = useMemo(
    () => [
      {
        title: <LanguageEntry {...tableLang.colCompName} />,
        width: 250,
        dataIndex: 'name',
        key: 'companyName',
        sorter: sortByAlph('name'),
        render: (name, { id }) => (
          <CompanyName
            clientId={id}
            name={name}
            path={{
              pathname: PATHS.CUSTOMERS.PROFILE.replace(/:id/, id),
              state: { prevPath: PATHS.CUSTOMERS.ROOT }
            }}
          />
        )
      },
      {
        title: <LanguageEntry {...tableLang.colCompanyType} />,
        width: 100,
        dataIndex: 'organizationType',
        sorter: sortByAlph('organizationType'),
        key: 'organizationType',
        render: organizationType => (organizationType ? organizationType : '')
      },
      {
        title: <LanguageEntry {...tableLang.colCompManager} />,
        width: 150,
        dataIndex: ['accountManager', 'fullName'],
        sorter: sortByAlph('accountManager', 'fullName'),
        key: 'accountManager'
      },
      {
        title: <LanguageEntry {...tableLang.colUsersV2} />,
        width: 100,
        dataIndex: 'office365',
        key: 'users',
        sorter: sortByNumber('office365', 'totalActivePaidUsers'),
        defaultSortOrder: 'descend',
        render: (office365, { id }) => (
          <StyledLink
            to={{
              pathname: PATHS.OFFICE_365_OPTIMIZER.USERS.replace(/{{ orgId }}/, id),
              state: { prevPath: PATHS.CUSTOMERS.ROOT }
            }}
          >
            {office365 ? office365.totalActivePaidUsers : 0}
          </StyledLink>
        )
      },
      {
        title: <LanguageEntry {...tableLang.colLicenseCntV2} />,
        width: 100,
        dataIndex: 'office365',
        sorter: sortByNumber('office365', 'totalLicenses'),
        key: 'licenseCount',
        render: office365 => (office365 ? office365.totalLicenses : 0)
      },
      {
        title: <LanguageEntry {...tableLang.colConnectStatusV2} />,
        width: 150,
        dataIndex: 'office365Status',
        key: 'connectionStatus',
        sorter: sortByAlph('office365Status'),
        render: status => {
          const statusText = status === CONNECTION_STATES.PROCESS_FAILED ? 'Failed' : status;
          return <Styled.ConnectionStatus active={status === 'Active'}>{statusText}</Styled.ConnectionStatus>;
        }
      },
      {
        title: <LanguageEntry {...tableLang.colLatestSyncV2} />,
        width: 100,
        dataIndex: 'office365',
        key: 'latestSync',
        sorter: sortByDate('office365', 'lastProcessed'),
        render: office365 =>
          office365 ? (office365.lastProcessed ? moment(office365.lastProcessed).format('MM/DD/YY') : '') : ''
      },
      {
        title: <LanguageEntry {...tableLang.colAssessments} />,
        width: 100,
        dataIndex: 'id',
        key: 'assessments',
        render: (id, { mspId, name, partnerName }) => (
          <>
          <ButtonElement
            variant="danger"
            onClick={() => !generating && handleDownloadPDF(id, mspId, name, partnerName)}
          >
            {generating === id ? <Styled.LoadingIcon /> : <Styled.PDFFileIcon />}
          </ButtonElement>
          <ButtonElement onClick={()=>{router.push(PATHS.CUSTOMERS.PROGRESS_STATUS);}}>
            Progress
          </ButtonElement>
          </>
          
        )
      },
      {
        title: '',
        width: 50,
        dataIndex: 'office365Status',
        key: 'vertical-menu',
        render: (office365Status, company) => {
          let invalidOption = [];

          if (office365Status === CONNECTION_STATES.PROCESS_FAILED)
            invalidOption.push('Link Connection again', 'Start Manual Refresh');
          if (office365Status === CONNECTION_STATES.INACTIVE) invalidOption.push('Link Connection');
          if (office365Status !== CONNECTION_STATES.IN_PROGRESS) invalidOption.push('Copy Invite Link');

          const invalidOptions = invalidOption.length
            ? [...invalidOption, 'Edit Company', 'Remove Company']
            : ['Edit Company', 'Remove Company'];
          const menuOptions = office365Status === 'Active' ? options : invalidOptions;
          return <VerticalMenu options={menuOptions} onClick={handleClickMenu(company)} />;
        }
      }
    ],
    [customers, generating]
  );

  const tableProps = {
    columns,
    pageSize: 10,
    dataSource,
    loading: !customers,
    tableHeight: `calc(100vh - 380px)`
  };

  return (
    <>
      <Styled.CustomerSectionWrapper>
        <Widget widgetId="companies">
          <Styled.SectionHeaderWrapper>
            <Styled.SectionTitleWrapper>
              <LanguageEntry {...tableLang.tablePageTitleNew} />
              <Status />
            </Styled.SectionTitleWrapper>
            <Styled.ButtonsWrap>
              <Styled.AddButtonWrapper onClick={() => props.actions.setAddDialogOpened(true)}>
                <LanguageEntry {...tableLang.btnAddCus} />
                <Styled.IconAddComp />
              </Styled.AddButtonWrapper>
              <Dropdown>
                <Styled.MoreHorizIcon />
              </Dropdown>
            </Styled.ButtonsWrap>
          </Styled.SectionHeaderWrapper>
          {isBulkEditView ? (
            <BulkEditView />
          ) : (
            <NormalUserView {...props} customers={dataSource} filters={filters} onChangeFilters={e => setFilters(e)} />
          )}
          <SimpleTable {...tableProps} />
          <SucessfulSecureAppModal />
        </Widget>
      </Styled.CustomerSectionWrapper>
      <SyncCustomersMessage />
    </>
  );
};
