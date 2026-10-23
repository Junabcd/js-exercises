import { getObjectProp } from "./index.js";

describe("ch06-ex06", () => {
    it("独自の列挙可能プロパティを含む", () => {
        const o = {x: 0 , y: 0};
        expect(getObjectProp(o)).toEqual(["x", "y"]);
    });

    it("独自の列挙不可プロパティを含む", () => {
        const o = {};
        Object.defineProperty(o, "e", { value: 1 ,enumerable: false});
        expect(getObjectProp(o)).toEqual(["e"]);
    });

    it("Symbolキーの独自プロパティを含む", () => {
        const o = {};
        const a = Symbol("a");
        o[a] = "localSymbol";
        expect(getObjectProp(o)).toEqual([a]);
    });

    it("列挙可能な継承プロパティを含む（2 段以上も）", () => {
        const proto1 = {x:1};
        const proto2  = Object.create(proto1);
        proto2.y = 2;
        const o = Object.create(proto2);
        expect(getObjectProp(o)).toEqual(expect.arrayContaining(["x", "y"]));
        expect(getObjectProp(o)).toHaveLength(2);
    });

    it("列挙不可の継承プロパティは含まない", () => {
        const proto = {};
        Object.defineProperty(proto, "e1", { value: 1 ,enumerable: false});
        Object.defineProperty(proto, "e2", { value: 2 ,enumerable: false});
        const o = Object.create(proto);
        expect(getObjectProp(o)).toEqual(expect.arrayContaining([]));
        expect(getObjectProp(o)).toHaveLength(0);
    });

    it("同名の独自・継承プロパティは1回だけ出る", () => {
        const proto = {};
        proto.x = 1;
        proto.y = 2;
        const o = Object.create(proto);
        o.x = 10;
        o.y = 20;
        expect(getObjectProp(o)).toEqual(expect.arrayContaining(["x", "y"]));
        expect(getObjectProp(o)).toHaveLength(2);
    });

    it("プロトタイプが null でもエラーにならない", () => {
        const o = Object.create(null);
        o.x = 10;
        o.y = 20;
        expect(getObjectProp(o)).toEqual(expect.arrayContaining(["x", "y"]));
        expect(getObjectProp(o)).toHaveLength(2);
    });

    it("hasOwnPropertyが上書きされていても正しく動く", () => {
        const o = { hasOwnProperty: () => true };
        o.x = 10;
        o.y = 20;
        expect(getObjectProp(o)).toEqual(expect.arrayContaining(["x", "y", "hasOwnProperty"]));
        expect(getObjectProp(o)).toHaveLength(3);
    });

    it("空オブジェクトは空配列", () => {
        const o = {};
        expect(getObjectProp(o)).toEqual([]);
    });

    it("混合テスト", () => {
        const proto1 = {x:1};
        const proto2  = Object.create(proto1);
        proto2.y = 2;
        Object.defineProperty(proto2, "e1", { value: 1 ,enumerable: false});
        const o = Object.create(proto2);
        o.x = 10;
        const a = Symbol("a");
        o[a] = "localSymbol";
        o.hasOwnProperty = () => true;
        expect(getObjectProp(o)).toEqual(expect.arrayContaining(["x", "y", a, "hasOwnProperty"]));
        expect(getObjectProp(o)).toHaveLength(4);
    });
});