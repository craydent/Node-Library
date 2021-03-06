import * as IChanges from '../methods/changes';
import * as IContains from '../methods/contains';
import * as ICopyObject from '../methods/copyobject';
import * as ICount from '../methods/count';
import * as IDuplicate from '../methods/duplicate';
import * as IEachProperty from '../methods/eachproperty';
import * as IEquals from '../methods/equals';
import * as IEvery from '../methods/every';
import * as IGetClass from '../methods/getclass';
import * as IGetProperty from '../methods/getproperty';
import * as IGetValue from '../methods/getvalue';
import * as IHas from '../methods/has';
import * as IIsArray from '../methods/isarray';
import * as IIsAsync from '../methods/isasync';
import * as IIsBetween from '../methods/isbetween';
import * as IIsBoolean from '../methods/isboolean';
import * as IIsDate from '../methods/isdate';
import * as IIsDomElement from '../methods/isdomelement';
import * as IIsEmpty from '../methods/isempty';
import * as IIsError from '../methods/iserror';
import * as IIsFloat from '../methods/isfloat';
import * as IIsFunction from '../methods/isfunction';
import * as IIsGenerator from '../methods/isgenerator';
import * as IIsGeolocation from '../methods/isgeolocation';
import * as IIsInt from '../methods/isint';
import * as IIsNumber from '../methods/isnumber';
import * as IIsPromise from '../methods/ispromise';
import * as IIsObject from '../methods/isobject';
import * as IIsRegExp from '../methods/isregexp';
import * as IIsString from '../methods/isstring';
import * as IIsSubset from '../methods/issubset';
import * as IItemCount from '../methods/itemcount';
import * as IKeyOf from '../methods/keyof';
import * as IGetKeys from '../methods/getkeys';
import * as IMap from '../methods/map';
import * as IMerge from '../methods/merge';
import * as ISetProperty from '../methods/setproperty';
import * as IToStringAlt from '../methods/tostringalt';
import { ArrayIterator, WhereCondition } from '../models/Arrays';
import { AnyObject, AnyObjects } from '../models/Generics';
import { ContainsObjectIterator, ContainsValue } from '../models/Contains';
import { ComparisonOperator } from '../models/ComparisonOperator';
import { EachIterator } from '../models/EachIterator';
import { ObjectIterator } from '../models/ObjectIterator';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const changes: typeof IChanges.default = require('../methods/changes').default;
const contains: typeof IContains.default = require('../methods/contains').default;
const copyObject: typeof ICopyObject.default = require('../methods/copyobject').default;
const count: typeof ICount.default = require('../methods/count').default;
const duplicate: typeof IDuplicate.default = require('../methods/duplicate').default;
const eachProperty: typeof IEachProperty.default = require('../methods/eachproperty').default;
const equals: typeof IEquals.default = require('../methods/equals').default;
const every: typeof IEvery.default = require('../methods/every').default;
const getClass: typeof IGetClass.default = require('../methods/getclass').default;
const getKeys: typeof IGetKeys.default = require('../methods/getkeys').default;
const getProperty: typeof IGetProperty.default = require('../methods/getproperty').default;
const getValue: typeof IGetValue.default = require('../methods/getvalue').default;
const has: typeof IHas.default = require('../methods/has').default;
const isArray: typeof IIsArray.default = require('../methods/isarray').default;
const isAsync: typeof IIsAsync.default = require('../methods/isasync').default;
const isBetween: typeof IIsBetween.default = require('../methods/isbetween').default;
const isBoolean: typeof IIsBoolean.default = require('../methods/isboolean').default;
const isDate: typeof IIsDate.default = require('../methods/isdate').default;
const isDomElement: typeof IIsDomElement.default = require('../methods/isdomelement').default;
const isEmpty: typeof IIsEmpty.default = require('../methods/isempty').default;
const isError: typeof IIsError.default = require('../methods/iserror').default;
const isFloat: typeof IIsFloat.default = require('../methods/isfloat').default;
const isFunction: typeof IIsFunction.default = require('../methods/isfunction').default;
const isGenerator: typeof IIsGenerator.default = require('../methods/isgenerator').default;
const isGeolocation: typeof IIsGeolocation.default = require('../methods/isgeolocation').default;
const isInt: typeof IIsInt.default = require('../methods/isint').default;
const isNumber: typeof IIsNumber.default = require('../methods/isnumber').default;
const isPromise: typeof IIsPromise.default = require('../methods/ispromise').default;
const isObject: typeof IIsObject.default = require('../methods/isobject').default;
const isRegExp: typeof IIsRegExp.default = require('../methods/isregexp').default;
const isString: typeof IIsString.default = require('../methods/isstring').default;
const isSubset: typeof IIsSubset.default = require('../methods/issubset').default;
const itemCount: typeof IItemCount.default = require('../methods/itemcount').default;
const keyOf: typeof IKeyOf.default = require('../methods/keyof').default;
const map: typeof IMap.default = require('../methods/map').default;
const merge: typeof IMerge.default = require('../methods/merge').default;
const setProperty: typeof ISetProperty.default = require('../methods/setproperty').default;
const toStringAlt: typeof IToStringAlt.default = require('../methods/tostringalt').default;
//#endregion

