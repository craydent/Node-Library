import isAsync from '../../compiled/transformedMinor/craydent.isasync';

describe('isAsync', () => {
    it('should check if variable is async', () => {
        expect(isAsync(null)).toBe(false);
        expect(isAsync(undefined)).toBe(false);
        expect(isAsync([])).toBe(false);
        expect(isAsync({})).toBe(false);
        expect(isAsync(10)).toBe(false);
        expect(isAsync('')).toBe(false);
        expect(isAsync(() => { })).toBe(false);
        expect(isAsync(async () => { })).toBe(true);
        expect(isAsync(async function () { })).toBe(true);
        // emulate actual async
        expect(isAsync({ prototype: { constructor: { name: 'async' } } })).toBe(true);
    });
});