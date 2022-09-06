// @flow
import { widgetDataHOC } from 'src/hoc';
import Recommendations from './Recommendations.component';

export default widgetDataHOC(['company', 'recommendations'])(Recommendations);
