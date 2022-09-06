import moment from 'moment';

import { customerUtils } from './customers.utils';
import { CONNECTION_STATES, MS_AUTH_STATES, CONNECTION_TYPE } from 'src/pages/customers/customers.constants';

const mockCustomer = {
  office365: {
    authState: '',
    lastProcessed: '',
    processFailed: ''
  },
  microsoft: {},
  office365Status: ''
};

const mockCustomers = [
  {
    id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
    mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
    name: 'Ledner, Pollich and Huel LLC',
    email: 'Mitchell.Jacobs73@yahoo.com',
    status: 'active',
    deleted: false,
    users: [],
    countryCode: 'IO',
    created: '2017-07-23T02:38:45.141Z',
    lastUpdated: '2019-05-14T12:20:33.508Z',
    office365: {
      authState: 'accessGranted',
      totalActivePaidUsers: 166,
      lastProcessed: '2019-07-03T03:25:10.351Z',
      totalLicenses: 116,
      availableLicenses: 178,
      totalSpend: 14071.48,
      processFailed: '2019-07-03T03:24:11.351Z'
    }
  },
  {
    id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
    mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
    name: 'Test customer without O365 data',
    email: 'Mitchell.Jacobs73@yahoo.com',
    status: 'active',
    deleted: false,
    users: [],
    countryCode: 'IO',
    created: '2017-07-23T02:38:45.141Z',
    lastUpdated: '2019-05-14T12:20:33.508Z'
  },
  {
    id: 'acc_ffffffff-ffff-ffff-ffff-aaaaaaaaaaaa',
    mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
    name: 'Test customer with msAuth new',
    email: 'Mitchell.Jacobs73@yahoo.com',
    status: 'active',
    deleted: false,
    users: [],
    countryCode: 'IO',
    created: '2017-07-23T02:38:45.141Z',
    lastUpdated: '2019-05-14T12:20:33.508Z',
    office365: {
      authState: 'new'
    }
  }
];

