import { parseJson } from "./index.js";

describe("ch05-ex09", () => {
    it("parse成功", () => {
        expect(parseJson('{"a":1,"b":2}')).toEqual({success: true, data: {a :1,b :2}});
    });

    it("parse失敗", () => {
        let expectedMessage;
        try {
            JSON.parse("aaaaa");
        } catch (e) {
            expectedMessage = e.message;
        }
        expect(parseJson("aaaaa")).toEqual({success: false, error: expectedMessage});
    });
});