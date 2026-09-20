import { add,sub,mul,div } from "./index.js";

describe("ch04-ex01", () => {
    const x = {a:3,b:5}; //aを実部、bを虚部としたプロパティを持つ複素数
    const y = {a:7,b:12};
    it("add", () => {
        expect(add(x, y)).toEqual({a:10,b:17});
    });

    it("sub", () => {
        expect(sub(x, y)).toEqual({a:-4,b:-7});
    });

    it("mul", () => {
        expect(mul(x,y)).toEqual({a:-39,b:71});
    });

    it("div", () => {
         expect(div(x,y)).toEqual({a:expect.closeTo(81/193),b:expect.closeTo(-1/193)});
    });
});