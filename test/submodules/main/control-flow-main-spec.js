var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-control-flow'); }
else { $c = require('../../../craydent.js'); }
var $m = require('../_methods')(pre);
$c.DEBUG_MODE = true;
$c.ajax = $m.ajax;
$c.syncroit = $m.syncroit;
var matchPropAndConstructor = $m.matchPropAndConstructor;

describe ('Global methods', function () {
    beforeEach(function() {
        this.addMatchers({toMatchPropAndConstructor: matchPropAndConstructor});
    });
    describe("syncroit async test",function(){
        var result = [];
        var userData = {
            users: [{username: 'mtglass', name: 'Mark Glass', age: 10},
                { username: 'urdum', name: 'Ursula Dumfry', age: 10 },
                { username: 'hydere', name: 'Henry Dere', age: 10 },
                { username: 'cumhere', name: 'Cass Umhere', age: 10 },
                { username: 'bstill', name: 'Bob Stillman', age: 10 },
                { username: 'cirfuksalot', name: 'Camron', age: 10 },
                { username: 'chadden', name: 'Corey Hadden', age: 30 },
                { username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
                { username: 'cinada', name: 'Clark Inada', age: 31 },
                { username: 'shurliezalot', name: 'Josh N', age: 10 },
                { username: 'noze_nutin', name: 'Mai Boss', age: 10 },
                { username: 'czass', name: 'Cater Zass', age: 10 },
                {username: 'awesome_game', name: 'clash of clans', age: 21}]
        };
        var promise = function () {
            return $c.ajax('http://craydent.com/test/users.js');
        };
        if ($m.noAsync) {
            promise = function () {
                return new Promise(function(res){
                    setTimeout(function(){ res(userData); },1)
                });
            };
        }
        beforeEach(function (done) {
            $c.syncroit(function *() {
                var resolve = true;

                function testPromise(){
                    return new Promise(function(res,rej){
                        if (resolve) { return res({resolve:resolve}); }
                        return rej({resolve:resolve});
                    });
                }

                result.push(yield testPromise());
                resolve = false;
                result.push(yield testPromise());
                result.push(yield promise());
                done();

            });
        });
        it('syncroit',function(){
            var shouldbe = [
                {resolve: true},
                {resolve: false},
                userData
            ];
            for (var i = 0, len = result.length; i < len; i++) {
                expect(result[i]).toEqual(shouldbe[i]);
            }
        });
        it('yieldable',function(){
            $c.syncroit(function *() {
                function delay(callback){
                    setTimeout(function() { callback("done") },10);
                }
                expect(yield $c.yieldable(delay)()).toBe("done");
            });
        });

    });

});