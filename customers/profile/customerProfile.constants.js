export const SUBSCRIPTIONS_MOCK_DATA = [
  {
    id: '45aa2baa-c96b-435e-c2e6-ce6db6f9d3a2',
    offerId: 'CFQ7TTC0LF8S:0002:CFQ7TTC0KN98',
    offerName: 'Office 365 E5',
    friendlyName: 'Office 365 E5',
    type: 'NCE',
    term: 'monthly',
    quantity: 5,
    unitType: 'Licenses',
    effectiveStartDate: '2021-09-15T20:03:13.4890084Z',
    commitmentEndDate: '2021-12-14T00:00:00Z',
    status: 'active',
    autoRenewEnabled: true,
    isTrial: false,
    billingCycle: 'monthly',
    termDuration: 'P1M',
    attentionNeeded: false,
    contractType: 'subscription',
    pricePer: {
      msrp: 100,
      priceToCustomer: 200,
      priceToPartner: 80
    },
    monthlyPrice: {
      msrp: 100,
      priceToCustomer: 200,
      priceToPartner: 80
    },
    annual: {
      msrp: 100,
      priceToCustomer: 200,
      priceToPartner: 80
    },
    termBalance: 0
  }
];

export const DETECTED_APPS_MOCK_DATA = [
  {
    application: 'Google Chrome',
    version: '103.0.5060.66',
    deviceCount: 30,
    appSize: 3000000
  },
  {
    application: 'Adobe Photoshop',
    version: '2.4.2',
    deviceCount: 19,
    appSize: 20000000
  },
  {
    application: 'Azure Data Studio',
    version: '1.31.1',
    deviceCount: 15,
    appSize: 45000000
  },
  {
    application: 'Dial Pad',
    version: '19.10.0',
    deviceCount: 14,
    appSize: 3000000
  },
  {
    application: 'Microsoft Edge',
    version: '103.0.5060.66',
    deviceCount: 30,
    appSize: 3000000
  }
];

export type CompanyType = {
  accountManager: object,
  adoptions: object,
  azureResources: object,
  created: string,
  departments: Array<object>,
  email: string,
  id: string,
  lastUpdated: string,
  microsoft: object,
  mspId: string,
  name: string,
  office365: object,
  office365Status: string,
  organizationType: string,
  partnerName: string,
  planHighlights: object,
  plans: Array<object>,
  recommendations: Array<object>,
  securityRecommendations: Array<object>,
  status: string,
  subscriptions: Array<object>,
  users: Array<object>
};
