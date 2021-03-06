import mkdir from '../../compiled/transformedMinor/craydent.mkdir';
jest.mock('fs', () => {
    return {
        "mkdir": (...args: any[]) => {
            _mkdir.apply(this, args);
        }
    }
});
let _mkdir = (...args: any[]) => { args[args.length - 1](); };
describe('mkdir', () => {
    beforeEach(() => {
        _mkdir = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _mkdir = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await mkdir('/the/path.js')).toBe(null);
        expect(_mkdir).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _mkdir = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await mkdir('/the/path.js', 1)).toEqual({});
        expect(_mkdir).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function));
    })
});
