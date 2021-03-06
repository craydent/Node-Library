
import * as IFillTemplate from '../methods/filltemplate';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const module = require('../methods/filltemplate');
const fillTemplate: typeof IFillTemplate.default = module.default;
const TEMPLATE_VARS: typeof IFillTemplate.TEMPLATE_VARS = module.TEMPLATE_VARS;
const TEMPLATE_TAG_CONFIG: typeof IFillTemplate.TEMPLATE_TAG_CONFIG = module.TEMPLATE_TAG_CONFIG;
//#endregion

export { fillTemplate, TEMPLATE_VARS, TEMPLATE_TAG_CONFIG };