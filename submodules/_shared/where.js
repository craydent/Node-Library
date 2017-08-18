/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {}, $s = {};


require('./average');
require('./contains');
require('./date');
require('./getValue');
require('./isSubset');
require('./parseBoolean');
require('./removeAt');
require('./stdev');
require('./toSet');

var _contains = $c.contains,
    _equals = $c.equals,
    _isArray = $c.isArray,
    _isNull = $c.isNull,
    _isFunction = $c.isFunction,
    _isObject = $c.isObject,
    _isString = $c.isString,
    _isRegExp = $c.isRegExp,
    _isInt = $c.isInt;

function __queryNestedProperty(obj, path/*, value*/) {
    if (obj[path]) { return [obj[path]]; }
    var parts = path.split('.'), values = [];
    var prop, i = 0;
    while (prop = parts[i++]) {
        if (!obj.hasOwnProperty(prop)) { return []; }
        if (_isArray(obj[prop])) {
            if (_isNull(parts[i])) { return obj[prop]; }
            var subPath = parts.slice(i).join('.'), items = obj[prop];
            for (var j = 0, jlen = items.length; j < jlen; j++) {
                values = values.concat(__queryNestedProperty(items[j], subPath));
            }
            return values;
        }
        obj = obj[prop];
    }
    return [obj];
}

