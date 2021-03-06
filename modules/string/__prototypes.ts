import * as IAcronymize from '../methods/acronymize';
import * as IContains from '../methods/contains';
import * as ICapitalize from '../methods/capitalize';
import * as IConvertUTCDate from '../methods/convertutcdate';
import * as ICount from '../methods/count';
import * as ICut from '../methods/cut';
import * as IEllipsis from '../methods/ellipsis';
import * as IEndItWith from '../methods/enditwith';
import * as IEndsWith from '../methods/endswith';
import * as IEndsWithAny from '../methods/endswithany';
import * as IEquals from '../methods/equals';
import * as IGetValue from '../methods/getvalue';
import * as IHighlight from '../methods/highlight';
import * as IIndexOfAlt from '../methods/indexofalt';
import * as IIreplaceAll from '../methods/ireplaceall';
import * as IIsBlank from '../methods/isblank';
import * as IIsCuid from '../methods/iscuid';
import * as IIsValidEmail from '../methods/isvalidemail';
import * as ILastIndexOfAlt from '../methods/lastindexofalt';
import * as ILtrim from '../methods/ltrim';
import * as IPluralize from '../methods/pluralize';
import * as IRandIndex from '../methods/rand-index';
import * as IReplaceAll from '../methods/replaceall';
import * as IReverse from '../methods/reverse';
import * as IRtrim from '../methods/rtrim';
import * as ISanitize from '../methods/sanitize';
import * as ISingularize from '../methods/singularize';
import * as IStartItWith from '../methods/startitwith';
import * as IStartsWith from '../methods/startswith';
import * as IStartsWithAny from '../methods/startswithany';
import * as IStrip from '../methods/strip';
import * as ISubstringBetween from '../methods/substringbetween';
import * as ISubstringStartFrom from '../methods/substringstartfrom';
import * as ISubstringEndAt from '../methods/substringendat';
import * as IToCurrencyNotation from '../methods/tocurrencynotation';
import * as IToDateTime from '../methods/todatetime';
import * as IToObject from '../methods/toobject';
import * as IUniversalTrim from '../methods/universaltrim';
import { WhereCondition, ArrayIterator } from '../models/Arrays';
import { ContainsObjectIterator, ContainsValue } from '../models/Contains';
import { ComparisonOperator } from '../models/ComparisonOperator';
import { AnyObject } from '../models/Generics';
import { DateTimeOptions } from '../models/DateTimeOptions';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const acronymize: typeof IAcronymize.default = require('../methods/acronymize').default;
const contains: typeof IContains.default = require('../methods/contains').default;
const capitalize: typeof ICapitalize.default = require('../methods/capitalize').default;
const convertUTCDate: typeof IConvertUTCDate.default = require('../methods/convertutcdate').default;
const count: typeof ICount.default = require('../methods/count').default;
const cut: typeof ICut.default = require('../methods/cut').default;
const ellipsis: typeof IEllipsis.default = require('../methods/ellipsis').default;
const endItWith: typeof IEndItWith.default = require('../methods/enditwith').default;
const endsWith: typeof IEndsWith.default = require('../methods/endswith').default;
const endsWithAny: typeof IEndsWithAny.default = require('../methods/endswithany').default;
const equals: typeof IEquals.default = require('../methods/equals').default;
const getValue: typeof IGetValue.default = require('../methods/getvalue').default;
const highlight: typeof IHighlight.default = require('../methods/highlight').default;
const indexOfAlt: typeof IIndexOfAlt.default = require('../methods/indexofalt').default;
const ireplaceAll: typeof IIreplaceAll.default = require('../methods/ireplaceall').default;
const isBlank: typeof IIsBlank.default = require('../methods/isblank').default;
const isCuid: typeof IIsCuid.default = require('../methods/iscuid').default;
const isValidEmail: typeof IIsValidEmail.default = require('../methods/isvalidemail').default;
const lastIndexOfAlt: typeof ILastIndexOfAlt.default = require('../methods/lastindexofalt').default;
const ltrim: typeof ILtrim.default = require('../methods/ltrim').default;
const pluralize: typeof IPluralize.default = require('../methods/pluralize').default;
const randIndex: typeof IRandIndex.default = require('../methods/rand-index').default;
const replaceAll: typeof IReplaceAll.default = require('../methods/replaceall').default;
const reverse: typeof IReverse.default = require('../methods/reverse').default;
const rtrim: typeof IRtrim.default = require('../methods/rtrim').default;
const sanitize: typeof ISanitize.default = require('../methods/sanitize').default;
const singularize: typeof ISingularize.default = require('../methods/singularize').default;
const startItWith: typeof IStartItWith.default = require('../methods/startitwith').default;
const startsWith: typeof IStartsWith.default = require('../methods/startswith').default;
const startsWithAny: typeof IStartsWithAny.default = require('../methods/startswithany').default;
const strip: typeof IStrip.default = require('../methods/strip').default;
const substringBetween: typeof ISubstringBetween.default = require('../methods/substringbetween').default;
const substringStartFrom: typeof ISubstringStartFrom.default = require('../methods/substringstartfrom').default;
const substringEndAt: typeof ISubstringEndAt.default = require('../methods/substringendat').default;
const toCurrencyNotation: typeof IToCurrencyNotation.default = require('../methods/tocurrencynotation').default;
const toDateTime: typeof IToDateTime.default = require('../methods/todatetime').default;
const toObject: typeof IToObject.default = require('../methods/toobject').default;
const universalTrim: typeof IUniversalTrim.default = require('../methods/universaltrim').default;
//#endregion
export function _acronymize(this: string, capsOnly?: boolean, delimiter?: string | RegExp): string;
export function _acronymize(this: string, match?: RegExp): string;
export function _acronymize(this: string, match?: RegExp, delimiter?: string | RegExp): string;
export function _acronymize(this: string, capsOnly?: any, delimiter?: any): string {
    /*|{
        "info": "String class extension to create an acronym from the given string",
        "category": "String",
        "parameters":[
            {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."}],

        "overloads":[
            {"parameters":[
                {"match": "(RegExp) Pattern to match to qualify the Acronym."}]},

            {"parameters":[
                {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
                {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]},

            {"parameters":[
                {"match": "(RegExp) Pattern to match to qualify the Acronym."},
                {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.acronymize",
        "returnType": "(String)"
    }|*/
    return acronymize(this, capsOnly, delimiter);
}
export function _capitalize(this: string, pos?: number | number[], everyWord?: boolean): string {
    /*|{
        "info": "String class extension to capitalize parts of the string",
        "category": "String",
        "parameters":[
            {"pos?": "(Int|Int[]) Index of the string to capitalize"},
            {"everyWord?": "(Bool) Flag to capital every word"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
        "returnType": "(String)"
    }|*/
    return capitalize(this, pos, everyWord);
}
export function _contains<T, TValue>(this: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, operator?: ComparisonOperator): boolean;
export function _contains<T, TValue>(this: T, val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains(this: string, val: ContainsValue): boolean;
export function _contains(this: number, val: ContainsValue): boolean;
export function _contains(this: any, val: any, func?: any) {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Number|Object",
        "parameters":[
            {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

        "overloads":[
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ComparisonOperator) String indicating logical operator (\"$lt\"|\"$lte\"|\"$gt\"|\"$gte\"|\"$mod\"|\"$type\")" }]},
            {"parameters":[
                {"arr": "(Array<TValue>) Array of values to return first matching value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool)"
    }|*/

    return contains(this, val, func);
}
export function _convertUTCDate(this: string, delimiter: string): string {
    /*|{
        "info": "String class extension to convert date string to UTC format",
        "category": "String",
        "parameters":[
            {"delimiter": "(String) Character that delimits the date string"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.convertUTCDate",
        "returnType": "(String)"
    }|*/
    return convertUTCDate(this, delimiter);
}

export function _count(this: string, option: WhereCondition | string | RegExp) {
    /*|{
        "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
        "category": "String|Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

            {"parameters":[
                {"option": "(String) Word or phrase to count in the String"}]},

            {"parameters":[
                {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
        "returnType": "(Int)"
    }|*/
    return count(this, option);
}
export function _cut(this: string, startIndex: number, endIndex: number, replacement?: string): string {
    /*|{
        "info": "String class extension to remove between the provided indexes",
        "category": "String",
        "parameters":[
            {"start_index": "(Integer) Start index to cut"},
            {"end_index": "(Integer) End index to cut"},
            {"replacement?": "(String) String to put in place of the cut"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
        "returnType": "(String)"
    }|*/
    return cut(this, startIndex, endIndex, replacement);
}
export function _ellipsis(this: string, before: number, after?: number): string {
    /*|{
        "info": "String class extension to shorten by ellipsis",
        "category": "String",
        "parameters":[
            {"before": "(Int) Number of characters to use before using ellipsis"},
            {"after?": "(Int) Number of characters to use after the ellipsis"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.ellipsis",
        "returnType": "(String)"
    }|*/
    return ellipsis(this, before, after);
}
export function _endItWith(this: string, ending: string): string {
    return endItWith(this, ending);
}
export function _endsWith(this: string, searchString: string, length?: number): boolean {
    return endsWith(this, searchString, length);
}
export function _endsWithAny(this: string, endsWith: string[]): string | false;
export function _endsWithAny(this: string, ...args: string[]): string | false;
export function _endsWithAny(this: string) {
    let args = [this];
    for (let i = 0, len = arguments.length; i < len; i++) {
        // @ts-ignore
        if (!i && typeof craydent_ctx != 'undefined' && this == arguments[i]) { continue; }
        args.push(arguments[i]);
    }
    return endsWithAny.apply(void 0, args as any);
}

export function _equals(this: AnyObject, compare: AnyObject, props?: string[]): boolean;
export function _equals(this: any, compare: any): boolean;
export function _equals(this: any, compare: any, props?: any): boolean {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Number|Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    return equals(this, compare, props);
}
export function _getValue(this: string, args?: any[], dflt?: any): any {
    return getValue(this as any, args, dflt);
}
export function _highlight(this: string, search: string | RegExp, cssClass?: string, tag?: string): string {
    /*|{
        "info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
        "category": "String",
        "parameters":[
            {"search": "(String|RegExp) String or Regular expression to search"},
            {"cssClass?": "(String) Class to add for highlighting"},
            {"tag?": "(String) Tag to use to surround the search"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.highlight",
        "returnType": "(String)"
    }|*/
    return highlight(this, search, cssClass, tag)
}
export function _indexOfAlt<T>(this: string, value: any, callback: ArrayIterator<T>): number;
export function _indexOfAlt(this: string, regex: RegExp, pos?: number): number;
export function _indexOfAlt<T>(this: string, value: string, callback: ArrayIterator<T>): number;
export function _indexOfAlt(this: string, regex: RegExp, pos?: number): number;
export function _indexOfAlt(this: string, value: any, option?: any): number {
    /*|{
        "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
        "category": "String|Array",
        "parameters":[
            {"value": "(any) value to find"},
            {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

        "overloads":[
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos?": "(Int) Index offset to start"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
        "typeParameter": "<T, TResult>",
        "returnType": "(Integer)"
    }|*/
    return indexOfAlt(this, value, option);
}
export function _ireplaceAll(this: string, replace: string[], subject: string[]): string;
export function _ireplaceAll(this: string, replace: string, subject: string): string;
export function _ireplaceAll(this: string, replace: any, subject: any): string {
    /*|{
        "info": "String class extension to replace all substrings ignoring case",
        "category": "String",
        "parameters":[
            {"replace": "(String|String[]) String or Array of strings to replace"},
            {"subject": "(String|String[]) String or Array of strings to replace with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.ireplace_all",
        "returnType": "(String)"
    }|*/
    return ireplaceAll(this, replace, subject);
}
export function _isBlank(this: string,) {
    /*|{
        "info": "String class extension to check if the string is empty",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isBlank",
        "returnType": "(Bool)"
    }|*/
    return isBlank(this);
}
export function _isCuid(this: string, msFormat?: boolean): boolean {
    /*|{
        "info": "String class extension to check if the string is a cuid",
        "category": "String",
        "parameters":[
            {"msFormat?": "(Bool) use microsoft format if true"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isCuid",
        "returnType": "(Bool)"
    }|*/
    return isCuid(this, msFormat);
}
export function _isValidEmail(this: string,): boolean {
    /*|{
        "info": "String class extension to check if string is a valid email",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isValidEmail",
        "returnType": "(Bool)"
    }|*/
    return isValidEmail(this);
}
export function _lastIndexOfAlt(this: string, regex: RegExp, pos?: number): number {
    /*|{
        "info": "String class extension to find the last index based on a regular expression",
        "category": "String",
        "parameters":[
            {"regex": "(RegExp) Regular expression to check value against"},
            {"pos?": "(Int) Max index to go up to in the search"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
        "returnType": "(Int)"
    }|*/
    return lastIndexOfAlt(this, regex, pos);
}
export function _ltrim(this: string, character?: string | string[]): string {
    /*|{
        "info": "String class extension to remove characters from the beginning of the string",
        "category": "String",
        "parameters":[
            {"character?": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.ltrim",
        "returnType": "(String)"
    }|*/
    return ltrim(this, character);
}
export function _pluralize(this: string,): string {
    /*|{
        "info": "String class extension to do a best guess pluralization of the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.pluralize",
        "returnType": "(String)"
    }|*/
    return pluralize(this);
}
export function _randIndex(this: string): number {
    /*|{
        "info": "Return a random index without the bounds",
        "category": "String",
        "parameters":[
            {"subject?": "(String) String to get valid random index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#randIndex",
        "returnType": "(Number)"
    }|*/
    return randIndex(this);
}
export default function _replaceAll(this: string, replace: string, subject: string): string;
export default function _replaceAll(this: string, replace: string[], subject: string[]): string;
export function _replaceAll(this: string, replace: any, subject: any): string {
    /*|{
        "info": "String class extension to replace all substrings (case sensitive)",
        "category": "String",
        "parameters":[
            {"replace": "(String|String[]) String or Array of strings to replace"},
            {"subject": "(String|String[]) String or Array of strings to replace with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
        "returnType": "(String)"
    }|*/
    return replaceAll(this, replace, subject);
}
export function _reverse(this: string,) {
    /*|{
        "info": "String class extension to reverse the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.reverse",
        "returnType": "(String)"
    }|*/
    return reverse(this);
}
export function _rtrim(this: string, character?: string | string[]): string {
    /*|{
        "info": "String class extension to remove characters from the end of the string",
        "category": "String",
        "parameters":[
            {"character?": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
        "returnType": "(String)"
    }|*/
    return rtrim(this, character);
}
export function _sanitize(this: string,) {
    /*|{
        "info": "String class extension to remove potential XSS threats",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.sanitize",
        "returnType": "(String)"
    }|*/
    return sanitize(this);
}
export function _singularize(this: string,): string {
    /*|{
        "info": "String class extension to do a best guess singularization of the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.singularize",
        "returnType": "(String)"
    }|*/
    return singularize(this);
}
export function _startItWith(this: string, starting: string): string {
    /*|{
        "info": "String class extension to guarantee the original string starts with the passed string",
        "category": "String",
        "parameters":[
            {"starting": "(String) String to start with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.startItWith",
        "returnType": "(String)"
    }|*/
    return startItWith(this, starting);
}
export function _startsWith(this: string, searchString: string, start: number): boolean {
    return startsWith(this, searchString, start) as boolean;
}
export function _startsWithAny(this: string, startsWith: string[]): string | false;
export function _startsWithAny(this: string, ...args: string[]): string | false;
export function _startsWithAny(this: string) {
    let args = [this];
    for (let i = 0, len = arguments.length; i < len; i++) {
        // @ts-ignore
        if (!i && typeof craydent_ctx != 'undefined' && this == arguments[i]) { continue; }
        args.push(arguments[i]);
    }
    return startsWithAny.apply(void 0, args as any);
}
export function _strip(this: string, character?: string | string[]): string {
    /*|{
        "info": "String class extension to remove characters from the beginning and end of the string",
        "category": "String",
        "parameters":[
            {"character?": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
        "returnType": "(String)"
    }|*/
    return strip(this, character);
}
export function _substringBetween(this: string, start?: string, end?: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"start?": "(Char) Character to use for the starting index (required if end is not passed)"},
            {"end?": "(Char) Character to use for the ending index (required if start is null or undefined)"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringBetween",
        "returnType": "(String)"
    }|*/
    return substringBetween(this, start, end);
}
export function _substringStartFrom(this: string, start: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"start": "(Char) Character to use for the starting index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringStartFrom",
        "returnType": "(String)"
    }|*/
    return substringStartFrom(this, start);
}
export function _substringEndAt(this: string, end: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"end": "(Char) Character to use for the ending index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringEndAt",
        "returnType": "(String)"
    }|*/
    return substringEndAt(this, end);
}
export function _toCurrencyNotation(this: string, sep?: string): string {
    /*|{
        "info": "String class extension to change number to use separater character",
        "category": "String",
        "parameters":[
            {"separator?": "(Char) Character to use as delimiter"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
        "returnType": "(String)"
    }|*/
    return toCurrencyNotation(this, sep);
}
export function _toDateTime(this: string, options?: DateTimeOptions): Date | string {
    /*|{
        "info": "String class extension to convert string to datetime",
        "category": "String",
        "parameters":[
            {"options?": "(DateTimeOptions) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.toDateTime",
        "returnType": "(Date|String)"
    }|*/
    return toDateTime(this, options);
}
export function _toObject(this: string, assignmentChar?: string, delimiter?: string): AnyObject {
    /*|{
        "info": "String class extension to convert to JSON",
        "category": "String",
        "parameters":[
            {"assignmentChar?": "(Char) Character to use as assignment delimiter. Defaults to '&'."},
            {"delimiter?": "(Char) Character to use as pair delimiter"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.toObject",
        "returnType": "(Object)"
    }|*/
    return toObject(this, assignmentChar, delimiter);
}
export function _trim(this: string, chars: string[]): string {
    /*|{
        "info": "String class extension to remove characters from the beginning and end of the string.",
        "category": "String",
        "parameters":[
            {"character?": "(Char[]) Character to remove in the String"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
        "returnType": "(Bool)"
    }|*/
    return universalTrim(this as string, chars);
}