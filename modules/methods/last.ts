import error from '../methods/error';
import isNull from '../methods/isNull';

export default function last<T>(arr: T[]): T {
    try {
        if (isNull(arr) || !arr.length) {
            return null;
        }
        return arr[arr.length - 1];
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.last', e);
        return null;
    }
}