function __parseArithmeticExpr (doc,expr,field) {
    var value, i = 0, sexp;
    switch (field) {
        case "$add":
            value = 0;
            while (sexp = expr["$add"][i++]) {
                value += __processExpression(doc, sexp);
            }
            return value;
        case "$subtract":
            return __processExpression(doc, expr["$subtract"][0]) - __processExpression(doc, expr["$subtract"][1]);
        case "$multiply":
            value = 1;
            while (sexp = expr["$multiply"][i++]) {
                value *= __processExpression(doc, sexp) || 0;
            }
            return value;
        case "$divide":
            return __processExpression(doc, expr["$divide"][0]) / __processExpression(doc, expr["$divide"][1]);
        case "$mod":
            return __processExpression(doc, expr["$mod"][0]) % __processExpression(doc, expr["$mod"][1]);
    }
}
function __parseArrayExpr (doc,expr,field) {
    switch (field) {
        case "$size":
            return (__processExpression(doc, expr[field], field) || []).length;
    }
}
function __parseBooleanExpr (doc,expr,field) {
    var arr = [], i = 0, obj;
    switch (field) {
        case "$and":
            arr = expr["$and"];
            while (obj = arr[i++]) {
                if (!__processExpression(doc, arr)) { return false; }
            }
            return true;
        case "$or":
            arr = expr["$or"];
            while (obj = arr[i++]) {
                if (__processExpression(doc, arr)) { return true; }
            }
            return false;
        case "$not":
            arr = expr["$not"];
            return !__processExpression(doc, arr[0]);
    }
}
function __parseComparisonExpr (doc,expr,field) {
    var sortOrder = [
            undefined,
            null,
            Number,
            typeof Symbol != "undefined" ? Symbol : "Symbol",
            String,
            Object,
            Array,
            typeof BinData != "undefined" ? BinData : "BinData",
            typeof ObjectId != "undefined" ? ObjectId : "ObjectId",
            Boolean,
            Date,
            typeof Timestamp != "undefined" ? Timestamp : "Timestamp",
            RegExp
        ],
        value1 = __processExpression(doc, expr[field][0]),
        value2 = __processExpression(doc, expr[field][1]),
        cmp = null;

    if (value1 == value2) { cmp = 0; }
    if (value1 < value2) { cmp = -1; }
    if (value1 > value2) { cmp = 1; }

    if (_isNull(cmp)) {
        value1 = sortOrder.indexOf(~([null, undefined].indexOf(value1)) ? value1 : value1.constructor);
        value2 = sortOrder.indexOf(~([null, undefined].indexOf(value2)) ? value2 : value2.constructor);

        if (value1 < value2) { cmp = -1; }
        if (value1 > value2) { cmp = 1; }
    }
    switch (field) {
        case "$cmp":
            return cmp;
        case "$eq":
            return cmp === 0;
        case "$gt":
            return cmp === 1;
        case "$gte":
            return cmp === 1 || cmp === 0;
        case "$lt":
            return cmp === -1;
        case "$lte":
            return cmp === -1 || cmp === 0;
        case "$ne":
            return cmp !== 0;
    }
}
function __parseCond(doc,expr){
    if (!_isObject(expr) || !expr['$cond']) { return expr; }
    // parse $cond
    var condition = expr['$cond'],
        boolExpression,
        thenStatement,
        elseStatement;
    if (_isArray(condition)) {
        boolExpression = condition[0];
        thenStatement = condition[1];
        elseStatement = condition[2];
    } else {
        boolExpression = condition["if"];
        thenStatement = condition["then"];
        elseStatement = condition["else"];
    }
    return __processExpression(doc, boolExpression) ? thenStatement : elseStatement;
}
function __parseConditionalExpr (doc,expr,field) {
    switch (field) {
        case "$cond":
            return __parseCond(doc, expr);
        case "$ifNull":
            var value = __processExpression(doc, expr["$ifNull"][0]);
            return _isNull(value,__processExpression(doc, expr["$ifNull"][1]));
    }
}
function __parseDateExpr (doc,expr,field) {
    var dt = __processExpression(doc, expr[field]);
    switch (field) {
        case "$dayOfYear":
            return $c.getDayOfYear(dt);
        case "$dayOfMonth":
            return dt.getDate();
        case "$dayOfWeek":
            return dt.getDay() + 1;
        case "$year":
            return dt.getFullYear();
        case "$month":
            return dt.getMonth() + 1;
        case "$week":
            return $c.getWeek(dt);
        case "$hour":
            return dt.getHours();
        case "$minute":
            return dt.getMinutes();
        case "$second":
            return dt.getSeconds();
        case "$millisecond":
            return dt.getMilliseconds();
        case "$dateToString":
            dt = __processExpression(doc, expr[field].date);
            return $c.format(dt,expr[field].format);
    }
}
function __parseSetExpr (doc,expr,field) {
    var i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
    switch (field) {
        case "$setEquals":
            while (exp = expr[field][i++]) {
                set1 = $c.duplicate(__processExpression(doc, expr[field][i - 2]));
                set2 = $c.duplicate(__processExpression(doc, exp));
                if (!_isArray(set1) || !_isArray(set2)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                    $c.capitalize(typeof (!_isArray(set1) ? set1 : set2));
                }
                $c.toSet(set1);
                $c.toSet(set2);
                if (set1.length != set2.length) { return false; }
                for (jlen = set1.length; j < jlen; j++) {
                    if (!~set2.indexOf(set1[j])) { return false; }
                }
            }
            return true;
        case "$setIntersection":
            rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
            errorMessage = "Exception: All operands of $setIntersection must be arrays. One argument is of type: ";
            if(!_isArray(rtnSet)) {
                throw errorMessage + $c.capitalize((typeof rtnSet));
            }
            $c.toSet(rtnSet);
            while (exp = expr[field][i++]) {
                set1 = $c.duplicate(__processExpression(doc, exp));
                if (!_isArray(set1)){
                    throw errorMessage + $c.capitalize(typeof set1);
                }
                $c.toSet(set1);
                if (set1.length < rtnSet.length) {
                    var settmp = set1;
                    set1 = rtnSet;
                    rtnSet = settmp;
                }
                for (jlen = rtnSet.length; j < jlen; j++) {
                    if (!~set1.indexOf(rtnSet[j])) { $c.removeAt(rtnSet,j--); jlen--; }
                }
                if (!rtnSet.length) { return rtnSet; }
            }
            return rtnSet;
        case "$setUnion":
            rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
            errorMessage = "Exception: All operands of $setUnion must be arrays. One argument is of type: ";
            if(!_isArray(rtnSet)) {
                //noinspection ExceptionCaughtLocallyJS
                throw errorMessage + $c.capitalize(typeof rtnSet);
            }
            while (exp = expr[field][i++]) {
                var arr = $c.duplicate(__processExpression(doc, exp));
                if (!_isArray(arr)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorMessage + $c.capitalize(typeof arr);
                }
                rtnSet = rtnSet.concat(arr);
            }
            return $c.toSet(rtnSet);
        case "$setDifference":
            arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
            arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            if (!_isArray(arr1) || !_isArray(arr2)){
                //noinspection ExceptionCaughtLocallyJS
                throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                $c.capitalize(typeof (!_isArray(arr1) ? arr1 : arr2));
            }
            for (jlen = arr1.length; j < jlen; j++) {
                st = arr1[j];
                if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
                    rtnSet.push(st);
                }
            }
            return rtnSet;
        case "$setIsSubset":
            arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
            arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            if (!_isArray(arr1) || !_isArray(arr2)){
                //noinspection ExceptionCaughtLocallyJS
                throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                $c.capitalize(typeof (!_isArray(arr1) ? arr1 : arr2));
            }
            return $c.isSubset(arr1,arr2);
        case "$anyElementTrue":
            arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
            falseCondition = [undefined,null,0,false];

            while (st = arr1[j++]) {
                if (!~falseCondition.indexOf(st)) { return true; }
            }
            return false;
        case "$allElementsTrue":
            arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
            falseCondition = [undefined,null,0,false];

            for (jlen = arr1.length; j < jlen; j++) {
                if (~falseCondition.indexOf(arr1[j])) { return false; }
            }
            return true;
    }
}
function __parseStringExpr (doc,expr,field) {
    switch (field) {
        case "$concat":
            var value = "", i = 0, exp;
            while (exp = expr["$concat"][i++]) {
                value += __processExpression(doc, exp);
            }
            return value;
        case "$substr":
            var index = expr["$substr"][1], length = expr["$substr"][2] < 0 ? undefined : expr["$substr"][2];
            return __processExpression(doc, expr["$substr"][0]).substr(index, length);
        case "$toLower":
            return (__processExpression(doc, expr["$toLower"]) || "").toLowerCase();
        case "$toUpper":
            return (__processExpression(doc, expr["$toLower"]) || "").toUpperCase();
        case "$strcasecmp":
            var value1 = (__processExpression(doc, expr["$strcasecmp"][0]) || "").toString(),
                value2 = (__processExpression(doc, expr["$strcasecmp"][1]) || "").toString();
            if (value1 == value2) { return 0; }
            if (value1 < value2) { return -1; }
            if (value1 > value2) { return 1; }
    }
}
function __parseVariableExpr (doc,expr,field) {
    switch (field) {
        case "$map":
            var input = __processExpression(doc, expr[field].input),
                v_as = "$" + expr[field].as,
                v_in = expr[field]["in"];

            for (var i = 0, len = input.length; i < len; i++) {
                doc[v_as] = input[i];
                input[i] = __processExpression(doc, v_in);
                delete doc[v_as];
            }
            return input;
        case "$let":
            var vars = expr[field].vars,
                rmProps = [], rtn = null;
            for (var prop in vars) {
                if (!vars.hasOwnProperty(prop)) { continue; }
                doc["$" + prop] = __processExpression(doc, vars[prop]);
                rmProps.push(prop);
            }
            rtn = __processExpression(doc, expr[field]["in"]);
            for (var j = 0, jlen = rmProps.length; j < jlen; j++) {
                delete doc[rmProps[j]];
            }
            return rtn;
    }
}

