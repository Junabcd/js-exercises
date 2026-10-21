import { isPrototypeChain } from "./index.js";

describe("ch06-ex03", () => {
    it("parentがnullのときエラーになることを確認", () => {
        const o = {x: 0 , y: 0};
        expect(() => isPrototypeChain(null,o)).toThrow(TypeError);
        expect(() => isPrototypeChain(undefined,o)).toThrow(TypeError);
    });

    it("oがpおよびqのプロトタイプチェーン上に存在することを確認", () => {
        let o = {}; // o はObject.prototype からメソッドを継承し、
        o.x = 1; // 独自プロパティx を持つ。
        let p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
        p.y = 2; // 独自プロパティy を持つ。
        let q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
        q.z = 3; // 独自プロパティz を持つ。
        let f = q.toString(); // toString はObject.prototype から継承する。
        q.x + q.y // => 3; x とy はそれぞれo とp から継承する。
        expect(isPrototypeChain(o,p)).toBe(true);
        expect(isPrototypeChain(o,q)).toBe(true);
        expect(isPrototypeChain(p,o)).toBe(false);
        expect(isPrototypeChain(q,o)).toBe(false);
    });

    it("pがqのプロトタイプチェーン上に存在することを確認", () => {
        let o = {}; // o はObject.prototype からメソッドを継承し、
        o.x = 1; // 独自プロパティx を持つ。
        let p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
        p.y = 2; // 独自プロパティy を持つ。
        let q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
        q.z = 3; // 独自プロパティz を持つ。
        let f = q.toString(); // toString はObject.prototype から継承する。
        q.x + q.y // => 3; x とy はそれぞれo とp から継承する。
        expect(isPrototypeChain(p,q)).toBe(true);
        expect(isPrototypeChain(q,p)).toBe(false);
    });
});