import _getBrowserVersion from '../protected/_getBrowserVersion'
import error from './error';

export default function FirefoxVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Firefox version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#FirefoxVersion",
        "returnType": "(Float)"
    }|*/
    try {
        return _getBrowserVersion(this, "Firefox");
    } catch (e) {
        error('FirefoxVersion', e);
    }
}