function __processAccumulator (doc,accumulator,previousValue_arg,meta) {
    var value = __processExpression(doc,
        accumulator["$sum"] ||
        accumulator["$avg"] ||
        accumulator["$first"] ||
        accumulator["$last"] ||
        accumulator["$max"] ||
        accumulator["$min"] ||
        accumulator["$push"] ||
        accumulator["$addToSet"] ||
        accumulator["$stdDevPop"] ||
        accumulator["$stdDevSamp"]
    ),
        previousValue = previousValue_arg;
    switch (true) {
        case !!accumulator["$sum"]:
            return (value || 0) + (previousValue || 0);
        case !!accumulator["$avg"]:
            previousValue = previousValue || [];
            if (!_isNull(value)) { previousValue.push(value); }
            if (meta.length == meta.index + 1) { previousValue = $c.average(previousValue); }
            return previousValue;
        case !!accumulator["$first"]:
            if(_isNull(previousValue)) { previousValue = value; }
            return previousValue;
        case !!accumulator["$last"]:
            return _isNull(value, previousValue);
        case !!accumulator["$max"]:
            if (_isNull(previousValue)) { previousValue = -9007199254740991; }
            if (_isNull(value)) { value = -9007199254740991 }
            if (meta.length == meta.index + 1 && value == previousValue == -9007199254740991) { return undefined; }
            return Math.max(value, previousValue);
        case !!accumulator["$min"]:
            if (_isNull(previousValue)) { previousValue = 9007199254740991; }
            if (_isNull(value)) { value = 9007199254740991 }
            if (meta.length == meta.index + 1 && value == previousValue == 9007199254740991) { return undefined; }
            return Math.min(value, (previousValue || 9007199254740991));
        case !!accumulator["$push"]:
            previousValue = previousValue || [];
            if (!_isNull(value)) { previousValue.push(value); }
            return previousValue;
        case !!accumulator["$addToSet"]:
            previousValue = previousValue || [];
            if (!_isNull(value) && !~previousValue.indexOf(value)) { previousValue.push(value); }
            return previousValue;
        case !!accumulator["$stdDevSamp"]:
            if (meta.sample && ~meta.sample.indexOf(doc)) {
                if (!_isNull(value)) {
                    previousValue = previousValue || [];
                    previousValue.push(value);
                }
            }
            if (meta.length == meta.index + 1) {
                previousValue = $c.stdev(previousValue || []);
            }
            return _isNull(previousValue) ? null : previousValue;
        case !!accumulator["$stdDevPop"]:
            if (!_isNull(value)) {
                previousValue = previousValue || [];
                previousValue.push(value); }
            if (meta.length == meta.index + 1) {
                previousValue = $c.stdev(previousValue || []);
            }
            return _isNull(previousValue) ? null : previousValue;
    }
}
function __processExpression (doc,expr) {
    if (_isString(expr)) {
        if (expr[0] == "$") { expr = expr.substr(1); }
        return $c.getProperty(doc, expr.replace("$CURRENT.", ""));
    }
    if (!_isObject(expr)) { return expr; }
    for (var field in expr) {
        if (!expr.hasOwnProperty(field)) { continue; }
        var value = expr[field],
            literalKeys = ["$literal"],
            boolKeys = ["$and", "$or", "$not"],
            setKeys = ["$setEquals", "$setIntersection", "$setUnion", "$setDifference", "$setIsSubset", "$anyElementTrue", "$allElementsTrue"],
            compareKeys = ["$cmp", "$eq", "$gt", "$gte", "$lt", "$lte", "$ne"],
            arithmeticKeys = ["$add", "$subtract", "$multiply", "$divide", "$mod"],
            stringKeys = ["$concat", "$substr", "$toLower", "$toUpper", "$strcasecmp"],
            arrayKeys = ["$size"],
            variableKeys = ["$map", "$let"],
            dateKeys = ["$dayOfYear", "$dayOfMonth", "$dayOfWeek", "$year", "$month", "$week", "$hour", "$minute", "$second", "$millisecond", "$dateToString"],
            conditionalKeys = ["$cond", "$ifNull"];

        switch (true) {
            case !!~literalKeys.indexOf(field):
                return expr;
            case !!~boolKeys.indexOf(field):
                return __parseBooleanExpr(doc, expr, field);
            case !!~setKeys.indexOf(field):
                return __parseSetExpr(doc, expr, field);
            case !!~compareKeys.indexOf(field):
                return __parseComparisonExpr(doc, expr, field);
            case !!~arithmeticKeys.indexOf(field):
                return __parseArithmeticExpr(doc, expr, field);
            case !!~stringKeys.indexOf(field):
                return __parseStringExpr(doc, expr, field);
            case !!~arrayKeys.indexOf(field):
                return __parseArrayExpr(doc, expr, field);
            case !!~variableKeys.indexOf(field):
                return __parseVariableExpr(doc, expr, field);
            case !!~dateKeys.indexOf(field):
                return __parseDateExpr(doc, expr, field);
            case !!~conditionalKeys.indexOf(field):
                return __parseConditionalExpr(doc, expr, field);
            default:
                __processExpression (doc,value);
                break;
        }
    }
}

