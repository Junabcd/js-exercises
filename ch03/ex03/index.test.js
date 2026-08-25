import { isSimilar } from "./index.js";

describe("isSimilar", () => {
    it("0.3-0.2と0.1を比較する", () => {
       assert.isTrue(isSimilar(0.3-0.2,0.1));
    });

    it("0.2-0.1と0.1を比較する", () => {
       assert.isTrue(isSimilar(0.2-0.1,0.1));
    });
});