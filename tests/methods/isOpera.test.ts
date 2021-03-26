import isOpera from '../../compiled/transformedMinor/craydent.isopera';
describe('isOpera', () => {
    it('should check if browser is Opera', () => {
        expect(isOpera.call({ navigator: { userAgent: 'chrome apple opera' } } as any)).toBe(true);
        expect(isOpera.call({ navigator: { userAgent: 'chrome apple opr' } } as any)).toBe(true);
        expect(isOpera.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
