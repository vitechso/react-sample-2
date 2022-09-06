// @flow

import { core } from '@accordo-feed/micro-frontends-utils';

import { API } from 'src/utils/api';
import { resolveApiEndpoint, requestHandler } from 'src/utils';

const clientPlansApi = resolveApiEndpoint(API.GET_CUSTOMER_DASHBOARD);

export const getClientPlans = (orgId: string): Promise<Array<Object>> =>
  requestHandler({
    url: core.replaceAll(clientPlansApi, { orgId })
  });
