import error from '../methods/error';

export default function substringStartFrom(str: string, start: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"start": "(Char) Character to use for the starting index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringStartFrom",
        "returnType": "(String)"
    }|*/
    try {
        return str.substring(str.indexOf(start));
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.substringStartFrom', e);
        return null as any;
    }
}