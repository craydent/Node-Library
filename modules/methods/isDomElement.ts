import isNull from '../methods/isNull';

export default function isDomElement(obj: any): boolean {
    if (isNull(obj)) { return false; }
    return obj.nodeType === 1;
}