function _record_range (ranges, start, end, flag) {
    // flag 1 means $lt(e) 2 means $gt(e)
    if (!ranges.length) { return ranges.push([start,end]); }
    if (ranges[0][0] > end) {
        return ranges.unshift([start,end]);
    }
    if (ranges[ranges.length - 1][1] < start) {
        return ranges.push([start,end]);
    }
    for (var i = 0, len = ranges.length; i < len; i++) {
        var range = ranges[i];
        if (end <= range[1] && flag === 1) {
            if (i) {
                $c.removeAt(ranges, i);
                i--, len--;
            }
            ranges[i][1] = end;
            return;
        }
        if (start > range[1] + 1) {
            if (flag === 2) {
                var r = $c.removeAt(ranges, j);
                j--, len--;
            }
            continue;
        }
        if (start <= range[1] + 1) {
            if (flag === 2) {
                range[0] = start;
                return;
            }
            for (var j = i + 1; j < len; j++) {
                var rg = ranges[j];
                if (rg[0] - 1 > end) {
                    break;
                }
                if (rg[1] >= end || rg[0] - 1 == end) {
                    $c.removeAt(ranges, j);
                    j--, len--;
                    end = rg[1];
                    break;
                }
                if (rg[1] < end) {
                    var r = $c.removeAt(ranges, j);
                    j--, len--;
                }
            }
            if (range[1] > end) { end = range[1]; }
            else { range[1] = end; }

        }
    }
}
function _reverse_range (ranges, start, end) {
    var reverse = [];
    reverse.items = 0;
    for (var i = 0, len = ranges.length; i < len; i++) {
        var range = ranges[i];
        if (end < range[1]) { return reverse; }
        if (range[0] > start) {
            reverse.items += range[0] - start + 1;
            reverse.push([start, range[0] - 1]);
            start = range[1] + 1;
        }
    }
    var range = ranges[ranges.length - 1];
    if (range[1] < end) {
        reverse.push([range[1] + 1, end])
    }
    return reverse;
}

