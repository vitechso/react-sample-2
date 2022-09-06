// @flow

import { core } from '@accordo-feed/micro-frontends-utils';

import { API } from 'src/utils/api';
import { resolveApiEndpoint, requestHandler } from 'src/utils';

/*****************
 *   API CALLS   *
 *****************/

const syncClientsDataApi = resolveApiEndpoint(API.SET_BULK_ENABLE);

export const setBulkEnable = ({ orgId, data }: { orgId: string, data: Array<string> }) =>
  requestHandler({
    method: 'POST',
    url: core.replaceAll(syncClientsDataApi, { orgId }),
    data
  });
