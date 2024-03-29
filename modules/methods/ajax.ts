import * as IHTTP from 'http';
import error from '../methods/error';
import foo from '../methods/foo';
import IEVersion from '../methods/ieversion';
import isArray from '../methods/isarray';
import isBetween from '../methods/isbetween';
import isObject from '../methods/isobject';
import isString from '../methods/isstring';
import logit from '../methods/logit';
import merge from '../methods/merge';
import toStringAlt from '../methods/tostringalt';
import runFuncArray from '../methods/runfuncarray';
import tryEval from '../methods/tryeval';
import isNull from '../methods/isnull';
import Request from '../methods/Request';
import { AnyObject } from '../models/Generics';
import { Reviver } from '../models/Reviver';
import getProperty from '../methods/getproperty';
import rand from '../methods/rand';
import include from '../methods/include';


function _get<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _get<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _get<T>(this: any, params: any, returnData?: any): Promise<T> {
    params.method = "GET";
    return ajax.apply(this, arguments as any) as Promise<T>;
}
function _delete<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _delete<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _delete<T>(this: any, params: any, returnData?: any): Promise<T> {
    params.method = "DELETE";
    return ajax.apply(this, arguments as any) as Promise<T>;
};
function _post<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _post<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _post<T>(this: any, params: any, returnData?: any): Promise<T> {
    params.method = "POST";
    return ajax.apply(this, arguments as any) as Promise<T>;
};
function _put<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _put<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _put<T>(this: any, params: any, returnData?: any): Promise<T> {
    params.method = "PUT";
    return ajax.apply(this, arguments as any) as Promise<T>;
};
function _ajaxNode<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _ajaxNode<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _ajaxNode<T>(this: any, params: any, returnData: any): Promise<T> {
    try {
        params.protocol = params.protocol || (~params.url.indexOf('https:') ? 'https:' : 'http:')

        // if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
        //     alwaysResolve = params.alwaysResolve || false;
        // }

        let httpRequest: typeof IHTTP = include('http');
        if (params.protocol == 'https:') { httpRequest = include('https'); }

        runFuncArray.call(params.context, params.onbefore, [httpRequest, params.hitch, this]);

        let prms: Promise<any>, defaults = {
            protocol: 'http:',
            host: 'localhost',
            family: '',
            port: 80,
            localAddress: '',
            socketPath: '',
            method: "GET",
            path: '/',
            headers: '',
            auth: '',
            agent: '',
            createConnection: ''
        }/*, options = {
        protocol: params.protocol || 'http',
        host: params.host || params.hostname || 'localhost',
        family: params.family,
        port: params.port || 80,
        localAddress: params.localAddress,
        socketPath: params.socketPath,
        method: params.method || "GET",
        path: params.path || '/',
        headers: params.headers,
        auth: params.auth,
        agent: params.agent,
        createConnection: params.createConnection
        }*/;
        params.headers['Content-Type'] = params.headers['Content-Type'] || params.contentType;
        prms = new Promise(function (resolve, reject) {
            /* istanbul ignore next */
            let resrej = params.alwaysResolve ? resolve : reject;
            if (params.url) {
                let parts = params.url.match(/^(https?:)\/\/(.*?)(?::([0-9]*)?)?(\/.*)?$/);
                /* istanbul ignore next */
                if (parts) {
                    params.protocol = (params.protocol || parts[1]);
                    params.host = params.host || parts[2];
                    let port = params.port || parts[3];
                    port && (params.port = port);
                    params.path = params.path || parts[4];
                }
            }
            try {
                let req = httpRequest.request(merge(defaults, params, { clone: true, intersect: true }), function (res) {
                    let body = { data: "" },
                        /* istanbul ignore next */
                        ctx = params.context || res;
                    res.on('data', function (chunk) {
                        body.data += chunk;
                        runFuncArray.call(ctx, params.ondata, [chunk, { ...body }, req, params.hitch, res]);
                    });
                    res.on('error', function (err) {
                        /* istanbul ignore else */
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = tryEval(body.data, params.json_parser) || body.data;
                        }
                        body.data = body.data || err as any;
                        runFuncArray.call(ctx, params.onerror, [body.data, params.hitch, res, res.statusCode]);
                        runFuncArray.call(ctx, params.oncomplete, [body.data, params.hitch, res, res.statusCode]);
                        resrej(body.data);
                    });
                    res.on('end', function () {
                        /* istanbul ignore else */
                        if (params.dataType.toLowerCase() == 'json') {
                            /* istanbul ignore next */
                            body.data = tryEval(body.data, params.json_parser) || body.data;
                        }
                        let methods = params.onsuccess;
                        if (!isBetween(res.statusCode, 200, 299, true)) {
                            methods = params.onerror;
                        }
                        runFuncArray.call(ctx, methods, [body.data, params.hitch, res, res.statusCode]);
                        runFuncArray.call(ctx, params.oncomplete, [body.data, params.hitch, res, res.statusCode]);

                        let rtn = body.data;
                        if (returnData == "response" || returnData == "res") {
                            rtn = res as any;
                        } else if (returnData == "request" || returnData == "req") {
                            rtn = req as any;
                        }

                        resolve(rtn);
                    });
                });
                req.on('error', function (e) {
                    if ((e as any).code != "ETIMEDOUT") {
                        runFuncArray.call(params.context, params.onerror, [null, params.hitch, req, (e as any).code]);
                        runFuncArray.call(params.context, params.oncomplete, [null, params.hitch, req, (e as any).code]);
                        return resrej(e);
                    }
                    logit(e);
                });

                req.setTimeout(params.timeout, function () {
                    runFuncArray.call(params.context, params.onerror, ['', params.hitch, req, 504]);
                    runFuncArray.call(params.context, params.oncomplete, ['', params.hitch, req, 504]);
                    let e: any = new Error(`connect ETIMEDOUT ${params.host}`);
                    e.address = params.host;
                    e.code = "ETIMEDOUT";
                    e.errno = "ETIMEDOUT";
                    e.message = `connect ETIMEDOUT ${params.host}`;
                    e.port = params.port;
                    resrej(e);
                });
                /* istanbul ignore next */
                let req_body = (isObject(params.data) || isArray(params.data)) && ~params.contentType.indexOf("/json") ? JSON.stringify(params.data) : params.data;
                req.write(req_body || '');
                req.end();
            } catch (e)/* istanbul ignore next */ {
                error && error("ajax.Promise", e);
            }
        });

        (prms as any)._then = prms.then;
        prms.then = function (this: any, res, rej) {
            if (__isTSTranspiledPromise.call(this, arguments)) {
                return this._then(res, rej);
            }
            params.onsuccess.push(res);
            params.onerror.push(rej);
            return this;
        };
        // }
        (prms as any).otherwise = (prms as any).catch = function (callback: any) {
            return params.onerror.push(callback), this;
        };
        prms.finally = function (callback: any) {
            return params.oncomplete.push(callback), this;
        };
        return prms;
    } catch (e) /* istanbul ignore next */ {
        error && error("ajax", e);
        return Promise.resolve() as Promise<any>;
    }
}

