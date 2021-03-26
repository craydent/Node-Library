///<reference path="../globalTypes/global.vars.d.ts" />
import error from '../methods/error';
import capitalize from '../methods/capitalize';

/* istanbul ignore next */
export default function exclude(list: string[]): void {
    /*|{
        "info": "Exclude prototyping",
        "category": "Utility",
        "parameters":[
            {"list": "(String[]) Array of strings in containing the property to exclude from prototyping."}],

        "overloads":[],
        "description": "This method enables the ability exclude prototyping on a specific property or property to a specific class.  The format for the string is a single property such as 'map' or property on a specific class 'Array:map'.",
        "url": "http://www.craydent.com/library/1.9.3/docs#exclude",
        "returnType": "(void)"
    }|*/
    try {
        list = list || [];
        for (let i = 0, len = list.length; i < len; i++) {
            let name = list[i] || "";
            if (~name.indexOf(':')) {
                let parts = name.split(':');
                delete ($g as any)[capitalize((parts[0] || "").toLowerCase())];
                continue;
            }

            delete (Array.prototype as any)[name];
            delete (Function.prototype as any)[name];
            delete (String.prototype as any)[name];
            delete (Number.prototype as any)[name];
            delete (Boolean.prototype as any)[name];
            delete (Date.prototype as any)[name];
        }
    } catch (e) {
        error && error('exclude', e);
    }
}