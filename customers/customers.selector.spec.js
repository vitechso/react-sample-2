import moment from 'moment';

import { clientsWithOldDataSelector, hasClientsWithOldDataSelector } from './customers.selector';

describe('pages/customers/customers.selector', () => {
  const now = moment();
  const currentDay = now.clone().format();
  const oneDayAgo = now
    .clone()
    .subtract('1', 'days')
    .format();
  const twoDaysAgo = now
    .clone()
    .subtract('2', 'days')
    .format();
  const threeDaysAgo = now
    .clone()
    .subtract('3', 'days')
    .format();
  const fourDaysAgo = now
    .clone()
    .subtract('4', 'days')
    .format();

  describe('clientsWithOldDataSelector', () => {
    it('should return all the clients with data older or equal to 2 days', () => {
      const clients = [
        { lastUpdated: currentDay },
        { lastUpdated: oneDayAgo },
        { lastUpdated: twoDaysAgo },
        { lastUpdated: threeDaysAgo },
        {
          lastUpdated: fourDaysAgo,
          office365: {
            lastProcessed: currentDay
          }
        }
      ];

      expect(clientsWithOldDataSelector.resultFunc(clients)).toEqual([
        { lastUpdated: twoDaysAgo },
        { lastUpdated: threeDaysAgo }
      ]);
    });

    it('should prioritise office365.lastProcessed date', () => {
      const clients = [
        {
          lastUpdated: fourDaysAgo,
          office365: {
            lastProcessed: currentDay
          }
        }
      ];

      expect(clientsWithOldDataSelector.resultFunc(clients)).toEqual([]);
    });

    it('should return emplty array if all clients has been processed within 2 days', () => {
      const clients = [{ lastUpdated: currentDay }, { lastUpdated: oneDayAgo }];
      expect(clientsWithOldDataSelector.resultFunc(clients)).toEqual([]);
    });

    it('should return empty array if no clients', () => {
      expect(clientsWithOldDataSelector.resultFunc([])).toEqual([]);
    });

    it('should igonre invalid lastUpdated property or undefined', () => {
      const clientsWithOldData = [
        { lastUpdated: '' },
        {},
        { lastUpdated: undefined },
        { lastUpdated: null },
        { lastUpdated: oneDayAgo },
        { lastUpdated: twoDaysAgo },
        { lastUpdated: threeDaysAgo },
        { lastUpdated: fourDaysAgo }
      ];
      const clientsWithoutOldData = [
        { lastUpdated: '' },
        {},
        { lastUpdated: undefined },
        { lastUpdated: null },
        { lastUpdated: oneDayAgo }
      ];
      expect(clientsWithOldDataSelector.resultFunc(clientsWithOldData)).toEqual([
        { lastUpdated: twoDaysAgo },
        { lastUpdated: threeDaysAgo },
        { lastUpdated: fourDaysAgo }
      ]);
      expect(clientsWithOldDataSelector.resultFunc(clientsWithoutOldData)).toEqual([]);
    });
  });

  describe('hasClientsWithOldDataSelector', () => {
    it('should return true if list contains clients', () => {
      const clients = [{ lastUpdated: twoDaysAgo }, { lastUpdated: threeDaysAgo }, { lastUpdated: fourDaysAgo }];
      expect(hasClientsWithOldDataSelector.resultFunc(clients)).toEqual(true);
    });

    it('should return false if supplied empty array', () => {
      expect(hasClientsWithOldDataSelector.resultFunc([])).toEqual(false);
    });
  });
});
