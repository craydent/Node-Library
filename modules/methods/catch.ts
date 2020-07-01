import error from './error';
import on from './on';

export default function (func: Function, callback: Function) {
    /*|{
        "info": "Function listener to register the catch event",
        "category": "Function",
        "parameters":[
            {"func":"(Function) Function to add listener"},
            {"callback":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.catch",
        "returnType": "(Function)"
    }|*/
    try {
        return on(func, 'catch', callback);
    } catch (e) {
        error && error("Function.catch", e);
    }
}