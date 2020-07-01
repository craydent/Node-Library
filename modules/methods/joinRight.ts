import { _joinHelper } from "./where";
import error from './error';

export default function joinLeft<T, R, TResult>(orig: T[], arr: R[], on: string): TResult[] {
    try {
        return _joinHelper(arr, orig, on);
    } catch (e) {
        error && error('Array.joinRight', e);
        return [];
    }
}