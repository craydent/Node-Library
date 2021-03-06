import insert from '../../compiled/transformedMinor/craydent.insert';
jest.mock('../../compiled/transformedMinor/craydent.add', () => {
    return {
        "default": (...args: any[]) => add.apply(this, args as any)
    }
});
let add = () => { }
describe('insert', () => {
    beforeEach(() => {
        add = () => { }
    });
    it('should insert value to the array', () => {
        add = jest.fn();
        expect(insert([], 'ab')).toBe(true);
        expect(add).toHaveBeenCalledWith([], 'ab')
    });
    it('should insert an array of values to the array', () => {
        add = jest.fn();
        expect(insert([], ['ab'])).toBe(true);
        expect(add).toHaveBeenCalledWith([], 'ab')
    });
});