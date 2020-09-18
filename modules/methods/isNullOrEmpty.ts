import _typeCheck from '../protected/_typeCheck';
import isNull from '../methods/isNull';
import isEmpty from '../methods/isEmpty';

export default function isNullOrEmpty(obj: any): boolean {
    return isNull(obj) || isEmpty(obj);
}