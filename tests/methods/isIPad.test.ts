import isIPad from '../../compiled/transformedMinor/craydent.isipad';
describe('isIPad', () => {
    it('should check if device is an iPad', () => {
        expect(isIPad.call({ navigator: { userAgent: 'iPad' } } as any)).toBe(true);
        expect(isIPad.call({ navigator: { userAgent: 'iPhone OS 3_1_2' } } as any)).toBe(true);
        expect(isIPad.call({ navigator: { userAgent: 'IOS' } } as any)).toBe(false);
    });
});
