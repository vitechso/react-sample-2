import * as yup from 'yup';

import { lang } from './addCustomer.lang';

export const customerSchema = translate =>
  yup.object().shape({
    name: yup
      .string()
      .max(35, translate(lang.errors.tooLongName))
      .required(translate(lang.errors.noName)),
    email: yup.string().email(translate(lang.errors.invalideEmail)),
    tenantId: yup.string(),
    countryCode: yup.string().required(translate(lang.errors.noCountry)),
    organizationType: yup.string().required(translate(lang.errors.noOrganizationType))
  });

export const newCustomersSchema = translate =>
  yup.object().shape({
    customers: yup.array().of(customerSchema(translate))
  });