function _ajaxJS<T>(this: any, url: string, returnData?: AjaxReturnType): Promise<T>;
function _ajaxJS<T>(this: any, params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function _ajaxJS<T>(this: any, params: any, returnData: any): Promise<T> {
    try {
        let url, alwaysResolve = params.alwaysResolve;
        params.jsonp = `${(params.jsonp || "callback")}=`;

        let cbk = (function (this: any, res: any, rej: any) {
            /* istanbul ignore next */
            let resrej = alwaysResolve ? res : rej;
            if (params.dataType.toLowerCase() == 'jsonp') {
                let head = document.getElementsByTagName('head')[0],
                    func: string = params.jsonpCallback || '_cjson' + Math.floor(rand(0, 1000000)),
                    tag = document.createElement('script');
                while (!params.jsonpCallback && (window as any)[func]) {
                    func = `_cjson${Math.floor(rand(0, 1000000))}`;
                }
                // params.jsonpCallback && (params.onsuccess = window[func]);
                (window as any)[func] = function (data: any) {
                    /* istanbul ignore next */
                    let ctx = params.context || params.thiss;

                    let code;
                    let resrej = res;
                    if (!isNull(data.hasErrors) || data.hasErrors || !data.success) {
                        runFuncArray.call(ctx, params.onerror, [data, params.hitch, tag, tag, (code = data.code || 500)]);
                    } else {
                        runFuncArray.call(ctx, params.onsuccess, [data, params.hitch, tag, tag, (code = data.code || 200)]);
                    }

                    runFuncArray.call(ctx, params.oncomplete, [data, params.hitch, tag, tag, code]);
                    // if (params.jsonpCallback) {
                    //     window[func] = params.onsuccess;
                    // } else {
                    try {
                        delete (window as any)[func]
                    } catch (e) /* istanbul ignore next */ {
                        (window as any)[func] = undefined;
                    }
                    // }

                    let rtn = data;
                    if (returnData == "response" || returnData == "res" || returnData == "request" || returnData == "req") {
                        rtn = tag;
                    }
                    resrej(rtn);

                };

                url = params.url;
                /* istanbul ignore next */
                url += (~params.url.indexOf('?') ? "&" : "?") + (params.jsonp || "callback=") + func;

                tag['type'] = "text/javascript";
                (tag as any).async = "async";
                tag['src'] = url;

                // Attach handlers for all browsers
                tag.onload = (tag as any).onreadystatechange = function () {
                    try {
                        /* istanbul ignore next */
                        const ctx = params.context || this;
                        runFuncArray.call(ctx, params.ondata, [this.readyState, {}, tag, params.hitch, this]);
                        /* istanbul ignore else */
                        if (!this.readyState || /complete|loaded/.test(this.readyState.toString())) {
                            // Handle memory leak in IE
                            this.onload = this.onreadystatechange = null;

                            // Remove the script
                            if (head && this.parentNode && !~IEVersion.call(window)) {
                                head.removeChild(this);
                            }
                        }
                    } catch (e) {
                        /* istanbul ignore next */
                        error && error('ajax.tag.statechange', e);
                    }
                };
                runFuncArray.call(params.context, params.onbefore, [tag, params.hitch, this]);
                head['insertBefore'](tag, head.firstChild);
                return tag;
            } else {
                let httpRequest = Request(),
                    fileUpload = httpRequest.upload || {};

                fileUpload.onload = params.onfileload || foo;
                fileUpload.onprogress = params.onprogress || foo;
                fileUpload.onabort = params.onabort || foo;
                /* istanbul ignore next */
                fileUpload.onerror = params.onerror || foo;
                fileUpload.onloadstart = params.onloadstart || foo;

                runFuncArray.call(params.context, params.onbefore, [httpRequest, params.hitch, this]);
                let body = { data: '' }
                httpRequest.onreadystatechange = function (xp: any) {
                    /* istanbul ignore next */
                    const ctx = params.context || this;
                    /* istanbul ignore next */
                    body.data += this.responseText || '';
                    runFuncArray.call(ctx, params.ondata, [this.responseText, { ...body }, this, params.hitch, xp]);
                    let data = __ajaxServerResponse(this, params.json_parser),
                        done = this.readyState == 4;

                    /* istanbul ignore else */
                    if (isBetween(this.status, 200, 299, true)
                        &&/* istanbul ignore next */(data && params.dataType.toLowerCase() == 'json' || done && body.data)) {
                        /* istanbul ignore next */
                        let obj = data || body.data;
                        runFuncArray.call(ctx, params.onsuccess, [obj, params.hitch, this, xp, this.status]);
                    } else if (done) {
                        runFuncArray.call(
                            ctx,
                            params.onerror,
                            [
                                /* istanbul ignore next */
                                tryEval(this.responseText) || this.responseText,
                                params.hitch,
                                this,
                                xp,
                                this.status
                            ]
                        );
                    }
                    /* istanbul ignore else */
                    if (done) {
                        runFuncArray.call(ctx, params.oncomplete, [data, params.hitch, this, xp, this.status]);
                        /* istanbul ignore next */
                        let rtn = data || body.data;
                        if (returnData == "response" || returnData == "res") {
                            rtn = xp;
                        } else if (returnData == "request" || returnData == "req") {
                            rtn = httpRequest;
                        }
                        resrej(rtn);
                    }
                };
                httpRequest.open(params.method, params.url, true);
                httpRequest.setRequestHeader("Content-type", params.contentType);

                if (isObject(params.headers)) {
                    for (let prop in params.headers) {
                        let value = params.headers[prop];
                        httpRequest.setRequestHeader(prop, value);
                    }
                } else {
                    for (let i = 0, len = params.headers.length; i < len; i++) {
                        let header = params.headers[i];
                        httpRequest.setRequestHeader(header.type, header.value);
                    }
                }
                httpRequest.send(params.query);
                return httpRequest;
            }
        }).bind(this);
        let prms: Promise<any> = {} as any;
        if (typeof Promise !== "undefined" && ~Promise.toString().indexOf("[native code]")) {
            prms = new Promise(cbk);
            /* istanbul ignore next */
            (prms as any)._then = prms.then || foo;
            prms.then = function (this: any, res, rej) {
                if (__isTSTranspiledPromise.call(this, arguments)) {
                    return this._then(res, rej);
                }
                params.onsuccess.push(res);
                params.onerror.push(rej);
                return this;
            };
        } else {
            prms = cbk(foo, foo);
            prms.then = function (this: any, callback: any) {
                return params.onsuccess.push(callback), this;
            };
        }

        (prms as any).otherwise = (prms as any).catch = function (this: any, callback: any) {
            return params.onerror.push(callback), this;
        };
        prms['finally'] = function (this: any, callback: any) {
            return params.oncomplete.push(callback), this;
        };
        return prms;
    } catch (e) /* istanbul ignore next */ {
        error && error("ajax", e);
        return Promise.resolve() as Promise<any>;
    }
}
function __isTSTranspiledPromise(this: any, args: any): boolean {
    // will need to update if the name changes
    const caller: any = getProperty(args, 'callee.caller');
    if (!caller) {
        try {
            const stack = (new Error()).stack || '';
            return !!~stack.split('\n')[3].trim().indexOf('at step') && args[0].name == 'fulfilled' && args[1].name == 'rejected';
        } catch (e) {
            error && error("ajax.__isTSTranspiledPromise", e);
            return false;
        }
    }
    const arg: any = isNull(getProperty(args, 'callee.caller.arguments[0]'), {});
    return caller && /step/.test(caller.name) && arg.value == this && arg.hasOwnProperty('done');
}
export type AjaxReturnType = "response" | "res" | "request" | "req";
export type AjaxOptions = {
    url?: string;
    alwaysResolve?: boolean;
    dataType?: string;
    hitch?: any;
    query?: AnyObject | string;
    data?: any | string;
    timeout?: number;
    context?: any;
    headers?: AnyObject;
    method?: string;
    contentType?: string;
    run?: string;
    protocol?: string;
    host?: string;
    hostname?: string;
    family?: string;
    port?: number;
    localAddress?: string;
    socketPath?: string;
    path?: string;
    auth?: string;
    agent?: string;
    createConnection?: string;

    onstatechange?: () => void;
    onfileload?: () => void;
    onprogress?: () => void;
    onabort?: () => void;
    onresponse?: () => void;
    onloadstart?: () => void;
    onbefore?: (request?: IHTTP.IncomingMessage, hitch?: any, context?: any) => void;
    oncomplete?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    ondata?: (chunk?: string, body?: string, request?: IHTTP.IncomingMessage, hitch?: any, context?: any) => void;
    onerror?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    onsuccess?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    json_parser?: (text?: string, reviver?: Reviver, spaces?: string) => void;
};
export function __ajaxServerResponse(response: any, json_parser?: any) {
    try {
        if (response.readyState == 4) {
            let objResponse = tryEval(response.responseText.trim(), json_parser);
            if (!objResponse || objResponse.hasErrors) {
                return false;
            }
            return objResponse;
        }
        return false;
    } catch (e) /* istanbul ignore next */ {
        error && error("ajax._ajaxServerResponse", e);
        return false;
    }
}
function ajax<T>(url: string, returnData?: AjaxReturnType): Promise<T>;
function ajax<T>(params: AjaxOptions, returnData?: AjaxReturnType): Promise<T>;
function ajax<T>(this: any, params: any, returnData?: any): Promise<T> {
    /*|{
        "info": "Method to make ajax calls",
        "category": "Utility",
        "parameters":[
            {"url": "(String) End point url"},
            {"returnData?": "(AjaxReturnType) Specifies which data to return when using Promise pattern"}],

        "overloads":[
            {"parameters":[
                {"params": "(AjaxOptions) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"},
                {"returnData?": "(AjaxReturnType) Specifies which data to return when using Promise pattern"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#ajax",
        "returnType": "(Promise<any>)"
    }|*/
    if (isString(params)) {
        params = { url: params };
    } else {
        params = { ...params }
    }
    /* istanbul ignore next */
    params.alwaysResolve = params.alwaysResolve === false ? false : true;
    params.thiss = this;
    params.url = params.url || "";
    params.context = params.context || this;
    params.dataType = params.dataType || 'json';
    params.hitch = params.hitch || "";
    params.query = params.data || params.query || "";
    params.timeout = params.timeout || 120000;
    params.onbefore = params.onbefore || [foo];
    params.oncomplete = params.oncomplete || [foo];
    params.ondata = params.ondata || params.onstatechange || [foo];
    params.onresponse = params.onresponse || [foo]
    params.onerror = params.onerror || params.onresponse;
    params.onsuccess = params.onsuccess || params.onresponse;
    params.json_parser = params.json_parser || JSON.parse;

    if (!isArray(params.onbefore)) {
        params.onbefore = [params.onbefore];
    }
    if (!isArray(params.oncomplete)) {
        params.oncomplete = [params.oncomplete];
    }
    if (!isArray(params.ondata)) {
        params.ondata = [params.ondata];
    }
    if (!isArray(params.onerror)) {
        params.onerror = [params.onerror];
    }
    if (!isArray(params.onresponse)) {
        params.onresponse = [params.onresponse];
    }
    if (!isArray(params.onsuccess)) {
        params.onsuccess = [params.onsuccess];
    }

    // if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
    //     alwaysResolve = params.alwaysResolve || false;
    // }
    params.method = params.method || "GET";
    params.headers = params.headers || {};

    if (params.query && isObject(params.query)) {
        params.query = toStringAlt(params.query, '=', '&', true);
    }
    params.query = (params.run ? `run=${params.run}` : "") + (params.query || "");
    params.contentType = params.contentType || "application/json";
    params.onstatechange = params.onstatechange || foo;

    if (params.method.toLowerCase() == "get") {
        params.data = params.query;
        params.url += params.query ? `?${params.query}` : "";
        params.query = undefined;
    }
    params.data = params.data || params.query;
    if (typeof window != 'undefined') {
        return _ajaxJS.call(this, params, returnData) as Promise<T>;
    }
    return _ajaxNode.call(<T>this, params, returnData) as Promise<T>;
}

ajax['get'] = _get;
ajax['delete'] = _delete;
ajax['post'] = _post;
ajax['put'] = _put;
declare namespace ajax {
    // @ts-ignoresaa
    export { _get as get };
    // @ts-ignore
    export { _post as post };
    // @ts-ignore
    export { _put as put };
    // @ts-ignore
    export { _delete as delete };
}
export default ajax;