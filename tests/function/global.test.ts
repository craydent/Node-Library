import $c from '../../compiled/transformedMajor/function';
import foo from '../../compiled/transformedMinor/craydent.foo'

describe('No Conflict Function', function () {
	function temp(this: any, par1: any, par2: any) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters', function () {
		expect(temp.getParameters()).toEqual(['par1', 'par2']);
	});
	it('getName', function () {
		expect(temp.getName()).toEqual('temp');
	});
	it('extends', function () {
		function cls(this: any) {
			this.p3 = 0;
		}
		cls.extend(temp as any);
		var clz = new (cls as any)();
		//console.log(cls.extends(temp).toString(), (new cls()).p1, cls.prototype);
		expect(clz.p).toEqual(1);
		expect(clz.p2).toEqual(2);
		expect(clz.p3).toEqual(0);
		expect(clz.construct.name).toEqual(foo.name);

	});
	it('on', function () {
		function testEmit() { return $c.emit('listener'); }
		testEmit.on('listener', function () { return 'hello world'; });
		testEmit.on('listener', function () { return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world', 'hello world again']);
	});
	it('then', function () {
		function testNext() { return $c.next(); }
		testNext.then(function () { return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch', function () {
		function testNext() { return $c.next(); }
		testNext.then(function () { throw 'adsf'; });
		testNext.catch(function () { return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});