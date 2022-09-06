// @flow
import { widgetDataHOC } from 'src/hoc';
import CompanyInfo from './CompanyInfo.component';

export default widgetDataHOC(['company'])(CompanyInfo);
