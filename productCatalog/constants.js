export const LAYOUTS = {
  lg: [
    { i: 'productGallery', x: 0, y: 0, w: 12, h: 3 },
    { i: 'productBreakout', x: 0, y: 2, w: 8, h: 4.5 },
    { i: 'companyPricing', x: 9, y: 0, w: 4, h: 4.5 }
  ],
  xs: [
    { i: 'productGallery', x: 0, y: 0, w: 1, h: 2.5 },
    { i: 'productBreakout', x: 0, y: 1, w: 1, h: 4.5 },
    { i: 'companyPricing', x: 0, y: 2, w: 1, h: 4.5 }
  ]
};

export const BREAKPOINTS = { lg: 978, xs: 0 };
export const COLS = { lg: 12, xs: 1 };

export const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
});

export const PRODUCTS = [
  {
    id: '1',
    name: 'M365 Enterprise E5',
    msrp: 57,
    partnerUnitCost: 0,
    seats: 575,
    addons: 265,
    spend: 38475
  },
  {
    id: '2',
    name: 'M365 Enterprise E3',
    msrp: 32,
    partnerUnitCost: 0,
    seats: 690,
    addons: 126,
    spend: 28080
  },
  {
    id: '3',
    name: 'M365 F1',
    msrp: 4,
    partnerUnitCost: 0,
    seats: 1589,
    addons: 300,
    spend: 7556
  },
  {
    id: '4',
    name: 'Business Premium',
    msrp: 12.5,
    partnerUnitCost: 0,
    seats: 487,
    addons: 38,
    spend: 6562.5
  },
  {
    id: '5',
    name: 'Exchange Online',
    msrp: 2,
    partnerUnitCost: 0,
    seats: 47,
    addons: 0,
    spend: 94
  },
  {
    id: '6',
    name: 'Enterprise E5',
    msrp: 35,
    partnerUnitCost: 0,
    seats: 265,
    addons: 120,
    spend: 13475
  },
  {
    id: '7',
    name: 'Enterprise E3',
    msrp: 20,
    partnerUnitCost: 0,
    seats: 243,
    addons: 13,
    spend: 5120
  },
  {
    id: '8',
    name: 'Project Online Premium',
    msrp: 55,
    partnerUnitCost: 0,
    seats: 57,
    addons: 43,
    spend: 5500
  },
  {
    id: '9',
    name: 'Sharepoint Online Plan 2',
    msrp: 10,
    partnerUnitCost: 0,
    seats: 1703,
    addons: 0,
    spend: 17030
  },
  {
    id: '10',
    name: 'Exchange Online 2',
    msrp: 8,
    partnerUnitCost: 0,
    seats: 24,
    addons: 126,
    spend: 1200
  },
  {
    id: '6',
    name: 'Customer Engagement Plan',
    msrp: 115,
    partnerUnitCost: 0,
    seats: 23,
    addons: 9,
    spend: 3680
  }
];

