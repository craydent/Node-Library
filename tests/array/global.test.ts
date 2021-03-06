import $c from '../../compiled/transformedMajor/array/global';
import isNull from '../../compiled/transformedMinor/craydent.isnull';
import duplicate from '../../compiled/transformedMinor/craydent.duplicate';
import ajax from '../../compiled/transformedMinor/craydent.ajax';
import indexOfAlt from '../../compiled/transformedMinor/craydent.indexofalt';
$c;
describe('Array', function () {
    var arrObjs = [
        { id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }],
        arrObjsScramble = [
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, p: "30", share: "shared", index: 30, std: 4 },
            { id: 5, p: "30", share: "shared", index: 30, std: 4 },
            { id: 6, p: "30", share: "shared", index: 30, std: 4 },
            { id: 7, p: "30", share: "shared", index: 30, std: 4 },
            { id: 8, p: "30", share: "shared", index: 30, std: 4 },
            { id: 9, p: "30", share: "shared", index: 30, std: 4 },
            { id: 10, p: "30", share: "shared", index: 30, std: 4 },
            { id: 11, std: 4 },
            { id: 12, std: 4 },
            { id: 13, std: 4 },
            { id: 14, std: 4 },
            { id: 15, std: 4 },
            { id: 16, std: 4 },
            { id: 17, std: 4 },
            { id: 18, std: 4 },
            { id: 19, std: 4 },
            { id: 20, std: 4 },
            { id: 21, std: 4 },
            { id: 22, std: 4 },
            { id: 23, std: 4 },
            { id: 24, std: 4 },
            { id: 25, std: 4 }],
        arrStrings = ["string 1", "string 2", "string 3", "string 4"],
        arrMix = [1, {}, "adsf", 10],
        arrSort = [{ id: 1, s: 5 }, { id: 2, s: 5 }, { id: 3, s: 6 }, { id: 4, s: 3 }, { id: 5, s: 2 }],
        arrLookup = [{ "_id": 1, "item": "abc", "price": 12, "quantity": 2 }, { "_id": 2, "item": "jkl", "price": 20, "quantity": 1 }, { "_id": 3 }],
        arrLookupJoiner = [{ "_id": 1, "sku": "abc", description: "product 1", "instock": 120 },
        { "_id": 2, "sku": "def", description: "product 2", "instock": 80 },
        { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 },
        { "_id": 4, "sku": "jkl", description: "product 4", "instock": 70 },
        { "_id": 5, "sku": null as any, description: "Incomplete" },
        { "_id": 6 }],
        arrGroup = [
            { "_id": 1, item: { "sku": "111" }, name: "p1", status: "ordered", "instock": 10, sizes: ["S", "M"], dept: "A" },
            { "_id": 2, item: { "sku": "222" }, name: "p2", status: "ordered", "instock": 80, sizes: ["M", "L"], dept: "A" },
            { "_id": 3, item: { "sku": "111" }, name: "p1", status: "ordered", "instock": 60, sizes: "S", dept: "B" },
            { "_id": 4, item: { "sku": "333" }, name: "p3", status: "ordered", "instock": 70, sizes: ["S"], dept: "A" },
            { "_id": 5, item: { "sku": "111" }, name: "p1", status: "incomplete" },
            { "_id": 6 }],
        arrTree = [
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, share: "shared", odd: false },
            { id: 5, share: "shared1", odd: true }
        ];
    it('aggregate - $project', function () {
        // $project
        expect(duplicate(arrObjs, true).aggregate([{ $project: { p: 1, index: 1, b: 10 } }])).toEqual([
            { p: "10", index: 10, b: 10 },
            { p: "20", index: 20, b: 10 },
            { p: "30", index: 30, b: 10 },
            { b: 10 }]);
        expect(duplicate(arrObjs, true).aggregate([{ $project: { p: 1, index: 1, b: { $multiply: ['$index', 10] } } }])).toEqual([
            { p: "10", index: 10, b: 100 },
            { p: "20", index: 20, b: 200 },
            { p: "30", index: 30, b: 300 },
            { b: 0 }]);
        expect(duplicate(arrObjs, true).aggregate([{ $project: { p: 1, index: 1 } }])).toEqual([
            { p: "10", index: 10 },
            { p: "20", index: 20 },
            { p: "30", index: 30 },
            {}]);
    });
    it('aggregate - $match', function () {
        // $match
        expect(duplicate(arrObjs, true).aggregate([{ $match: { p: "10" } }])).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 }
        ]);
    });
    it('aggregate - $redact', function () {
        // $redact
        expect([{
            _id: 1,
            title: "123 Department Report",
            tags: ["G", "STLW"],
            year: 2014,
            subsections: [
                {
                    subtitle: "Section 1: Overview",
                    tags: ["SI", "G"],
                    content: "Section 1: This is the content of section 1."
                },
                {
                    subtitle: "Section 2: Analysis",
                    tags: ["STLW"],
                    content: "Section 2: This is the content of section 2."
                },
                {
                    subtitle: "Section 3: Budgeting",
                    tags: ["TK"],
                    content: {
                        text: "Section 3: This is the content of section3.",
                        tags: ["HCS"]
                    }
                }]
        }].aggregate([{
            $redact: {
                $cond: {
                    if: { $gt: [{ $size: { $setIntersection: ["$tags", ["STLW", "G"]] } }, 0] },
                    then: "$$KEEP",
                    else: "$$PRUNE"
                }
            }
        }])).toEqual([
            {
                "_id": 1,
                "title": "123 Department Report",
                "tags": ["G", "STLW"],
                "year": 2014,
                "subsections": [
                    {
                        "subtitle": "Section 1: Overview",
                        "tags": ["SI", "G"],
                        "content": "Section 1: This is the content of section 1."
                    },
                    {
                        "subtitle": "Section 2: Analysis",
                        "tags": ["STLW"],
                        "content": "Section 2: This is the content of section 2."
                    },
                    {
                        subtitle: "Section 3: Budgeting",
                        tags: ["TK"],
                        content: {
                            text: "Section 3: This is the content of section3.",
                            tags: ["HCS"]
                        }
                    }
                ]
            }
        ]);
        expect([{
            _id: 1,
            title: "123 Department Report",
            tags: ["G", "STLW"],
            year: 2014,
            subsections: [
                {
                    subtitle: "Section 1: Overview",
                    tags: ["SI", "G"],
                    content: "Section 1: This is the content of section 1."
                },
                {
                    subtitle: "Section 2: Analysis",
                    tags: ["STLW"],
                    content: "Section 2: This is the content of section 2."
                },
                {
                    subtitle: "Section 3: Budgeting",
                    tags: ["TK"],
                    content: {
                        text: "Section 3: This is the content of section3.",
                        tags: ["HCS"]
                    }
                }
            ]
        }].aggregate([{
            $redact: {
                $cond: {
                    if: { $gt: [{ $size: { $setIntersection: ["$tags", ["STLW", "G"]] } }, 0] },
                    then: "$$DESCEND",
                    else: "$$PRUNE"
                }
            }
        }])).toEqual([
            {
                "_id": 1,
                "title": "123 Department Report",
                "tags": ["G", "STLW"],
                "year": 2014,
                "subsections": [
                    {
                        "subtitle": "Section 1: Overview",
                        "tags": ["SI", "G"],
                        "content": "Section 1: This is the content of section 1."
                    },
                    {
                        "subtitle": "Section 2: Analysis",
                        "tags": ["STLW"],
                        "content": "Section 2: This is the content of section 2."
                    }
                ]
            }
        ]);
    });
    it('aggregate - $limit', function () {
        // $limit
        expect(duplicate(arrObjs, true).aggregate([{ $limit: 1 }])).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('aggregate - $skip', function () {
        // $skip
        expect(duplicate(arrObjs, true).aggregate([{ $skip: 3 }])).toEqual([{ id: 4, std: 4 }]);
    });
    it('aggregate - $unwind', function () {
        // $unwind
        expect([{ "_id": 1, "item": "ABC1", sizes: ["S", "M", "L"] }].aggregate([{ $unwind: "$sizes" }])).toEqual([
            { "_id": 1, "item": "ABC1", "sizes": "S" },
            { "_id": 1, "item": "ABC1", "sizes": "M" },
            { "_id": 1, "item": "ABC1", "sizes": "L" }
        ]);
        expect([{ "_id": 1, "item": "ABC1", sizes: ["S", "M", "L"] }, { "_id": 2, "item": "ABC1" }].aggregate([{ $unwind: { path: "$sizes", preserveNullAndEmptyArrays: true } }])).toEqual([
            { "_id": 1, "item": "ABC1", "sizes": "S" },
            { "_id": 1, "item": "ABC1", "sizes": "M" },
            { "_id": 1, "item": "ABC1", "sizes": "L" },
            { "_id": 2, "item": "ABC1" }
        ]);
        expect(
            [{ "_id": 1, "item": "ABC1", sizes: ["S", "M", "L"] }, { "_id": 2, "item": "ABC1" }].aggregate(
                [{ $unwind: { path: "$sizes", preserveNullAndEmptyArrays: true, includeArrayIndex: "ind" } }])).toEqual([
                    { "_id": 1, "item": "ABC1", "sizes": "S", ind: 0 },
                    { "_id": 1, "item": "ABC1", "sizes": "M", ind: 1 },
                    { "_id": 1, "item": "ABC1", "sizes": "L", ind: 2 },
                    { "_id": 2, "item": "ABC1", ind: 0 }
                ]);
    });
    it('aggregate - $group', function () {
        // $group & $sample
        expect(duplicate(arrObjs, true).aggregate([
            { $sample: { size: 4 } },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    averageQuantity: { $avg: "index" },
                    totalPrice: { $sum: { $multiply: ["$id", "$index"] } },
                    f: { $first: "$p" },
                    l: { $last: "$p" },
                    max: { $max: '$index' },
                    min: { $min: '$index' },
                    pushed: { $push: "$share" },
                    theset: { $addToSet: "$share" },
                    stdsamp: { $stdDevSamp: "$std" },
                    stdpop: { $stdDevPop: "$std" }
                }
            }])).toEqual([{ _id: null, totalPrice: 140, averageQuantity: 20, count: 4, f: "10", l: "30", max: 30, min: 10, pushed: ["shared", "shared", "shared"], theset: ["shared"], stdsamp: 0, stdpop: 0 }]);
    });
    it('aggregate - $sample', function () {
        // $sample
        expect(duplicate(arrObjs, true).aggregate([{ $sample: { size: 2 } }]).length).toBe(2);
    });
    it('aggregate - $sort', function () {
        // $sort
        expect(duplicate(arrSort, true).aggregate([{ $sort: { s: -1, id: 1 } }])).toEqual([{ id: 3, s: 6 }, { id: 1, s: 5 }, { id: 2, s: 5 }, { id: 4, s: 3 }, { id: 5, s: 2 }]);
    });
    // $geoNear *****not implemented
    it('aggregate - $lookup', function () {
        // $lookup
        expect(duplicate(arrLookup, true).aggregate([{ $lookup: { from: duplicate(arrLookupJoiner, true), localField: "item", foreignField: "sku", as: "idocs" } }])).toEqual([
            {
                "_id": 1,
                "item": "abc",
                "price": 12,
                "quantity": 2,
                "idocs": [
                    { "_id": 1, "sku": "abc", description: "product 1", "instock": 120 }
                ]
            },
            {
                "_id": 2,
                "item": "jkl",
                "price": 20,
                "quantity": 1,
                "idocs": [
                    { "_id": 4, "sku": "jkl", "description": "product 4", "instock": 70 }
                ]
            },
            {
                "_id": 3,
                "idocs": [
                    { "_id": 5, "sku": null, "description": "Incomplete" },
                    { "_id": 6 }
                ]
            }
        ]);
    });
    it('aggregate - $out', function () {
        // $out
        var arrOut: any[] = [];
        expect(duplicate(arrObjs, true).aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    averageQuantity: { $avg: "index" },
                    totalPrice: { $sum: { $multiply: ["$id", "$index"] } },
                }
            }, { $out: arrOut }])).toBe(arrOut);
        expect(arrOut).toEqual([{ _id: null, totalPrice: 140, averageQuantity: 20, count: 4 }]);

    });
    it('average', function () {
        expect((arrMix as Array<any>).average()).toBe(11 / 2);
    });
    it('buildTree - childFinder:string', function () {
        expect(duplicate(arrTree, true).buildTree(function (item: any) {
            return !item.index;
        }, 'share')).toEqual([{
            id: 4, share: "shared", odd: false, children: [
                { id: 1, p: "10", share: "shared", index: 10, std: 4, children: [] },
                { id: 2, p: "20", share: "shared", index: 20, std: 4, children: [] },
                { id: 3, p: "30", share: "shared", index: 30, std: 4, children: [] }
            ]
        }, { id: 5, share: "shared1", odd: true, children: [] }]);
    });
    it('buildTree - childFinder: string with options', function () {
        expect(duplicate(arrTree, true).buildTree(function (item: any) {
            return !item.index;
        }, 'share', { childProperty: "cc" })).toEqual([{
            id: 4, share: "shared", odd: false, cc: [
                { id: 1, p: "10", share: "shared", index: 10, std: 4, cc: [] },
                { id: 2, p: "20", share: "shared", index: 20, std: 4, cc: [] },
                { id: 3, p: "30", share: "shared", index: 30, std: 4, cc: [] }]
        }, { id: 5, share: "shared1", odd: true, cc: [] }]);
    });
    it('buildTree - childFinder: function', function () {
        expect(duplicate(arrTree, true).buildTree(function (item:any) {
            return !isNull(item.odd);
        }, function (item: any) { return !!(item.id % 2); }, { childProperty: "cc" })).toEqual([
            { id: 4, share: "shared", odd: false, cc: [{ id: 2, p: "20", share: "shared", index: 20, std: 4, cc: [] }] },
            { id: 5, share: "shared1", odd: true, cc: [{ id: 1, p: "10", share: "shared", index: 10, std: 4, cc: [] }, { id: 3, p: "30", share: "shared", index: 30, std: 4, cc: [] }] }
        ]);
    });
    // TO/DO complexSort
    //it('complexSort',function(){
    //
    //});
    it('condense', function () {
        expect(['a', '', 'b', 0, 'c', false, 'd', null, 'e', undefined].condense()).toEqual(['a', 'b', 0, 'c', false, 'd', 'e']);
    });
    it('condense - check values', function () {
        expect(['a', '', 'b', 0, 'c', false, 'd', null, 'e', undefined, 'e', 'a', 'c'].condense(true)).toEqual(['a', 'b', 0, 'c', false, 'd', 'e']);
    });
    it('contains - value', function () {
        expect(['a'].contains('b')).toEqual(false);
        expect(['a'].contains('a')).toEqual(true);
    });
    it('contains - regex', function () {
        expect(['abcd'].contains(/dc/)).toEqual(false);
        expect(['abcd'].contains(/bc/)).toEqual(true);
    });
    it('contains - function', function () {
        expect(['a', 'b'].contains(function (val: any, i: any, arr: any) { return val == "c"; })).toEqual(false);
        expect(['a', 'b'].contains(function (val: any, i: any, arr: any) { return val == "b"; })).toEqual(true);
    });
    it('contains - value and function', function () {
        expect([{ prop: 'a' }].contains('a', function (item: any, value: any) { return (item as any).prop == value; })).toEqual(true);
        expect([{ prop: 'a' }].contains('b', function (item: any, value: any) { return (item as any).prop == value; })).toEqual(false);
    });
    it('contains - value and string', function () {
        var arrInt = [1, 2, 3, 4];
        expect(arrInt.contains(2, '$lt')).toEqual(true);
        expect(arrInt.contains(1, '$lt')).toEqual(false);
        expect(arrInt.contains(1, '$lte')).toEqual(true);
        expect(arrInt.contains(0, '$lte')).toEqual(false);
        expect(arrInt.contains(3, '$gt')).toEqual(true);
        expect(arrInt.contains(4, '$gt')).toEqual(false);
        expect(arrInt.contains(4, '$gte')).toEqual(true);
        expect(arrInt.contains(5, '$gte')).toEqual(false);
        expect(arrInt.contains([4, 0], '$mod')).toEqual(true);
        expect(arrInt.contains([1, 1], '$mod')).toEqual(false);
        expect(arrInt.contains(Number, '$type')).toEqual(true);
        expect(arrInt.contains(String, '$type')).toEqual(false);
    });
    it('contains - array', function () {
        expect([1, 2, 3, 4].contains([1, 5])).toEqual(1);
        expect([1, 2, 3, 4].contains([2, 3])).toEqual(2);
        expect([1, 2, 3, 4].contains([5, 6])).toEqual(false);
    });
    it('count - no args', function () {
        expect(arrObjs.count()).toBe(4);
    });
    it('count - query', function () {
        expect(arrObjs.count({ id: 1 })).toBe(1);
    });
    it('count - string', function () {
        expect(arrStrings.count('1')).toBe(1);
        expect(arrStrings.count('string')).toBe(4);
        expect(arrStrings.count('strings')).toBe(0);
    });
    it('count - regex', function () {
        expect(arrStrings.count(/1/)).toBe(1);
        expect(arrStrings.count(/string/)).toBe(4);
        expect(arrStrings.count(/strings/)).toBe(0);
    });
    it('createIndex - string', function () {
        expect(arrObjs.createIndex("prop, prop2")).toEqual(arrObjs);
    });
    it('createIndex - array', function () {
        expect(arrObjs.createIndex(["prop", "prop2"])).toEqual(arrObjs);
    });
    it('delete', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.delete({ share: "shared" })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
        expect(temp).toEqual([
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);

    });
    it('delete - justOne:false', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.delete({ share: "shared" }, false)).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
        expect(temp).toEqual([{ id: 4, std: 4 }]);
    });
    it('distinct - string', function () {
        var temp: any = duplicate(arrObjs, true);
        expect(temp.distinct("share,std")).toEqual([
            { share: "shared", std: 4 }, { share: undefined, std: 4 }]);
        expect(temp.distinct("share")).toEqual(["shared"]);
        temp = duplicate(arrGroup, true);


        expect(temp.distinct("sizes,dept")).toEqual([
            { sizes: "S", dept: "A" },
            { sizes: "M", dept: "A" },
            { sizes: "L", dept: "A" },
            { sizes: "S", dept: "B" }
        ]);
        expect(temp.distinct("sizes")).toEqual(["S", "M", "L"]);
        expect(temp.distinct("item.sku")).toEqual(["111", "222", "333"]);
    });
    it('distinct - string with query', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.distinct("share,std", { share: { $exists: 1 } })).toEqual([
            { share: "shared", std: 4 }]);
        expect(temp.distinct("share", { share: { $exists: 1 } })).toEqual(["shared"]);
    });
    it('distinct - array', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.distinct(["share", "std"])).toEqual([
            { share: "shared", std: 4 }, { share: undefined, std: 4 }]);
        expect(temp.distinct(["share"])).toEqual(["shared"]);

    });
    it('distinct - string with query', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.distinct(["share", "std"], { share: { $exists: 1 } })).toEqual([
            { share: "shared", std: 4 }]);

        expect(temp.distinct(["share"], { share: { $exists: 1 } })).toEqual(["shared"]);
    });
    it('distinct - string with sql query', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.distinct("share,std", "")).toEqual([
            { share: "shared", std: 4 },
            { share: undefined, std: 4 }
        ]);
        expect(temp.distinct("share", "")).toEqual(["shared"]);
    });
    it('distinct - array with sql query', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.distinct(["share", "std"], "")).toEqual([
            { share: "shared", std: 4 },
            { share: undefined, std: 4 }
        ]);

        expect(temp.distinct(["share"], "")).toEqual(["shared"]);
    });
    it('every', function () {
        var arr = ['a', '', 'b', 0, 'c', false, 'd', null, 'e', undefined];
        expect(arr.every(function (item, i, arr) { return !isNull(item); })).toBe(false);
        expect(arr.condense().every(function (item, i, arr) { return !isNull(item); })).toBe(true);
    });
    it('filter', function () {
        var arr = ['a', '', 'b', 0, 'c', false, 'd', null, 'e', undefined];
        expect(arr.filter(function (item, i, arr) { return item; })).toEqual(['a', 'b', 'c', 'd', 'e']);
    });
    it('group', function () {
        var temp = duplicate(arrGroup);
        expect(temp.group({ key: { 'item.sku': 1, name: 1 }, reduce: function (curr: any, result: any) { }, initial: {}, })).toEqual([
            { item: { sku: '111' }, name: 'p1' },
            { item: { sku: '222' }, name: 'p2' },
            { item: { sku: '333' }, name: 'p3' },
            { item: { sku: null }, name: null }
        ]);

        temp = duplicate(arrGroup);
        expect(temp.group({
            cond: { _id: { $exists: true } },
            key: { 'item.sku': 1, name: 1 },
            reduce: function (curr: any, result: any) { result.total += curr.instock || 0; },
            initial: { total: 0 },
        })).toEqual([
            { item: { sku: '111' }, name: 'p1', total: 70 },
            { item: { sku: '222' }, name: 'p2', total: 80 },
            { item: { sku: '333' }, name: 'p3', total: 70 },
            { item: { sku: null }, name: null, total: 0 }
        ]);

        temp = duplicate(arrGroup);
        expect(temp.group({
            cond: { _id: { $exists: true } },
            key: { 'item.sku': 1, name: 1 },
            reduce: function (curr: any, result: any) { result.total += curr.instock || 0; },
            initial: { total: 0 },
            finalize: function (result: any) { return {} as any; }
        })).toEqual([{}, {}, {}, {}]);

        expect(temp.group({
            cond: { neverTrue: "" },
            key: { 'item.sku': 1, name: 1 },
            reduce: function (curr: any, result: any) { },
            initial: {},
        })).toEqual([]);
    });
    // TO/DO groupBy
    //it('groupBy',function(){
    //
    //});
    it('indexOf', function () {
        expect(arrStrings.indexOf("string 1")).toBe(0);
        expect(arrStrings.indexOf("string 10")).toBe(-1);
    });
    it('indexOfAlt', function () {
        expect(arrObjs.indexOfAlt("20", function (item, value) { return (item as any).p == value })).toBe(1);
        expect(arrObjs.indexOfAlt("201", function (item, value) { return (item as any).p == value })).toBe(-1);
    });
    it('innerJoin - full', function () {
        expect(duplicate(arrLookup, true).innerJoin(duplicate(arrLookupJoiner, true), "_id=_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);
    });
    it('innerJoin - shorthand', function () {
        expect(duplicate(arrLookup, true).innerJoin(duplicate(arrLookupJoiner, true), "_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);
    });
    it('insert - single', function () {
        arrMix = [1, {}, "adsf", 10];
        var temp = duplicate(arrMix, true);
        expect(temp.insert('abcd')).toEqual(true);
        expect(temp).toEqual([1, {}, "adsf", 10, 'abcd']);

    });
    it('insert - multiple', function () {
        var temp = duplicate(arrMix, true);
        expect(temp.insert(['abcd', 99])).toEqual(true);
        expect(temp).toEqual([1, {}, "adsf", 10, 'abcd', 99]);

    });
    it('insertAfter - single', function () {
        arrMix = [1, {}, "adsf", 10];
        var temp = duplicate(arrMix, true);
        expect(temp.insertAfter(1, 'abcd')).toEqual(true);
        expect(temp).toEqual([1, {}, 'abcd', "adsf", 10]);
    });
    it('insertAfter - multiple', function () {
        var temp = duplicate(arrMix, true);
        expect(temp.insertAfter(1, ['abcd', 99])).toEqual(true);
        expect(temp).toEqual([1, {}, ['abcd', 99], "adsf", 10]);
    });
    it('insertBefore - single', function () {
        arrMix = [1, {}, "adsf", 10];
        var temp = duplicate(arrMix, true);
        expect(temp.insertBefore(1, 'abcd')).toEqual(true);
        expect(temp).toEqual([1, 'abcd', {}, "adsf", 10]);
    });
    it('insertBefore - multiple', function () {
        var temp = duplicate(arrMix, true);
        expect(temp.insertBefore(1, ['abcd', 99])).toEqual(true);
        expect(temp).toEqual([1, ['abcd', 99], {}, "adsf", 10]);

    });
    it('isEmpty', function () {
        expect(arrObjs.isEmpty()).toBe(false);
        expect([].isEmpty()).toBe(true);
    });
    it('joinLeft - full', function () {
        expect(duplicate(arrLookup, true).joinLeft(duplicate(arrLookupJoiner, true), "_id=_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);

        expect(duplicate(arrLookupJoiner, true).joinLeft(duplicate(arrLookup, true), "_id=_id")).toEqual([
            { "_id": 1, "sku": "abc", description: "product 1", "instock": 120, "item": "abc", "price": 12, "quantity": 2 },
            { "_id": 2, "sku": "def", description: "product 2", "instock": 80, "item": "jkl", "price": 20, "quantity": 1 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 },
            { "_id": 4, "sku": "jkl", description: "product 4", "instock": 70, "item": null, "price": null, "quantity": null },
            { "_id": 5, "sku": null, description: "Incomplete", "item": null, "price": null, "quantity": null },
            { "_id": 6, "item": null, "price": null, "quantity": null }]);
    });
    it('joinLeft - shorthand', function () {
        expect(duplicate(arrLookup, true).joinLeft(duplicate(arrLookupJoiner, true), "_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);


        expect(duplicate(arrLookupJoiner, true).joinLeft(duplicate(arrLookup, true), "_id")).toEqual([
            { "_id": 1, "sku": "abc", description: "product 1", "instock": 120, "item": "abc", "price": 12, "quantity": 2 },
            { "_id": 2, "sku": "def", description: "product 2", "instock": 80, "item": "jkl", "price": 20, "quantity": 1 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 },
            { "_id": 4, "sku": "jkl", description: "product 4", "instock": 70, "item": null, "price": null, "quantity": null },
            { "_id": 5, "sku": null, description: "Incomplete", "item": null, "price": null, "quantity": null },
            { "_id": 6, "item": null, "price": null, "quantity": null }]);
    });
    it('joinRight - full', function () {
        expect(duplicate(arrLookupJoiner, true).joinRight(duplicate(arrLookup, true), "_id=_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);

        expect(duplicate(arrLookup, true).joinRight(duplicate(arrLookupJoiner, true), "_id=_id")).toEqual([
            { "_id": 1, "sku": "abc", description: "product 1", "instock": 120, "item": "abc", "price": 12, "quantity": 2 },
            { "_id": 2, "sku": "def", description: "product 2", "instock": 80, "item": "jkl", "price": 20, "quantity": 1 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 },
            { "_id": 4, "sku": "jkl", description: "product 4", "instock": 70, "item": null, "price": null, "quantity": null },
            { "_id": 5, "sku": null, description: "Incomplete", "item": null, "price": null, "quantity": null },
            { "_id": 6, "item": null, "price": null, "quantity": null }]);
    });
    it('joinRight - shorthand', function () {
        expect(duplicate(arrLookupJoiner, true).joinRight(duplicate(arrLookup, true), "_id")).toEqual([
            { "_id": 1, "item": "abc", "price": 12, "quantity": 2, "sku": "abc", description: "product 1", "instock": 120 },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "sku": "def", description: "product 2", "instock": 80 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 }]);


        expect(duplicate(arrLookup, true).joinRight(duplicate(arrLookupJoiner, true), "_id")).toEqual([
            { "_id": 1, "sku": "abc", description: "product 1", "instock": 120, "item": "abc", "price": 12, "quantity": 2 },
            { "_id": 2, "sku": "def", description: "product 2", "instock": 80, "item": "jkl", "price": 20, "quantity": 1 },
            { "_id": 3, "sku": "ijk", description: "product 3", "instock": 60 },
            { "_id": 4, "sku": "jkl", description: "product 4", "instock": 70, "item": null, "price": null, "quantity": null },
            { "_id": 5, "sku": null, description: "Incomplete", "item": null, "price": null, "quantity": null },
            { "_id": 6, "item": null, "price": null, "quantity": null }]);
    });
    it('limit', function () {
        expect(arrObjs.limit(1)).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('map', function () {
        var temp = duplicate(arrObjs, true);
        temp.map(function (item: any) { (item as any).p = 10; return item; });
        expect(temp).toEqual([
            { id: 1, p: 10, share: "shared", index: 10, std: 4 },
            { id: 2, p: 10, share: "shared", index: 20, std: 4 },
            { id: 3, p: 10, share: "shared", index: 30, std: 4 },
            { id: 4, p: 10, std: 4 }]);
    });

    var arr = [{
        _id: 1,
        cust_id: "abc123",
        ord_date: new Date("Oct 04, 2012"),
        status: 'A',
        price: 25,
        items: [{ sku: "mmm", qty: 5, price: 2.5 },
        { sku: "nnn", qty: 5, price: 2.5 }]
    }, {
        _id: 2,
        cust_id: "abc123",
        ord_date: new Date("Oct 04, 2012"),
        status: 'A',
        price: 25,
        items: [{ sku: "mmm", qty: 5, price: 2.5 },
        { sku: "nnn", qty: 5, price: 2.5 }]
    }, {
        _id: 1,
        cust_id: "abc124",
        ord_date: new Date("Oct 04, 2012"),
        status: 'B',
        price: 30,
        items: [{ sku: "ooo", qty: 5, price: 2.5 },
        { sku: "ppp", qty: 5, price: 2.5 }]
    }];
    var reduceFunction1 = function (keyCustId: any, valuesPrices: any) {
        return valuesPrices.sum();
    };
    var mapFunction1 = function (this: any) {
        emit(this.cust_id, this.price);
    };
    it('mapReduce - simple', function () {
        expect(duplicate(arr, true).mapReduce(mapFunction1, reduceFunction1))
            .toEqual([{ _id: 'abc123', value: 50 }, { _id: 'abc124', value: 30 }]);
    });
    it('mapReduce - query', function () {
        expect(duplicate(arr, true).mapReduce(mapFunction1, reduceFunction1, { query: { cust_id: 'abc123' } }))
            .toEqual([{ _id: 'abc123', value: 50 }]);
    });
    it('mapReduce - limit', function () {
        expect(duplicate(arr, true).mapReduce(mapFunction1, reduceFunction1, { limit: 1 }))
            .toEqual([{ _id: 'abc123', value: 25 }]);
    });
    it('mapReduce - out', function () {
        var rarr: any[] = [];
        expect(duplicate(arr, true).mapReduce(mapFunction1, reduceFunction1, { out: rarr }))
            .toBe(rarr);
    });
    it('mapReduce - limit/final', function () {
        expect(duplicate(arr, true).mapReduce(mapFunction1, reduceFunction1, { limit: 1, finalize: function () { return {}; } }))
            .toEqual([{ _id: 'abc123', value: {} }]);
    });
    it('normalize', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.normalize()).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, p: null, share: null, index: null, std: 4 }]);
    });
    describe("parallelEach async test", function () {
        var results: any = [];
        var usersdata = {
            users:
                [{ username: 'mtglass', name: 'Mark Glass', age: 10 },
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
                { username: 'awesome_game', name: 'clash of clans', age: 21 }]
        };
        var promise = function () {
            return ajax('http://craydent.com:8000/test/users.js');
        };
        // if ($m.noAsync) {
        //     promise = function () {
        //         return new Promise(function (res) {
        //             setTimeout(function () { res(usersdata); }, 1)
        //         });
        //     };
        // }
        const win = (global as any).window;
        delete (global as any).window;
        afterAll(() => {
            if (win) { (global as any).window = win; }
        });
        beforeEach(async function () {

            results = await ([
                function* (): any { return yield promise(); },
                function* (): any { return yield promise(); },
                function* (): any { return yield promise(); },
                function* (): any { return yield promise(); },
                function* (): any { return yield promise(); },
                async function () { return await promise(); },
                async function () { return await promise(); },
                async function () { return await promise(); },
                async function () { return await promise(); },
                async function () { return await promise(); },


                promise(),
                promise(),
                promise(),
                promise(),
                promise(),
                promise(),
                promise(),
                promise(),
                promise(),
                promise(),

                function (a: any) { return 1 + a; },
                function (a: any) { return 2 + a; },
                function (a: any) { return 3 + a; },
                function (a: any) { return 4 + a; },
                function (a: any) { return 5 + a; },
                function (a: any) { return 6 + a; },
                function (a: any) { return 7 + a; },
                function (a: any) { return 8 + a; },
                function (a: any) { return 9 + a; },
                function (a: any) { return 10 + a; },
                "asdf"

            ].parallelEach([1]));
            if (!results) { console.log('wtf'); }

        });

        it('parallelEach', function () {
            expect(results).toEqual([
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                usersdata,
                2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "asdf"
            ]);
        });

    });
    it('remove - simple', function () {
        //arrMix = [1,{},"adsf",10];
        var temp = duplicate(arrMix, true);
        expect(temp.remove("adsf")).toBe("adsf");
        expect(temp).toEqual([1, {}, 10]);
    });
    it('remove - callback', function () {
        //arrMix = [1,{},"adsf",10];
        var temp = duplicate(arrMix, true);
        expect(temp.remove("adsf", function () { return 1/*index*/; })).toEqual({});
        expect(temp).toEqual([1, 'adsf', 10]);
    });
    it('removeAll - simple', function () {
        var temp = duplicate(arrObjs, true);
        temp.removeAll();
        expect(temp).toEqual([]);
        expect([].removeAll()).toEqual([]);
    });
    it('removeAll - complex', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.removeAll("10", function (this: any, value: any) { return indexOfAlt(this, value, function (item, value, arr) { return (item as any).p == value; }); }))
            .toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);;
        expect(temp).toEqual([
            { id: 2, p: '20', share: 'shared', index: 20, std: 4 },
            { id: 3, p: '30', share: 'shared', index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('removeAt', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.removeAt(1)).toEqual({ id: 2, p: "20", share: "shared", index: 20, std: 4 });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('replaceAt', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.replaceAt(1, { id: 5, p: "50", share: "shared", index: 50, std: 4 })).toEqual({ id: 2, p: "20", share: "shared", index: 20, std: 4 });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 5, p: "50", share: "shared", index: 50, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('scramble', function () {
        var temp = duplicate(arrObjsScramble, true);
        expect(temp.scramble()).not.toEqual(arrObjsScramble);
        expect(temp.length).toEqual(arrObjsScramble.length);
    });
    it('sortBy - simple', function () {
        var temp = duplicate(arrSort, true);
        expect(temp.sortBy('s')).toEqual([{ id: 5, s: 2 }, { id: 4, s: 3 }, { id: 1, s: 5 }, { id: 2, s: 5 }, { id: 3, s: 6 }]);
    });
    it('sortBy - simple negate', function () {
        var temp = duplicate(arrSort, true);
        expect(temp.sortBy(['s', '!id'])).toEqual([{ id: 5, s: 2 }, { id: 4, s: 3 }, { id: 2, s: 5 }, { id: 1, s: 5 }, { id: 3, s: 6 }]);
    });
    it('sortBy - simple comma separated', function () {
        var temp: any = duplicate(arrSort, true);
        expect(temp.sortBy('s,!id')).toEqual([{ id: 5, s: 2 }, { id: 4, s: 3 }, { id: 2, s: 5 }, { id: 1, s: 5 }, { id: 3, s: 6 }]);

        temp = duplicate(arrSort, true);
        expect(temp.sortBy('s,!id', true)).toEqual([{ id: 3, s: 6 }, { id: 1, s: 5 }, { id: 2, s: 5 }, { id: 4, s: 3 }, { id: 5, s: 2 }]);
    });
    it('sortBy - primer', function () {
        var temp: any = duplicate(arrSort, true);

        var primer = function (val: any) { if (val % 2) { return val - 1; } return val; };
        expect(temp.sortBy(['s', 'id'], false, primer)).toEqual([{ id: 4, s: 3 }, { id: 5, s: 2 }, { id: 1, s: 5 }, { id: 2, s: 5 }, { id: 3, s: 6 }]);
    });
    it('sortBy - lookup', function () {
        var arr = ['a', 'b', 'c', 'd'], lookup = { a: { s: 4 }, b: { s: 3 }, c: { s: 2 }, d: { s: 1 } };
        expect(arr.sortBy(['s'], false, null as any, lookup)).toEqual(['d', 'c', 'b', 'a']);

        var lookup2 = { a: { s: "a" }, b: { s: "B" }, c: { s: "c" }, d: { s: "d" } };
        expect(arr.sortBy(['s'], false, null as any, lookup2)).toEqual(['b', 'a', 'c', 'd']);
    });
    it('sortBy - lookup string', function () {
        var arr = ['a', 'b', 'c', 'd'];

        var lookup2 = { a: { s: "a" }, b: { s: "B" }, c: { s: "c" }, d: { s: "d" } };
        expect(arr.sortBy(['s'], false, null as any, lookup2)).toEqual(['b', 'a', 'c', 'd']);
    });
    it('sortBy - lookup string ignore case', function () {
        var arr = ['a', 'b', 'c', 'd'];

        var lookup2 = { a: { s: "a" }, b: { s: "B" }, c: { s: "c" }, d: { s: "d" } };
        expect(arr.sortBy(['s'], false, null as any, lookup2, 'i')).toEqual(['a', 'b', 'c', 'd']);
    });
    it('stdev', function () {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var arr2 = [1, undefined, 2, '', 3, {}, 4, [], 5, null, function () { }, 6, 7, 8, 9, 0];
        expect(arr.stdev()).toBe(2.8722813232690143);
        expect((arr2 as Array<any>).stdev()).toBe(2.8722813232690143);
    });
    it('sum', function () {
        expect((arrMix as Array<any>).sum()).toBe(11);
    });
    it('toSet', function () {
        var arr: any = duplicate(arrStrings);
        arr.push("string 1");
        arr.toSet();
        expect(arr).toEqual(arrStrings);
        arr = [{}, {}, {}, {}];
        arr.toSet();
        expect(arr).toEqual([{}]);
    });
    it('trim', function () {
        var arr = ["     string 1    ", "  string 2  ", " string 3 ", "string 4"];
        expect(arr.trim()).toEqual(["string 1", "string 2", "string 3", "string 4"]);
        expect(arr).toEqual(["     string 1    ", "  string 2  ", " string 3 ", "string 4"]);
        arr.trim(null as any, true);
        expect(arr).toEqual(["string 1", "string 2", "string 3", "string 4"]);
    });
    it('update - $set/single', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, { $set: { index: 15 } });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 15, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - $set/multiple', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, { $set: { index: 15 } }, { multi: true });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 15, std: 4 },
            { id: 2, p: "20", share: "shared", index: 15, std: 4 },
            { id: 3, p: "30", share: "shared", index: 15, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - replace/single', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, {});
        expect(temp).toEqual([
            {},
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - replace/multiple', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, {}, { multi: true });
        expect(temp).toEqual([{}, {}, {}, { id: 4, std: 4 }]);
    });
    it('update - $inc', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, { $inc: { index: 1 } }, { multi: true });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 11, std: 4 },
            { id: 2, p: "20", share: "shared", index: 21, std: 4 },
            { id: 3, p: "30", share: "shared", index: 31, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - $unset', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, { $unset: { index: 1 } });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - $currentDate', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ share: "shared" }, { $currentDate: { currentDate: 1 } });
        expect((temp[0] as any).currentDate.toString()).toBe((new Date()).toString());
        delete (temp[0] as any).currentDate;
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }]);
    });
    it('update - $min/$max/$mul/$rename', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({}, { $min: { index: 20 }, $max: { index: 20 }, $mul: { std: 2 }, $rename: { share: 'shared' } }, { multi: true });
        expect(temp).toEqual([
            { id: 1, p: "10", shared: "shared", index: 20, std: 8 },
            { id: 2, p: "20", shared: "shared", index: 20, std: 8 },
            { id: 3, p: "30", shared: "shared", index: 20, std: 8 },
            { id: 4, index: 20, std: 8 }]);
    });
    var arrArr = [
        {
            id: 1, arr: [
                { "id": 1, "score": 6 },
                { "id": 2, "score": 9 }
            ]
        }
    ];
    it('update - $push', function () {
        var temp = duplicate(arrArr, true);
        temp.update({}, {
            $push: {
                arr: {
                    $each: [{ id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 }],
                    $sort: { score: 1 }
                }
            }
        });
        expect(temp).toEqual([{
            id: 1, arr: [
                { "id": 1, "score": 6 },
                { "id": 5, "score": 6 },
                { "id": 4, "score": 7 },
                { "id": 3, "score": 8 },
                { "id": 2, "score": 9 }
            ]
        }]);

        temp = duplicate(arrArr, true);
        temp.update({}, {
            $push: {
                arr: {
                    $each: [{ id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 }],
                    $slice: -2
                }
            }
        });
        expect(temp).toEqual([{
            id: 1, arr: [
                { id: 4, score: 7 }, { id: 5, score: 6 }
            ]
        }]);

        temp = duplicate(arrArr, true);
        temp.update({}, {
            $push: {
                arr: {
                    $each: [{ id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 }],
                    $position: 1
                }
            }
        });
        expect(temp).toEqual([{
            id: 1, arr: [
                { "id": 1, "score": 6 },
                { "id": 3, "score": 8 },
                { "id": 4, "score": 7 },
                { "id": 5, "score": 6 },
                { "id": 2, "score": 9 }
            ]
        }]);
    });
    it('update - $pop', function () {
        var temp = duplicate(arrArr, true);
        temp.update({}, { $pop: { arr: -1 } });
        expect(temp).toEqual([{
            id: 1, arr: [
                { "id": 2, "score": 9 }
            ]
        }]);

        temp = duplicate(arrArr, true);
        temp.update({}, { $pop: { arr: 1 } });
        expect(temp).toEqual([{
            id: 1, arr: [
                { "id": 1, "score": 6 }
            ]
        }]);
    });
    it('update - $pullAll', function () {
        var temp = [{ id: 1, scores: [0, 2, 5, 5, 1, 0] }];
        temp.update({}, { $pullAll: { scores: [0, 5] } });
        expect(temp).toEqual([{ id: 1, scores: [2, 1] }]);
    });
    it('update - $upsert/$set', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ nonexistant: "shared" }, { $set: { index: 15 } }, { upsert: true });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }, { index: 15 }]);
    });
    it('update - $upsert/replace', function () {
        var temp = duplicate(arrObjs, true);
        temp.update({ nonexistant: "shared" }, { index: 15 }, { upsert: true });
        expect(temp).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, std: 4 }, { index: 15 }]);
    });
    it('upsert - unchanged', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert({ id: 1, p: "10", share: "shared", index: 10, std: 4 }, "id")).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [0],
            inserted: [],
            updated: [],
            unchanged: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('upsert - insert', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert({ id: 5, p: "10", share: "shared", index: 10, std: 4 }, "id")).toEqual({
            insertedIndexes: [4],
            updatedIndexes: [],
            unchangedIndexes: [],
            inserted: [{ id: 5, p: "10", share: "shared", index: 10, std: 4 }],
            updated: [],
            unchanged: []
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }, { id: 5, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('upsert - insert/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert({ id: 5, p: "10", share: "shared", index: 10, std: 4 }, "id", function (doc, record) {
            return true;
        })).toEqual({
            insertedIndexes: [4],
            updatedIndexes: [],
            unchangedIndexes: [],
            inserted: [{ id: 5, p: "10", share: "shared", index: 10, std: 4 }],
            updated: [],
            unchanged: []
        });
    });
    it('upsert - unchanged/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert({ id: 1, p: "10", share: "shared", index: 10, std: 4 }, "id", function () { return true; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [0],
            inserted: [],
            updated: [],
            unchanged: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('upsert - updated/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert({ id: 1, p: "10", share: "shared", index: 10, std: 4 }, "id", function () { return false; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [0],
            unchangedIndexes: [],
            inserted: [],
            updated: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }],
            unchanged: []
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('upsert - unchanged/array', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }], "id")).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [0],
            inserted: [],
            updated: [],
            unchanged: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('upsert - insert/array', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert([{ id: 5, p: "10", share: "shared", index: 10, std: 4 }], "id")).toEqual({
            insertedIndexes: [4],
            updatedIndexes: [],
            unchangedIndexes: [],
            inserted: [{ id: 5, p: "10", share: "shared", index: 10, std: 4 }],
            updated: [],
            unchanged: []
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }, { id: 5, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('upsert - insert/array/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert([{ id: 5, p: "10", share: "shared", index: 10, std: 4 }], "id", function (doc, record) {
            return true;
        })).toEqual({
            insertedIndexes: [4],
            updatedIndexes: [],
            unchangedIndexes: [],
            inserted: [{ id: 5, p: "10", share: "shared", index: 10, std: 4 }],
            updated: [],
            unchanged: []
        });
    });
    it('upsert - unchanged/array/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }], "id", function () { return true; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [0],
            inserted: [],
            updated: [],
            unchanged: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('upsert - updated/array/function', function () {
        var temp = duplicate(arrObjs, true);
        expect(temp.upsert([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }], "id", function () { return false; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [0],
            unchangedIndexes: [],
            inserted: [],
            updated: [{ id: 1, p: "10", share: "shared", index: 10, std: 4 }],
            unchanged: []
        });
        expect(temp).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 },
        { id: 2, p: "20", share: "shared", index: 20, std: 4 },
        { id: 3, p: "30", share: "shared", index: 30, std: 4 },
        { id: 4, std: 4 }]);
    });
    it('where - simple', function () {
        var temp = duplicate(arrObjs, true);
        expect(arrObjs.where({ share: "shared" })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
    });
    it('where - comparison', function () {
        expect(arrObjs.where({ index: { $eq: 10 } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
        expect(arrObjs.where({ index: { $gt: 20 } })).toEqual([{ id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
        expect(arrObjs.where({ index: { $lt: 20 } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
        expect(arrObjs.where({ index: { $gte: 20 } })).toEqual([{ id: 2, p: "20", share: "shared", index: 20, std: 4 }, { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
        expect(arrObjs.where({ index: { $lte: 20 } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }, { id: 2, p: "20", share: "shared", index: 20, std: 4 }]);
        expect(arrObjs.where({ index: { $ne: 20 } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }, { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
    });
    it('where - $in & $nin', function () {
        expect(arrObjs.where({ index: { $in: [10, 20] } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }, { id: 2, p: "20", share: "shared", index: 20, std: 4 }]);
        expect(arrObjs.where({ index: { $nin: [10, 20] } })).toEqual([{ id: 3, p: "30", share: "shared", index: 30, std: 4 }, { id: 4, std: 4 }]);
        var whereTemp = [
            {
                id: 1, locations: [{
                    country: "us"
                }]
            },
            {
                id: 2, locations: [{
                    country: "uk"
                }]
            },
            {
                id: 3, locations: [{
                    country: "jp"
                }, {
                    country: "us"
                }]
            },
            {
                id: 4, locations: [{
                    country: "de"
                }]
            }
        ], results = [
            {
                id: 1, locations: [{
                    country: "us"
                }]
            },
            {
                id: 3, locations: [{
                    country: "jp"
                }, {
                    country: "us"
                }]
            },
            {
                id: 4, locations: [{
                    country: "de"
                }]
            }
        ];

        expect(whereTemp.where({ 'locations.country': { $in: ['us', 'de'] } })).toEqual(results);
    });
    it('where - logical', function () {
        expect(arrObjs.where({ $and: [{ std: 4 }, { index: 10 }] })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
        expect(arrObjs.where({ $and: [{ std: 5 }, { index: 10 }] })).toEqual([]);
        expect(arrObjs.where({ $or: [{ index: 20 }, { index: 10 }] })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }, { id: 2, p: "20", share: "shared", index: 20, std: 4 }]);
        expect(arrObjs.where({ index: { $not: { $gte: 20 } } })).toEqual([{ id: 1, p: "10", share: "shared", index: 10, std: 4 }, { id: 4, std: 4 }]);
        expect(arrObjs.where({ $nor: [{ index: 20 }, { index: 10 }] })).toEqual([{ id: 3, p: "30", share: "shared", index: 30, std: 4 }, { id: 4, std: 4 }]);
    });
    it('where - $exists', function () {
        expect(arrObjs.where({ index: { $exists: true } })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
        expect(arrObjs.where({ index: { $exists: false } })).toEqual([{ id: 4, std: 4 }]);
    });
    it('where - $type', function () {
        expect(arrObjs.where({ index: { $type: Number } })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
    });
    it('where - $mod', function () {
        expect(arrObjs.where({ index: { $mod: [3, 2] } })).toEqual([
            { id: 2, p: "20", share: "shared", index: 20, std: 4 }]);
    });
    it('where - $regex', function () {
        expect(arrObjs.where({ index: { $regex: /[12]/ } })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 }]);
    });
    it('where - $where', function () {
        var temp = duplicate(arrObjs, true);
        expect(arrObjs.where({ $where: "this.index > 20" })).toEqual([
            { id: 3, p: "30", share: "shared", index: 30, std: 4 }]);
        expect(arrObjs.where({ $where: function (this: any) { return this.index < 20; } })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('where - function', function () {
        expect(arrObjs.where(function (this: any) { return this.index < 20; })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 }]);
    });
    it('where - $all', function () {
        expect([{ id: 1, p: "10", share: "shared", index: 10, std: 4, tags: ['a', 'b'] }].where({ tags: { $all: ['b', 'a'] } })).toEqual([
            { id: 1, p: "10", share: "shared", index: 10, std: 4, tags: ['a', 'b'] }]);
    });
    it('where - array', function () {
        expect([{ id: 1, p: "10", share: "shared", index: 10, std: 4, tags: ['c', 'b'] }].where({ tags: ['b', 'a'] })).toEqual([]);
    });
    var whereTemp = [
        {
            _id: 1, results: [
                { product: "abc", score: 10 },
                { product: "xyz", score: 5 }]
        },
        {
            _id: 2, results: [
                { product: "xyz", score: 7 }]
        },
        {
            _id: 3, results: [
                { product: "abc", score: 7 },
                { product: "xyz", score: 8 }]
        },
        { _id: 3 },
        { _id: 4, results: [] }];
    it('where - $elemMatch', function () {
        expect(whereTemp.where({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })).toEqual([
            { "_id": 3, "results": [{ "product": "abc", "score": 7 }, { "product": "xyz", "score": 8 }] }
        ]);
    });
    it('where - $size', function () {
        expect(whereTemp.where({ results: { $size: 1 } })).toEqual([
            { _id: 2, results: [{ product: "xyz", score: 7 }] }
        ]);
        expect(whereTemp.where({ results: { $size: 0 } })).toEqual([{ _id: 3 }, { _id: 4, results: [] }]);
        expect(whereTemp.where({ results: { $size: 2 } })).toEqual([
            { _id: 1, results: [{ product: "abc", score: 10 }, { product: "xyz", score: 5 }] },
            { "_id": 3, "results": [{ "product": "abc", "score": 7 }, { "product": "xyz", "score": 8 }] }
        ]);
    });
    it('where - regex', function () {
        var temp = [
            { section: 'Result', category: "imaging" },
            { section: 'Result', category: "blahimagingblah" },
            { section: 'Result', category: "Imaging" },
            { section: 'Result', category: "image" }];
        expect(temp.where({ category: /imaging/i, section: { '$ne': 'history' } })).toEqual([
            { section: 'Result', category: "imaging" },
            { section: 'Result', category: "blahimagingblah" },
            { section: 'Result', category: "Imaging" }]);
    });
});