function _binarySearch(sarr_arg, options) {
    var sarr = sarr_arg,
        prop = options.prop,
        value = options.condition,
        sindex = options.start_index = _isNull(options.start_index) ? 0 : options.start_index,
        eindex = options.end_index = _isNull(options.end_index) ? sarr.length - 1 : options.end_index,
        findIndex = options.find_index;

    if (_isObject(value)) {
        var tmp_arr = [], ranges = [];
        for (var cprop in value) {
            if (value.hasOwnProperty(cprop)) {
                var found_index = -1;
                var opt = {
                    prop: prop,
                    condition: cprop == "$exists" ? undefined : value[cprop],
                    find_index: true,
                    start_index: null,
                    end_index: null
                };
                if (cprop != "$in" && cprop != "$nin") {
                    found_index = _binarySearch(sarr, opt);
                }
                switch (cprop) {
                    case "$eq":
                    case "$equal":
                        _record_range(ranges, found_index, found_index);
                        break;
                    case "$ne":
                        _record_range(ranges, 0, found_index - 1);
                        _record_range(ranges, found_index + 1, sarr.buckets[prop].__bucket__keys.length);
                        break;
                    case "$lt":
                        _record_range(ranges, 0, found_index - 1, 1);
                        break;
                    case "$lte":
                        _record_range(ranges, 0, found_index + 1, 1);
                        break;
                    case "$gt":
                        _record_range(ranges, found_index + 1, sarr.buckets[prop].__bucket__keys.length /*- 1*/, 2);
                        break;
                    case "$gte":
                        _record_range(ranges, found_index, sarr.buckets[prop].__bucket__keys.length /*- 1*/, 2);
                        break;
                    case "$exists":
                        var rng;
                        if (value[cprop]) {
                            _record_range(ranges, 0, found_index - 1);
                            _record_range(ranges, found_index + 1, sarr.buckets[prop].__bucket__keys.length);
                        } else {
                            _record_range(ranges, found_index, found_index);
                        }
                        break;
                    case "$in":
                        for (var i = 0, len = value[cprop].length; i < len; i++) {
                            found_index = sarr.buckets[prop].__bucket__keys.indexOf(value[cprop][i]);
                            _record_range(ranges, found_index, found_index);
                        }
                        break;
                    case "$nin":
                        var rng = [];
                        for (var i = 0, len = value[cprop].length; i < len; i++) {
                            found_index = sarr.buckets[prop].__bucket__keys.indexOf(value[cprop][i]);
                            rng.push([found_index, found_index]);
                        }
                        rng = _reverse_range(rng, 0, sarr.buckets[prop].__bucket__keys.length /*- 1*/)
                        for (var i = 0, len = rng.length; i < len; i++) {
                            _record_range(ranges, rng[i][0], rng[i][1]);
                        }
                        break;
                }
            }
        }
        for (var i = 0, len = ranges.length; i < len; i++) {
            var range = ranges[i];
            for (var j = range[0], jlen = range[1] + 1; j < jlen; j++) {
                tmp_arr = tmp_arr.concat(sarr.buckets[prop][sarr.buckets[prop].__bucket__keys[j]]);
            }
        }
        return tmp_arr;
    }

    if (findIndex) {
        return sarr.buckets[prop].__bucket__keys.indexOf(value);
        if (!~eindex) { return 0; }
        if (sarr[sindex][prop] > value) { return sindex; }
        if (sarr[eindex][prop] < value) { return eindex; }
    }
    !sarr.buckets[prop][value] && (console.log(sarr.buckets.constructor, prop, value),process.exit());
    return sarr.buckets[prop][value];
}
function _copyWithProjection(projection_arg, record, preserveProperties) {
    var copy = {}, len = 0,
    projection = projection_arg || "*";
    if (_isString(projection)) {
        projection = projection.split(',');
    }
    if (_isArray(projection)) {
        if (!(len = projection.length)) {
            copy = $c.duplicate(record);
            return copy;
        }
        var arr = projection;
        projection = {};
        var i = 0, a;
        while (a = arr[i++]) {
            projection[a] = 1;
        }
    }

    for (var prop in projection) {
        if (projection.hasOwnProperty(prop) && projection[prop]) {
            var val = $c.getProperty(record,prop) || null;
            if (prop == "*") {
                copy = $c.duplicate(record,true);
            } else if ($c.parseBoolean(projection[prop])) {
                if (preserveProperties || !_isNull(val)) {
                    $c.setProperty(copy, prop, val);
                }
            } else if (!_isObject(projection[prop]) && !val) {
                copy[prop] = projection[prop];
            } else if (_isObject(projection[prop]) || val && !_isArray(val)) {
                copy[prop] = __processExpression(record,projection[prop]);
            } else if (val) {
                var del = true;
                if (prop.slice(-2) == ".$") {
                    prop = prop.slice(0,-2);
                    copy[prop] = val.slice(0,1);
                } else if (projection[prop]['$elemMatch']) {
                    copy[prop] = where(val,projection[prop]['$elemMatch']).slice(0,1);
                } else if (projection[prop]['$slice']) {
                    var start = 0, length = _isInt(projection[prop]['$slice']) ? projection[prop]['$slice'] : 0;

                    if (_isArray(projection[prop]['$slice'])) {
                        start = projection[prop]['$slice'][0];
                        length = projection[prop]['$slice'][1];
                    }
                    copy[prop] = val.slice(start, length);
                } else if (projection[prop]) {
                    del = false;
                    $c.setProperty(copy, prop, val);
                }
                if (del && !copy[prop].length) {
                    delete copy[prop];
                }
            } else {
                copy[prop] = projection[prop];
            }
        }
    }
    return copy;
}
function _subQuery(query, field, index , _whereRefs_arg) {
    var _whereRefs = _whereRefs_arg || [];
    if (!_isObject(query)) {
        if (~field.indexOf('.')) { return "_equals($s.getProperty(record.'" + field + "'), " + $c.parseRaw(query) + ")";}
        return "_equals(record['" + field + "'], " + $c.parseRaw(query) + ")";
    }
    var expression = "true", comparison_map = {
        "$lt":"_clt",
        "$lte":"_clte",
        "$gt":"_cgt",
        "$gte":"_cgte"
    };


    // prep multiple subqueries
    for (var prop in query) {
        if (!query.hasOwnProperty(prop)){ continue; }
        switch(prop) {
            // value is the record in the array
            // q is the conditional value
            case "$equals":
            case "$eq":
            case "$regex":
            case "$ne":
                var val = $c.getValue(query[prop]), q = "(" + $c.parseRaw(val) + ")";
                if (_isFunction(val)) {
                    q += "(record,'" + field + "',index)";
                } else {
                    q = "_contains(values," + q + ")";
                }
                expression += " && ((values = _qnp(record, '" + field + "')).length && " + (prop == "$ne" ? "!" : "") + q + ")";
                break;
            case "$lt":
            case "$lte":
            case "$gt":
            case "$gte":
                expression += " && ((values = _qnp(record, '" + field + "')).length && " + comparison_map[prop] + "(values," + $c.parseRaw(query[prop]) + "))";
                break;
            case "$exists":
                expression += " && ((finished = {validPath:0}),$s.getProperty(record,'" + field + "','.',finished),$s.parseBoolean(finished.validPath) == " + query['$exists'] + ")";
                break;
            case "$type":
                var qt = _isNull(query["$type"]) ? "!" : "";
                expression += " && (" + qt + "(values = _qnp(record, '" + field + "')).length && _ct(values," + $c.getFuncName(query['$type']) + "))";
            case "$text":
                //return record.getProperty(field).contains(query['$search']);
                break;
            case "$mod":
                var qm = _isArray(query['$mod']);
                expression += " && ((values = _qnp(record, '" + field + "')).length && " + qm + " && _cm(values," + $c.parseRaw(query[prop]) + "))";
                break;
            case "$all":
                var all = $c.parseRaw(query['$all']) || undefined;
                expression += " && (values = _qnp(record, '" + field + "')),(all = " + all + "),(_isArray(values[0]) && _isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!_contains(values[0],all[j])) { return false; }} return true;})()";
                break;
            case "$size":
                var ival = parseInt(query['$size']);
                expression += " && (values = _qnp(record, '" + field + "')[0]),(_isArray(values) ? (" + ival + " === values.length) : (values == undefined && 0 === " + ival + "))";
                break;
            case "$where":
                var isfunc = _isFunction(query['$where']);
                if (isfunc) {
                    _whereRefs.push(query['$where']);
                }
                var val = "(" + (isfunc ? "__where_cb" + _whereRefs.length : "function(){return (" + query['$where'] + ");}") + ")";
                expression += " && " + val + ".call(record)";
                break;
            case "$elemMatch":
                expression += " && (values = _qnp(record, '" + field + "')[0]),(_isArray(values) && !!where(values," + $c.parseRaw(query['$elemMatch']) + ",1).length)";
                break;
            case "$or":
            case "$nor":
                var ors = query[prop],o = 0, or,nor = "";
                if (!_isArray(ors)) { return false; }
                if (prop == "$nor") { nor = "!"; }
                expression += " && " + nor + "(";
                while (or = ors[o++]) {
                    expression += "(" + _subQuery(or, field, index, _whereRefs) + ") || ";
                }
                expression += "false)";

                break;
            case "$and":
                var ands = query['$and'],a = 0, and;
                if (!_isArray(ands)) { return false; }
                expression += " && (";
                while (and = ands[a++]) {
                    expression += "(" + _subQuery(and, field, index, _whereRefs) + ") && ";
                }
                expression += "true)";

                break;
            case "$not":
                if (!_isObject(query['$not'])) {
                    expression += " && _contains(values, "+$c.parseRaw(query['$not'])+")";
                    break;
                }

                expression += " && !(" + _subQuery(query[prop],field,null,_whereRefs) + ")";
                break;

            case "$in":
            case "$nin":
                expression += " && " + (prop == "$nin" ? "!" : "") + "((values = _qnp(record, '" + field + "')[0]),_contains(" + $c.parseRaw(query[prop]) + ",values))";
                break;
            default:
                expression += " && " + _subQuery(query[prop], $c.replace_all(prop,'\'','\\\''),null,_whereRefs);
                break;
        }
    }
    return expression;
}


