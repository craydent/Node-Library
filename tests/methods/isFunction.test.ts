import isFunction from '../../compiled/transformedMinor/craydent.isfunction';
jest.mock('../../compiled/transformedMinor/craydent.isfunction/protected/_typeCheck', () => {
    return {
        "default": (...args: any[]) => _typeCheck.apply(this, args as any)
    }
});
let _typeCheck = () => { }
describe('isFunction', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Function', () => {
        _typeCheck = jest.fn(() => true);
        expect(isFunction(() => { })).toBe(true);
        expect(_typeCheck).toHaveBeenCalledWith(expect.any(Function), Function);
        expect(isFunction(async () => { })).toBe(false);
    });
});