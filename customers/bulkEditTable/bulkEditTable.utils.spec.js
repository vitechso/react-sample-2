import { processDataForBulkEditTable, processDataForAvailableKey } from './bulkEditTable.utils';
import { CONNECTION_TYPE, ORGANIZATION_TYPE } from 'src/pages/customers/customers.constants';

describe('bulkEditTable Utils', () => {
  describe('processDataForBulkEditTable', () => {
    it('should restructure customer data', () => {
      const mockCustomers = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          status: 'active',
          office365: {
            authState: 'new',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and partnerAdmin',
          status: 'active',
          office365: {
            authState: 'accessGranted',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: false
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const expectResult = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          key: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          isCustomerAvailable: true,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          merged: false,
          connectionType: CONNECTION_TYPE.APP_CONNECT,
          delegatedAccess: true,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          key: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and partnerAdmin',
          isCustomerAvailable: false,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: false
          },
          merged: true,
          connectionType: CONNECTION_TYPE.APP_CONNECT,
          delegatedAccess: false,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const result = processDataForBulkEditTable(mockCustomers);
      expect(result).toEqual(expectResult);
    });

    it('should restructure customer data and set isCustomerAvailable, if has delegated access and also with appConnect connectionType', () => {
      const mockCustomers = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          status: 'active',
          office365: {
            authState: 'new',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and partnerAdmin',
          status: 'active',
          office365: {
            authState: 'accessGranted',
            connectionType: CONNECTION_TYPE.PARTNER_ADMIN
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const expectResult = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          key: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          isCustomerAvailable: true,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          merged: false,
          connectionType: CONNECTION_TYPE.APP_CONNECT,
          delegatedAccess: true,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          key: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and partnerAdmin',
          isCustomerAvailable: false,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          merged: true,
          connectionType: CONNECTION_TYPE.PARTNER_ADMIN,
          delegatedAccess: true,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const result = processDataForBulkEditTable(mockCustomers);
      expect(result).toEqual(expectResult);
    });

    it('should return a restructured array object that applied merge rule', () => {
      const mockCustomers = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          status: 'active',
          office365: {
            authState: 'new',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and appConnect',
          status: 'active',
          office365: {
            authState: 'accessGranted',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: false
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const expectResult = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          key: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          isCustomerAvailable: true,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          merged: false,
          connectionType: CONNECTION_TYPE.APP_CONNECT,
          delegatedAccess: true,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          key: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and appConnect',
          isCustomerAvailable: false,
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: false
          },
          merged: true,
          connectionType: CONNECTION_TYPE.APP_CONNECT,
          delegatedAccess: false,
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];

      const result = processDataForBulkEditTable(mockCustomers);
      expect(result).toEqual(expectResult);
    });
  });

  describe('processDataForAvailableKey', () => {
    it('should return a key set array that contains all unmerged customer', () => {
      const mockCustomers = [
        {
          id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
          name: 'Ledner, Pollich and Huel LLC',
          status: 'active',
          office365: {
            authState: 'new',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
          name: 'Test customer without O365 data and appConnect',
          status: 'active',
          office365: {
            authState: 'accessGranted',
            connectionType: CONNECTION_TYPE.APP_CONNECT
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        },
        {
          id: 'acc_ffffffff-ffff-ffff-ffff-aaaaaaaaaaaa',
          name: 'Test customer without O365 data and partnerAdmin',
          status: 'active',
          office365: {
            authState: 'accessGranted',
            connectionType: CONNECTION_TYPE.PARTNER_ADMIN
          },
          microsoft: {
            tenantId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            domain: 'someexmaple.com',
            allowDelegatedAccess: true
          },
          organizationType: ORGANIZATION_TYPE.CUSTOMER
        }
      ];
      const result = processDataForAvailableKey(processDataForBulkEditTable(mockCustomers));
      expect(result.length).toEqual(1);
    });
  });
});
