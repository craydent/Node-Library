var pre = require('../_prep');
var $c = require(pre + 'craydent-xml-to-json/noConflict.js');
var $m = require('../_methods')(pre);
$c.DEBUG_MODE = true;
var matchPropAndConstructor = $m.matchPropAndConstructor;
describe ('No Conflict Global methods', function () {
	beforeEach(function() {
        this.addMatchers({ toMatchPropAndConstructor: matchPropAndConstructor });
    });
    it('xmlToJson',function(){
        var fs = require('fs');
        var data = fs.readFileSync('./test/test.xml');
        expect($c.xmlToJson(data.toString())).toEqual({
            employees : {
                employee : [{
                    '#text' : '22222adsfa1111',
                    id : '1',
                    firstName : 'aadsf',
                    lastName : 'DiCaprio',
                    photo : 'http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg',
                    '@attributes' : { att2 : 'eeeewwww' }
                },{
                    id : '2',
                    firstName : 'Johnny',
                    lastName : 'Depp',
                    photo : 'http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg'
                },{
                    id : '3',
                    firstName : 'Hritik',
                    lastName : 'Roshan',
                    photo : 'http://thewallmachine.com/files/1411921557.jpg'
                }],
                '#text' : '',
                '@attributes' : { att1 : 'wwww' }
            }
        });
    });

});
