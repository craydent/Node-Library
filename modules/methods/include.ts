/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import clearCache from './clearCache';
import relativePathFinder from './relativePathFinder';
import startsWithAny from './startsWithAny';

export default function include(path?: string, refresh?: boolean): any {
    /*|{
        "info": "Require without erroring when module does not exist.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Module or Path to module."},
            {"refresh?": "(Bool) Flag to clear cache for the specific include."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#include",
        "returnType": "(any|false)"
    }|*/
    try {
        if (refresh) { clearCache(path); }
        if (startsWithAny(path, ['/', '.'])) {
            return require(relativePathFinder(path));
        }
        return require(path);
    } catch (e) {
        try {
            return require(relativePathFinder(path));
        } catch (err) {
            return null;
        }
    }
}