export function _changes(this: any, compare: AnyObject) {
    /*|{
        "info": "Object class extension to compare properties that have changed",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.",
        "returnType": "(Object)"
    }|*/
    return changes(this, compare);
}
export function _contains<T, TValue>(this: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, operator?: ComparisonOperator): boolean;
export function _contains<T, TValue>(this: T, val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains(this: string, val: ContainsValue): boolean;
export function _contains(this: number, val: ContainsValue): boolean;
export function _contains(this: any, val: any, func?: any): boolean {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Object",
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
export function _copyObject(this: any,) {
    /*|{
        "info": "Object class extension to copy an object excluding constructor",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
        "returnType": "(Object)"
    }|*/
    return copyObject(this);
}
export function _count(this: AnyObject): number;
export function _count(this: AnyObjects, option?: WhereCondition): number;
export function _count(this: string[], option?: string | RegExp): number;
export function _count(this: string, option?: string | RegExp): number;
export function _count(this: any, option?: any): number {
    /*|{
        "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
        "category": "Object",
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
export function _duplicate(this: any, recursive?: boolean) {
    /*|{
        "info": "Object class extension to copy an object including constructor",
        "category": "Object",
        "parameters":[
            {"recursive?": "(Boolean) Flag to copy all child objects recursively"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
        "returnType": "(Object)"
    }|*/
    return duplicate(this, recursive);
}
export function _eachProperty<T>(this: any, callback: EachIterator<T>): void {
    /*|{
        "info": "Object class extension to loop through all properties where hasOwnValue is true.",
        "category": "Object",
        "parameters":[
            {"callback": "(EachIterator<T>) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
        "typeParameter": "<T>",
        "returnType": "(Object)"
    }|*/
    return eachProperty(this, callback);
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
export function _every(this: any, callback: ArrayIterator<any> | ObjectIterator<any>, thisObject?: any): boolean {
    /*|{
        "info": "Object class extension to check property values against a function",
        "category": "Object",
        "parameters":[
            {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"}],

        "overloads":[
            {"parameters":[
                {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"},
                {"thisObject": "(any) Context for the callback function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.every",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool)"
    }|*/
    return every(this, callback, thisObject);
}
export function _get(this: any, path: string, delimiter?: string, options?: IGetProperty.GetPropertyOptions): any;
export function _get(this: any, path: RegExp): any;
export function _get(this: any, path: string, options?: IGetProperty.GetPropertyOptions): any;
export function _get(this: any, path: any, delimiter?: any, options?: any): any {
    /*|{
        "info": "Alias to getProperty; however, it can not be used as a protoype property.",
        "category": "Object",
        "featured": true,
        "parameters":[
            {"object": "(Object) object to get the property of"},
            {"path": "(String) Path to nested property"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[
            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(RegExp) Regex match for the property"}]},

            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(String) Path to nested property"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
        "returnType": "(any)"
    }|*/
    return getProperty(this, path, delimiter, options);
}
export function _getClass(this: any,): string {
    /*|{
        "info": "Object class extension to get the constructor name",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
        "returnType": "(String)"
    }|*/
    return getClass(this);
}
export function _getProperty(this: any, path: string, delimiter?: string, options?: IGetProperty.GetPropertyOptions): any;
export function _getProperty(this: any, path: RegExp): any;
export function _getProperty(this: any, path: string, options?: IGetProperty.GetPropertyOptions): any;
export function _getProperty(this: any, path: any, delimiter?: any, options?: any): any {
    /*|{
        "info": "Object class extension to retrieve nested properties without error when property path does not exist",
        "category": "Object",
        "featured": true,
        "parameters":[
            {"path": "(String) Path to nested property"}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"}]},

            {"parameters":[
                {"path": "(RegExp) Regex match for the property"}]},

            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
        "returnType": "(any)"
    }|*/
    return getProperty(this, path, delimiter, options);
}
export function _getValue(this: any, args?: any[], dflt?: any): any {
    return getValue(this, args, dflt);
}
export function _has(this: any, property: string): boolean {
    /*|{
        "info": "Alias to Object.prototype.hasOwnProperty",
        "category": "Object",
        "parameters":[
            {"property": "(String) Property name to check"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.has",
        "returnType": "(Boolean)"
    }|*/
    return has(this, property);
}
export function _isArray(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    return isArray(this);
}
export function _isAsync(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    return isAsync(this);
}
export function _isBetween(this: any, lowerBound: any, upperBound: any, inclusive?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object",
        "parameters":[
            {"lowerBound": "(any) Lower bound comparison"},
            {"upperBound": "(any) Upper bound comparison"},
            {"inclusive?": "(Bool) Flag to include give bounds"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
        "returnType": "(Bool)"
    }|*/
    return isBetween(this, lowerBound, upperBound, inclusive);
}
export function _isBoolean(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return isBoolean(this);
}
export function _isDate(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a date",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
        "returnType": "(Bool)"
    }|*/
    return isDate(this);
}
export function _isDomElement(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    return isDomElement(this);
}
export function _isEmpty(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if it is empty",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
        "returnType": "(Bool)"
    }|*/
    return isEmpty(this);
}
export function _isError(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return isError(this);
}
export function _isFloat(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    return isFloat(this);
}
export function _isFunction(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    return isFunction(this);
}
export function _isGenerator(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    return isGenerator(this);
}
export function _isGeolocation(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    return isGeolocation(this);
}
export function _isInt(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    return isInt(this);
}
export function _isNumber(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return isNumber(this);
}
export function _isPromise(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    return isPromise(this);
}
export function _isObject(this: any, check_instance?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object",
        "parameters":[
            {"check_instance": "(Boolean) Flag to check instance type"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    return isObject(this, check_instance);
}
export function _isRegExp(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    return isRegExp(this);
}
export function _isString(this: any,): boolean {
    /*|{
        "info": "Object class extension to check if object is a string",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
        "returnType": "(Bool)"
    }|*/
    return isString(this);
}
export function _isSubset<R>(this: any, compare: R, sharesAny?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if item is a subset",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Superset to compare against"},
            {"sharesAny": "(Boolean) Flag to check if any property is shared"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
        "returnType": "(Bool)"
    }|*/
    return isSubset(this, compare, sharesAny);
}
export function _itemCount(this: any,): number {
    /*|{
        "info": "Object class extension to count the properties in item",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
        "returnType": "(Int)"
    }|*/
    return itemCount(this);
}
export function _keyOf(this: any, value: any): string {
    /*|{
        "info": "Object class extension to get the key of the give value",
        "category": "Object",
        "parameters":[
            {"value": "(any) Value to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
        "returnType": "(String)"
    }|*/
    return keyOf(this, value);
}
export function _getKeys(this: any,): string[] {
    /*|{
        "info": "Object class extension to get the keys of the object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
        "returnType": "(Array<string>)"
    }|*/
    return getKeys(this);
}
export function _map<T>(this: any, callback: ObjectIterator<T>, thisObject?: any): T {
    /*|{
        "info": "Object class extension to apply method to every value",
        "category": "Object",
        "parameters":[
            {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"},
            {"thisObject?": "(any) Context for the callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.map",
        "typeParameter": "<T, TValue>",
        "returnType": "(void)"
    }|*/
    return map(this, callback, thisObject) as T;
}
export function _merge(this: any, secondary: any, condition: IMerge.MergeEnums | IMerge.MergeOptions | IMerge.MergeIterator) {
    /*|{
        "info": "Object class extension to merge objects",
        "category": "Object",
        "parameters":[
            {"secondary": "(Object) Object to merge with"},
            {"condition?": "(MergeEnums|MergeOptions|MergeIterator<T>) Flags to recurse, merge only shared value, clone, intersect etc"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
        "typeParameter": "<T>",
        "returnType": "(Object)"
    }|*/
    return merge(this, secondary, condition as any);
}
export function _set(this: any, path: string, value: any, delimiter?: string): boolean {
    /*|{
        "info": "Alias to setProperty; however, it can not be used as a protoype property.",
        "category": "Object",
        "parameters":[
            {"object": "(Object) object to add the property to"},
            {"path": "(String) Path to nested property"},
            {"value": "(any) Value to set"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    return setProperty(this, path, value, delimiter);
}
export function _setProperty(this: any, path: string, value: any, delimiter?: string): boolean {
    /*|{
        "info": "Object class extension to set nested properties creating necessary property paths",
        "category": "Object",
        "parameters":[
            {"path": "(String) Path to nested property"},
            {"value": "(any) Value to set"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    return setProperty(this, path, value, delimiter);
}
export function _toStringAlt(this: any, delimiter?: string, prefix?: string, urlEncode?: boolean): string {
    /*|{
        "info": "Object class extension for an alternate way to stringify object to formatted string",
        "category": "Object",
        "parameters":[
            {"delimiter?": "(Char) Character to separate the property from the value"},
            {"prefix?": "(Char) Character to prefix the property name"},
            {"urlEncode?": "(Bool) Flag to url encode the property and value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#",
        "returnType": "(String)"
    }|*/
    return toStringAlt(this, delimiter, prefix, urlEncode);
}

