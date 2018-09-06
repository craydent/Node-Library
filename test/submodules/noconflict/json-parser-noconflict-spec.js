var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-json-parser/noConflict.js'); }
else { $c = require('../../../noConflict.js'); }
$c.DEBUG_MODE = true;
describe ('No Conflict Global methods', function () {
	beforeEach(function() {
        this.addMatchers({toMatchPropAndConstructor: matchPropAndConstructor});
    });
    it('JSON.parseAdvanced',function(){
        expect($c.parseAdvanced({"routes": {"${domain}":"${bb}"}},null,{domain:"property",bb:"baby"})).toEqual({ routes: { property: 'baby' } });
        expect(JSON.stringify($c.parseAdvanced({"routes": {"Function.${bb.b}":"function(${domain}){}","${domain}":"${bb.b}"}},null,{domain:"property",bb:{b:"baby"}}))).toEqual(JSON.stringify({ routes: { baby: function(property){}, property: "baby" } }));
        // expect($c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"/test/test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});
        expect($c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"./test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});
        expect($c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});

    });

});