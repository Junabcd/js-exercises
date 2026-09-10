import { LFtoCRLF,CRLFtoLF } from "./index.js";

describe("改行コードの変換チェック", () => {
    const s1 = "Hello\nmy\nname\nis\njava\nscript!";
    const s2 = "Hello\r\nmy\r\nname\r\nis\r\njava\r\nscript!";
    it("LF→CR+LFに変換する関数のチェック", () => {
        expect(LFtoCRLF(s1)).toBe(s2);
    });

    it("CR+LF→LFに変換する関数のチェック", () => {
        expect(CRLFtoLF(s2)).toBe(s1);
    });
});