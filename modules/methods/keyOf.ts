import error from '../methods/error';
import equals from '../methods/equals';
import isNull from '../methods/isNull';

export default function keyOf<T>(obj: T, value: any): string {
    try {
        if (isNull(obj)) {
            return '';
        }
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                if (equals(obj[prop], value)) { return prop; }
            }
        }
        return '';
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.keyOf', e);
        return '';
    }
}