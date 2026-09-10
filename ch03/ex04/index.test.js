describe("Hundred Points Symbol", () => {
    const Hundred = "💯";
    it("💯の文字数をチェックする", () => {
       expect(Hundred.length).toBe(2);
    });

    it("💯のutf-16コードポイント表現をチェックする", () => {
       expect(Hundred).toBe("\uD83D\uDCAF");
    });

    it("💯のutf-32コードポイント表現をチェックする", () => {
       expect(Hundred).toBe("\u{0001F4AF}");
    });
});