function _contains_lessthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] < val) { return true; }
    }
    return false;
}
function _contains_greaterthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] > val) { return true; }
    }
    return false;
}
function _contains_lessthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] <= val) { return true; }
    }
    return false;
}
function _contains_greaterthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] >= val) { return true; }
    }
    return false;
}
function _contains_mod (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] % val[0] == val[1]) { return true; }
    }
    return false;
}
function _contains_type (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i].constructor == val) { return true; }
    }
    return false;
}

function _create_func(args) {
    var _qnp = __queryNestedProperty,
        _clt = _contains_lessthan,
        _clte = _contains_lessthanequal,
        _cgt = _contains_greaterthan,
        _cgte = _contains_greaterthanequal,
        _ct = _contains_type,
        _cm = _contains_mod,
        ifblock = args.ifblock || "true",
        _refs = args._refs || [];

    var func, arr = args.arr, limit = args.limit;
    if (!args.ifblock) {
        func = function (record, the_current_index,farr) {
            for (var prop in condition) {
                if (~prop.indexOf('.')) {
                    if (!_contains(_qnp(record, prop), condition[prop])) {
                        return false;
                    }
                } else if (record[prop] && record[prop] !== condition[prop] || _isNull(record[prop])) {
                    return false;
                }
            }
            return true;
        };
    } else {
        var varStrings = "";
        if (_refs.length) {
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
        }
        eval(varStrings + "func = function (record,the_current_index,farr) {var values;" +
            "return " + ifblock + ";}");
    }
    return arr.filter(func);
}
function _where_function (options) {
    var obj = [], condition = function(){};
    obj = options.obj; condition = options.condition;
    var limit = 0,
        jlen = obj.length,
        rarr = [], ai = 0;

    limit = options.limit || jlen;
    for (var j = 0; j < jlen && rarr.length < limit; j++) {
        var v = obj[j];
        if (condition.call(v,v)) {
            rarr.push(v);
        }
    }

    return rarr;
}
function where (obj, condition, projection, limit_arg){
    if (!obj) { return []; }
    var limit = limit_arg;

    // if no condition was given, return all
    if (!condition) { return obj.slice(0,limit); }
    if (limit === 0) { return []; }
    limit = limit || 0;

    if (_isFunction(condition) && !projection) {
        return _where_function({obj:obj,condition:condition,limit:limit});
    }
    // check if there is query MongoDB syntax
    var simple = !projection;
    if (simple) {
        $c.tryEval(condition, function(cond){
            return JSON.stringify(condition, function (key, val) {
                if (key[0] == "$") {
                    simple = false;
                    throw '';
                }
                return val;
            })
        });
    }

    // determine if indexes can be utilized
    var indexProps = [], ipi = 0, qcount = 0;
    if (obj.__indexes) {
        for (var prop in condition) {
            if (condition.hasOwnProperty(prop)) {
                qcount++;
                if (obj.__indexes[prop]) {
                    indexProps[ipi++] = prop;
                }
            }
        }
    }
    var arr = obj, ipHasLength = !!indexProps.length;
    if (ipHasLength) {
        var prop, i = 0;

        var orderedLists = [], fi = 0, len = arr.length, oli = 0;
        while (prop = indexProps[i++]) {
            var ordered = _binarySearch(arr.__indexes[prop], {
                prop: prop,
                condition: condition[prop],
                start_index: null,
                end_index: null,
                find_index: null
            });

            if (len > ordered.length) {
                len = ordered.length;
                fi = i - 1;
            }
            orderedLists[oli++] = ordered;
        }
        if (orderedLists.length == 1) {
            arr = orderedLists[fi];
        } else if (len < 1000) {
            var farr = orderedLists[fi], ai = 0;
            arr = [];
            for (var i = 0; i < len; i++) {
                var addit = true;
                for (var j = 0, jlen = orderedLists.length; j < jlen; j++) {
                    if (fi == j) { continue; }
                    if (!~orderedLists[j].indexOf(farr[i])) {
                        addit = false;
                        break;
                    }
                }
                addit && (arr[ai++] = farr[i]);
            }
        }
        if (qcount == ipi) {
            return arr;
        }
    }

    if (simple) {
        var boolCond = "", useQueryNested = false;
        for (var prop in condition) {
            if (!condition.hasOwnProperty(prop) || ipHasLength && ~indexProps.indexOf(prop)) { continue; }
            if (~prop.indexOf('.')) { useQueryNested = true; break; }
            var q = _isString(condition[prop]) ? "\"" : "";
            if (_isRegExp(condition[prop])) {
                boolCond += condition[prop] + ".test(record[\"" + prop + "\"]) && ";
            } else if (typeof condition[prop] == "object") {
                boolCond += "_equals(record[\"" + prop + "\"]," + JSON.stringify(condition[prop]) + ") && ";
            } else {
                boolCond += "record[\"" + prop + "\"]==" + q + condition[prop] + q + " && ";
            }
        }
        boolCond = !useQueryNested ? boolCond + "true" : "";
        return _create_func({
            ifblock: boolCond,
            _refs:null,
            arr:arr,
            limit:limit
        });
    }


    var _refs = [],
        ifblock = _subQuery(condition,null,null,_refs);

    return _create_func({
        ifblock:ifblock,
        _refs: _refs,
        arr: arr,
        limit: limit
    });
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./average')($c);
    require('./contains')($c);
    require('./date')($c);
    require('./getValue')($c);
    require('./isSubset')($c);
    require('./parseBoolean')($c);
    require('./removeAt')($c);
    require('./stdev')($c);
    require('./toSet')($c);

    $s = ctx;
    _contains = $s.contains || $c.contains;
    _isArray = $s.isArray || $c.isArray;
    _isNull = $s.isNull || $c.isNull;
    _isFunction = $s.isFunction || $c.isFunction;
    _isObject = $s.isObject || $c.isObject;
    _isString = $s.isString || $c.isString;
    _isRegExp = $s.isRegEpx || $c.isRegExp;
    _isInt = $s.isInt || $c.isInt;

    $c.__queryNestedProperty = ctx.__queryNestedProperty = $c.__queryNestedProperty || ctx.__queryNestedProperty || __queryNestedProperty;
    $c.__parseCond = ctx.__parseCond = $c.__parseCond || ctx.__parseCond || __parseCond;
    $c.__processAccumulator = ctx.__processAccumulator = $c.__processAccumulator || ctx.__processAccumulator || __processAccumulator;
    $c.__processExpression = ctx.__processExpression = $c.__processExpression || ctx.__processExpression || __processExpression;
    $c._binarySearch = ctx._binarySearch = $c._binarySearch || ctx._binarySearch || _binarySearch;
    $c._copyWithProjection = ctx._copyWithProjection = $c._copyWithProjection || ctx._copyWithProjection || _copyWithProjection;
    $c._subQuery = ctx._subQuery = $c._subQuery || ctx._subQuery || _subQuery;
    $c.where = ctx.where = $c.where || ctx.where || where;
}
init.__queryNestedProperty = __queryNestedProperty;
init.__parseCond = __parseCond;
init.__processAccumulator = __processAccumulator;
init.__processExpression = __processExpression;
init._binarySearch = _binarySearch;
init._copyWithProjection = _copyWithProjection;
init._subQuery = _subQuery;
init.where = where;

module.exports = init;
