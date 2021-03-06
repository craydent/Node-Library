import toStringAlt from '../../compiled/transformedMinor/craydent.tostringalt';
describe('toStringAlt', () => {
    it('should convert the object to a string', () => {
        expect(toStringAlt({ a: {}, b: 2 })).toEqual('&a={}&b=2');
        expect(toStringAlt({ a: {}, b: 2 }, null as any, null as any, true)).toEqual('&a=%7B%7D&b=2');
    })
});
