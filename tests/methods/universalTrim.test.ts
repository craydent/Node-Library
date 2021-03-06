import universalTrim from '../../compiled/transformedMinor/craydent.universaltrim';
describe('universalTrim', () => {
    it('should do a trim', () => {
        expect(universalTrim(null as any)).toBe('');
        expect(universalTrim('   aaa   ')).toBe('aaa');
        expect(universalTrim(['   aaa   ', ' bbb '])).toEqual(['aaa', 'bbb']);
    })
    it('should do a trim with options', () => {
        expect(universalTrim(null as any, ['c', ' '])).toBe('');
        expect(universalTrim('c   aaa   c', ['c', ' '])).toBe('aaa');
        let arr = ['c   aaa   c', ' bbb '];
        expect(universalTrim(arr, ['c', ' '], true)).toEqual(['aaa', 'bbb']);
        expect(arr).toEqual(['aaa', 'bbb']);
    })
});