export const dataSource = [
  {
    company: 'MarketStar',
    product: 'M365 Enterprise E5',
    subscriptions: 235,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'MarketStar',
    product: 'M365 F1',
    subscriptions: 200,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'M365 Enterprise E3',
    subscriptions: 4,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'Enterprise E5',
    subscriptions: 5,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Entori',
    product: 'M365 Enterprise E5',
    subscriptions: 3,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'M365 F1',
    subscriptions: 30,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Brent Eastwood LLC',
    product: 'M365 F1',
    subscriptions: 15,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Midsized Business Consulting',
    product: 'M365 F1',
    subscriptions: 17,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'LuthorCorp',
    product: 'M365 F1',
    subscriptions: 45,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Wayne Enterprises',
    product: 'M365 F1',
    subscriptions: 55,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Stark Industries',
    product: 'M365 F1',
    subscriptions: 67,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Entori',
    product: 'M365 F1',
    subscriptions: 30,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Datamatiq',
    product: 'M365 F1',
    subscriptions: 24,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'The New York Inquirer',
    product: 'M365 F1',
    subscriptions: 11,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'M365 Enterprise E5',
    subscriptions: 45,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Brent Eastwood LLC',
    product: 'M365 Enterprise E5',
    subscriptions: 67,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Midsized Business Consulting',
    product: 'M365 Enterprise E5',
    subscriptions: 88,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'LuthorCorp',
    product: 'M365 Enterprise E5',
    subscriptions: 146,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Wayne Enterprises',
    product: 'M365 Enterprise E5',
    subscriptions: 236,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Stark Industries',
    product: 'M365 Enterprise E5',
    subscriptions: 460,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Datamatiq',
    product: 'M365 Enterprise E5',
    subscriptions: 24,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'The New York Inquirer',
    product: 'M365 Enterprise E5',
    subscriptions: 57,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'MarketStar',
    product: 'M365 Enterprise E3',
    subscriptions: 64,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'M365 Enterprise E3',
    subscriptions: 23,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Brent Eastwood LLC',
    product: 'M365 Enterprise E3',
    subscriptions: 4,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Midsized Business Consulting',
    product: 'M365 Enterprise E3',
    subscriptions: 132,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'LuthorCorp',
    product: 'M365 Enterprise E3',
    subscriptions: 55,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Wayne Enterprises',
    product: 'M365 Enterprise E3',
    subscriptions: 64,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Stark Industries',
    product: 'M365 Enterprise E3',
    subscriptions: 34,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Entori',
    product: 'M365 Enterprise E3',
    subscriptions: 12,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Datamatiq',
    product: 'M365 Enterprise E3',
    subscriptions: 54,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'The New York Inquirer',
    product: 'M365 Enterprise E3',
    subscriptions: 6,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'MarketStar',
    product: 'Business Premium',
    subscriptions: 34,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Tech IO',
    product: 'Business Premium',
    subscriptions: 64,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Brent Eastwood LLC',
    product: 'Business Premium',
    subscriptions: 24,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Midsized Business Consulting',
    product: 'Business Premium',
    subscriptions: 6,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'LuthorCorp',
    product: 'Business Premium',
    subscriptions: 78,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Wayne Enterprises',
    product: 'Business Premium',
    subscriptions: 45,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Stark Industries',
    product: 'Business Premium',
    subscriptions: 234,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Entori',
    product: 'Business Premium',
    subscriptions: 34,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'Datamatiq',
    product: 'Business Premium',
    subscriptions: 234,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  },
  {
    company: 'The New York Inquirer',
    product: 'Business Premium',
    subscriptions: 543,
    priceToCustomer: 0,
    spend: {
      msrp: 0,
      partnerUnitCost: 0,
      priceToCustomer: 0
    }
  }
];

export const companyProductOveride = [
  {
    company: 'MarketStar',
    product: 'M365 Enterprise E5',
    partnerUnitCost: 37,
    msrp: 57,
    priceToCustomer: 42
  },
  {
    company: 'MarketStar',
    product: 'M365 F1',
    partnerUnitCost: 25,
    msrp: 68,
    priceToCustomer: 53
  },
  {
    company: 'MarketStar',
    product: 'M365 Enterprise E3',
    partnerUnitCost: 38,
    msrp: 58,
    priceToCustomer: 43
  },
  {
    company: 'MarketStar',
    product: 'Business Premium',
    partnerUnitCost: 38,
    msrp: 58,
    priceToCustomer: 43
  },
  {
    company: 'Tech IO',
    product: 'M365 Enterprise E3',
    partnerUnitCost: 38,
    msrp: 58,
    priceToCustomer: 43
  },
  {
    company: 'Tech IO',
    product: 'Enterprise E5',
    partnerUnitCost: 38,
    msrp: 59,
    priceToCustomer: 44
  }
];
