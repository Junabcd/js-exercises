import {resize1, resize2} from "./index.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ch04-ex06", () => {
    it("resize1でmaxWidth,maxHeightプロパティなし", () => {
        const param = {Width:200, Height:300};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize1(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 480 });
    });

    it("resize1でparamがundefined", () => {
        const param = undefined;
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize1(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 480 });
    });

    it("resize1でmaxHeightプロパティなし", () => {
        const param = {maxWidth:800, Height:300};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize1(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 800, maxHeight: 480 });
    });

    it("resize1でmaxWidthプロパティなし", () => {
        const param = {Width:200, maxHeight:500};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize1(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 500 });
    });

    it("resize1で両プロパティあり", () => {
        const param = {maxWidth:800, maxHeight:500};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize1(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 800, maxHeight: 500 });
    });

    it("resize2でmaxWidth,maxHeightプロパティなし", () => {
        const param = {Width:200, Height:300};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize2(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 480 });
    });

    it("resize2でparamがundefined", () => {
        const param = undefined;
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize2(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 480 });
    });

    it("resize2でmaxHeightプロパティなし", () => {
        const param = {maxWidth:800, Height:300};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize2(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 800, maxHeight: 480 });
    });

    it("resize2でmaxWidthプロパティなし", () => {
        const param = {Width:200, maxHeight:500};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize2(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 600, maxHeight: 500 });
    });

    it("resize2で両プロパティあり", () => {
        const param = {maxWidth:800, maxHeight:500};
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        resize2(param);

        expect(spy).toHaveBeenCalledWith({ maxWidth: 800, maxHeight: 500 });
    });
});