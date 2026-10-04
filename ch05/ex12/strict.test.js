import { createRequire } from "node:module";
import { withStateFix, duplicateParamFix, duplicatePropFix, referenceErrorFix } from "./strict-fixed";

describe("ch05-ex12", () => {
    // vitestを実行した際に、「SyntaxError: Strict mode code may not include a with statement」エラーになったので、以下のようにした。
    const require = createRequire(import.meta.url); // createRequire で読むと、node not-strict.cjsと直接実行したときと全く同じ条件（Node ネイティブ、非strict、無変換）でコードが動く。
    const { withState, duplicateParam, duplicateProp, referenceError } = require("./not-strict.cjs");
    it("with文", () => {
        expect(withState(10, "aaaaa")).toEqual(withStateFix(10, "aaaaa"));
    });

    it("重複パラメーター", () => {
        expect(duplicateParam(2, 20, "bbbbb")).toEqual(duplicateParamFix(2, 20, "bbbbb"));
    });

    it("重複プロパティ", () => {
        expect(duplicateProp(30, "ccccc")).toEqual(duplicatePropFix(30, "ccccc"));
    });

    it("宣言キーワード", () => {
        expect(referenceError()).toEqual(referenceErrorFix());
    });
});