describe('Customer table', () => {
  describe('Connection states helpers', () => {
    afterEach(() => {
      mockCustomer.hasFeatureSecurityScores = false;
    });

    it('isInactive based on office365Status', () => {
      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      expect(customerUtils.isInactive(mockCustomer)).toBe(true);
    });

    it('isInactive based on office365.authState', () => {
      mockCustomer.office365.authState = 'new';
      expect(customerUtils.isInactive(mockCustomer)).toBe(true);
    });

    it('isProcessFailed', () => {
      mockCustomer.office365Status = CONNECTION_STATES.PROCESS_FAILED;
      expect(customerUtils.isProcessFailed(mockCustomer)).toBe(true);
    });

    it('isNeedPermissions', () => {
      mockCustomer.office365Status = CONNECTION_STATES.NEEDS_PERMISSIONS;
      expect(customerUtils.isNeedPermissions(mockCustomer)).toBe(true);
    });

    it('hasDelegatedAccessAppConnect === true', () => {
      mockCustomer.office365.connectionType = CONNECTION_TYPE.APP_CONNECT;
      mockCustomer.microsoft.allowDelegatedAccess = true;
      expect(customerUtils.hasDelegatedAccessAppConnect(mockCustomer)).toBe(true);
    });

    it('hasDelegatedAccessAppConnect === false', () => {
      mockCustomer.office365.connectionType = CONNECTION_TYPE.APP_CONNECT;
      mockCustomer.office365Status = CONNECTION_STATES.ACTIVE;
      expect(customerUtils.isNeedPermissions(mockCustomer)).toBe(false);
    });

    it('inactiveHasDelegatedAccessNotAppConnect === true', () => {
      mockCustomer.office365.connectionType = CONNECTION_TYPE.PARTNER_ADMIN;
      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      mockCustomer.microsoft.allowDelegatedAccess = true;
      expect(customerUtils.inactiveHasDelegatedAccessNotAppConnect(mockCustomer)).toBe(true);
    });

    it('inactiveHasDelegatedAccessNotAppConnect === true', () => {
      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      mockCustomer.microsoft.allowDelegatedAccess = false;
      expect(customerUtils.inactiveHasDelegatedAccessNotAppConnect(mockCustomer)).toBe(false);
    });

    it('inactiveHasDelegatedAccessNotAppConnect === false', () => {
      mockCustomer.office365.connectionType = CONNECTION_TYPE.APP_CONNECT;
      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      mockCustomer.microsoft.allowDelegatedAccess = true;
      expect(customerUtils.inactiveHasDelegatedAccessNotAppConnect(mockCustomer)).toBe(false);
    });

    it('hasLinkButton', () => {
      mockCustomer.office365Status = CONNECTION_STATES.ACTIVE;
      expect(customerUtils.hasLinkButton(mockCustomer)).toBe(false);

      mockCustomer.office365Status = CONNECTION_STATES.ACTIVE;
      mockCustomer.microsoft.allowDelegatedAccess = true;
      mockCustomer.office365.connectionType = CONNECTION_TYPE.PARTNER_ADMIN;
      expect(customerUtils.hasLinkButton(mockCustomer)).toBe(true);

      mockCustomer.office365Status = CONNECTION_STATES.IN_PROGRESS;
      expect(customerUtils.hasLinkButton(mockCustomer)).toBe(false);

      mockCustomer.office365Status = CONNECTION_STATES.PROCESS_FAILED;
      expect(customerUtils.hasLinkButton(mockCustomer)).toBe(false);

      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      expect(customerUtils.hasLinkButton(mockCustomer)).toBe(true);
    });

    it('isConnected', () => {
      mockCustomer.office365Status = CONNECTION_STATES.ACTIVE;
      expect(customerUtils.isConnected(mockCustomer)).toBe(true);

      mockCustomer.office365Status = CONNECTION_STATES.NEEDS_PERMISSIONS;
      expect(customerUtils.isConnected(mockCustomer)).toBe(true);

      mockCustomer.office365Status = CONNECTION_STATES.INACTIVE;
      expect(customerUtils.isConnected(mockCustomer)).toBe(false);
    });

    it('compareByAlph', () => {
      let a = 'A';
      let b = 'B';
      let result = customerUtils.compareByAlph(a, b);
      expect(result).toBe(-1);

      a = 'AA';
      b = 'AB';
      result = customerUtils.compareByAlph(a, b);
      expect(result).toBe(-1);

      a = 'A';
      b = 'A';
      result = customerUtils.compareByAlph(a, b);
      expect(result).toBe(0);
    });

    describe('Get customer details from customers', () => {
      const customers = [
        {
          id: 'acc_1',
          office365: {
            authState: MS_AUTH_STATES.NEW,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.INACTIVE
        },
        {
          id: 'acc_2',
          office365: {
            authState: MS_AUTH_STATES.AUTH_CANCELLED,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.AUTH_FAILED
        },
        {
          id: 'acc_3',
          office365: {
            authState: MS_AUTH_STATES.ACCESS_GRANTED,
            lastProcessed: 'Thu Jun 13 2019 12:11:41 GMT+1200'
          },
          office365Status: CONNECTION_STATES.ACTIVE
        },
        {
          id: 'acc_4',
          office365: {
            authState: MS_AUTH_STATES.ACCESS_GRANTED,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.IN_PROGRESS
        },
        {
          id: 'acc_5',
          office365: {
            authState: MS_AUTH_STATES.ACCESS_DENIED,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.DENIED
        },
        {
          id: 'acc_6',
          office365: {
            authState: MS_AUTH_STATES.INVALID_TOKEN,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.AUTH_FAILED
        },
        {
          id: 'acc_7',
          office365: {
            authState: MS_AUTH_STATES.CALLBACK_FAILED,
            lastProcessed: undefined
          },
          office365Status: CONNECTION_STATES.AUTH_FAILED
        },
        {
          id: 'acc_8',
          office365Status: CONNECTION_STATES.INACTIVE
        },
        {
          id: 'acc_9',
          office365: {
            authState: MS_AUTH_STATES.ACCESS_GRANTED,
            lastProcessed: 'Thu Jun 13 2019 12:11:41 GMT+1200',
            scopeVsesion: 'o365v1'
          },
          office365Status: CONNECTION_STATES.NEEDS_PERMISSIONS
        }
      ];

      describe('getCustomerById', () => {
        it('Should get the correct customer from the customers', () => {
          const expectCustomer = {
            id: 'acc_3',
            office365: {
              authState: MS_AUTH_STATES.ACCESS_GRANTED,
              lastProcessed: 'Thu Jun 13 2019 12:11:41 GMT+1200'
            },
            office365Status: CONNECTION_STATES.ACTIVE
          };

          expect(customerUtils.getCustomerById('acc_3')(customers)).toEqual(expectCustomer);
        });

        it('Should return undefined when no id matched', () => {
          expect(customerUtils.getCustomerById('acc_unknown')(customers)).toBe(undefined);
        });
      });

      describe('getCustomerStatusById', () => {
        it('acc_1 should return Inactive', () => {
          expect(customerUtils.getCustomerStatusById('acc_1')(customers)).toBe(CONNECTION_STATES.INACTIVE);
        });

        it('acc_2 should return auth failed', () => {
          expect(customerUtils.getCustomerStatusById('acc_2')(customers)).toBe(CONNECTION_STATES.AUTH_FAILED);
        });

        it('acc_3 should return active', () => {
          expect(customerUtils.getCustomerStatusById('acc_3')(customers)).toBe(CONNECTION_STATES.ACTIVE);
        });

        it('acc_4 should return in progress', () => {
          expect(customerUtils.getCustomerStatusById('acc_4')(customers)).toBe(CONNECTION_STATES.IN_PROGRESS);
        });

        it('acc_5 should return denied', () => {
          expect(customerUtils.getCustomerStatusById('acc_5')(customers)).toBe(CONNECTION_STATES.DENIED);
        });

        it('acc_6 should return auth failed', () => {
          expect(customerUtils.getCustomerStatusById('acc_6')(customers)).toBe(CONNECTION_STATES.AUTH_FAILED);
        });

        it('acc_7 should return auth failed', () => {
          expect(customerUtils.getCustomerStatusById('acc_7')(customers)).toBe(CONNECTION_STATES.AUTH_FAILED);
        });

        it('acc_8 should return inactive', () => {
          expect(customerUtils.getCustomerStatusById('acc_8')(customers)).toBe(CONNECTION_STATES.INACTIVE);
        });

        it('acc_9 should return need Permission', () => {
          expect(customerUtils.getCustomerStatusById('acc_9')(customers)).toBe(CONNECTION_STATES.NEEDS_PERMISSIONS);
        });
      });
    });

    describe('getConnectionState', () => {
      it('should return status if defined in customer payload', () => {
        const customer = {
          office365Status: CONNECTION_STATES.IN_PROGRESS
        };
        expect(customerUtils.getConnectionState(customer)).toBe(CONNECTION_STATES.IN_PROGRESS);
      });

      it('should return default status if not defined in customer payload', () => {
        const customer = {};
        expect(customerUtils.getConnectionState(customer)).toBe(CONNECTION_STATES.INACTIVE);
      });
    });

    describe('isProcessFailedExpiry', () => {
      const office365 = {};

      it('should be false when null, undefined', () => {
        expect(customerUtils.isProcessFailedExpiry()).toBe(false);

        expect(customerUtils.isProcessFailedExpiry(undefined)).toBe(false);

        office365.processFailed = null;
        expect(customerUtils.isProcessFailedExpiry(office365)).toBe(false);
      });

      it('should be true when processFailed + 15mins is before or same', () => {
        office365.processFailed = moment
          .utc()
          .subtract(20, 'm')
          .format();
        expect(customerUtils.isProcessFailedExpiry(office365)).toBe(true);

        office365.processFailed = moment
          .utc()
          .subtract(15, 'm')
          .format();
        expect(customerUtils.isProcessFailedExpiry(office365)).toBe(true);
      });
    });

    describe('hasDelegatedAccess', () => {
      it('should pass if customer has delegated access', () => {
        const customer = {
          microsoft: {
            allowDelegatedAccess: true
          }
        };

        expect(customerUtils.hasDelegatedAccess(customer)).toBe(true);
      });

      it("should fail if customer doesn't have delegated access", () => {
        const customer1 = {
          microsoft: {
            allowDelegatedAccess: false
          }
        };
        expect(customerUtils.hasDelegatedAccess(customer1)).toBe(false);

        const customer2 = {
          microsoft: {}
        };
        expect(customerUtils.hasDelegatedAccess(customer2)).toBe(false);

        const customer3 = {};
        expect(customerUtils.hasDelegatedAccess(customer3)).toBe(false);
      });
    });

    describe('generateCustomerProcessData', () => {
      it('should generate correct process status object when there are office365 data', () => {
        const id = 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb';
        const expectResult = {
          id,
          processFailed: '2019-07-03T03:24:11.351Z',
          lastProcessed: '2019-07-03T03:25:10.351Z'
        };

        expect(customerUtils.generateCustomerProcessData(id)(mockCustomers)).toEqual(expectResult);
      });

      it('should return null if no O365 property or msAuth is new', () => {
        const id1 = 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff';
        const id2 = 'acc_ffffffff-ffff-ffff-ffff-aaaaaaaaaaaa';

        expect(customerUtils.generateCustomerProcessData(id1)(mockCustomers)).toBe(null);
        expect(customerUtils.generateCustomerProcessData(id2)(mockCustomers)).toBe(null);
      });
    });

    describe('hasDelayedConsumptionInitFromPartnerCenter', () => {
      it("should return true if a customer has been added through partner center but don't have office365 document yet", () => {
        const customer = {
          microsoft: {
            tenantId: 'db832e68-9b3c-4322-befc-2a864ba73551',
            domain: 'ipifny.com',
            allowDelegatedAccess: false
          }
        };

        expect(customerUtils.hasDelayedConsumptionInitFromPartnerCenter(customer)).toBe(true);
      });

      it('should return false if for all other scenarios', () => {
        const customer1 = {
          microsoft: {
            tenantId: 'db832e68-9b3c-4322-befc-2a864ba73551',
            domain: 'ipifny.com',
            allowDelegatedAccess: false
          },
          office365: {
            processFailed: null,
            authState: 'new',
            totalSpend: 0,
            totalLicenses: 0,
            availableLicenses: 0,
            totalActivePaidUsers: 0,
            scopeVersion: 'o365v2',
            lastProcessed: true
          }
        };

        const customer2 = {
          microsoft: {},
          office365: {
            processFailed: null,
            authState: 'new',
            totalSpend: 0,
            totalLicenses: 0,
            availableLicenses: 0,
            totalActivePaidUsers: 0,
            scopeVersion: 'o365v2',
            lastProcessed: true
          }
        };

        expect(customerUtils.hasDelayedConsumptionInitFromPartnerCenter(customer1)).toBe(false);
        expect(customerUtils.hasDelayedConsumptionInitFromPartnerCenter(customer2)).toBe(false);
      });
    });

    describe('updateCustomersById', () => {
      it('should generate correct process status object when there are office365 data', () => {
        const customerOrgId = 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb';
        const expectResult = [
          {
            id: 'acc_d72d6758-c98f-4a8d-8d83-608c9f4a58cb',
            mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
            name: 'Ledner, Pollich and Huel LLC',
            email: 'Mitchell.Jacobs73@yahoo.com',
            status: 'active',
            deleted: false,
            users: [],
            countryCode: 'IO',
            created: '2017-07-23T02:38:45.141Z',
            lastUpdated: '2019-05-14T12:20:33.508Z',
            office365: {
              authState: 'accessGranted',
              totalActivePaidUsers: 166,
              lastProcessed: null,
              totalLicenses: 116,
              availableLicenses: 178,
              totalSpend: 14071.48,
              processFailed: null
            }
          },
          {
            id: 'acc_ffffffff-ffff-ffff-ffff-ffffffffffff',
            mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
            name: 'Test customer without O365 data',
            email: 'Mitchell.Jacobs73@yahoo.com',
            status: 'active',
            deleted: false,
            users: [],
            countryCode: 'IO',
            created: '2017-07-23T02:38:45.141Z',
            lastUpdated: '2019-05-14T12:20:33.508Z'
          },
          {
            id: 'acc_ffffffff-ffff-ffff-ffff-aaaaaaaaaaaa',
            mspId: '450dbbbe-631c-4f03-8a4a-8ff5695b8ec4',
            name: 'Test customer with msAuth new',
            email: 'Mitchell.Jacobs73@yahoo.com',
            status: 'active',
            deleted: false,
            users: [],
            countryCode: 'IO',
            created: '2017-07-23T02:38:45.141Z',
            lastUpdated: '2019-05-14T12:20:33.508Z',
            office365: {
              authState: 'new'
            }
          }
        ];

        expect(customerUtils.updateCustomersById({ customerOrgId })(mockCustomers)).toEqual(expectResult);
      });

      it('should return original customers array if id is not matching with any customer', () => {
        const customerOrgId = 'acc_non_exist';

        expect(customerUtils.updateCustomersById({ customerOrgId })(mockCustomers)).toEqual(mockCustomers);
      });
    });

    describe('isFromPartnerCenter', () => {
      it('should be true when customer has microsoft.allowDelegatedAccess', () => {
        const customer = {
          microsoft: {
            allowDelegatedAccess: true
          }
        };
        expect(customerUtils.isFromPartnerCenter(customer)).toBe(true);
      });
    });

    describe('hasDelegatedAccessPartnerAdmin', () => {
      it('should be true when customer has microsoft.allowDelegatedAccess', () => {
        const customer = {
          office365: {
            connectionType: CONNECTION_TYPE.PARTNER_ADMIN
          },
          microsoft: {
            allowDelegatedAccess: true
          },
          office365Status: CONNECTION_STATES.ACTIVE
        };
        expect(customerUtils.hasDelegatedAccessPartnerAdmin(customer)).toBe(true);
      });
    });
  });
});
