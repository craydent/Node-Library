import readFile from '../../compiled/transformedMinor/craydent.readfile';
jest.mock('fs', () => {
    return {
        "readFile": (...args: any[]) => {
            _readFile.apply(this, args);
        }
    }
});
let _readFile = (...args: any[]) => { args[args.length - 1](); };
describe('readFile', () => {
    beforeEach(() => {
        _readFile = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _readFile = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await readFile('/the/path.js')).toBe(null);
        expect(_readFile).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _readFile = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await readFile('/the/path.js')).toEqual({});
        expect(_readFile).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
