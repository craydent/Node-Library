import error from '../methods/error';
import _average from '../methods/average';
import isNumber from '../methods/isNumber';

const _isNumber = isNumber;

export default function stdev(arr: number[]): number {
    try {
        if (!arr || !arr.length) { return 0; }
        let avg = _average(arr),
            sum = null, sdlen = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (!_isNumber(arr[i])) { continue; }
            sdlen++;
            sum = sum || 0;
            let diff = arr[i] - avg;
            sum += diff * diff;
        }
        return Math.sqrt(sum / sdlen);
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.stdev", e);
        return NaN;
    }
}
