import { createPoint, createNewPoint } from "./index.js";

describe("ch06-ex02", () => {
    it("生成したオブジェクトのプロトタイプがObject.createで渡したオブジェクトになっていることを確認", () => {
        const point = createPoint();
        const newPoint = createNewPoint(point);
        expect(Object.getPrototypeOf(newPoint)).toBe(point);
    });

    it("継承プロパティのプロパティを取り出す", () => {
        const point = createPoint();
        const newPoint = createNewPoint(point);
        expect(newPoint.x).toBe(0);
        expect(newPoint.y).toBe(0);
        expect(newPoint.z).toBe(undefined); //定義していないプロパティを指定するとundefined
    });

    it("継承プロパティは独自にプロパティを持っているか", () => {
        const point = createPoint();
        const newPoint = createNewPoint(point);
        expect(Object.keys(point)).toEqual(["x","y"]);
        expect(Object.keys(newPoint)).toEqual([]);
    });

    it("プロトタイプ側の値を変更", () => { //こっちは継承元のプロパティの値を変更
        const point = createPoint();
        const newPoint = createNewPoint(point);
        point.x = 1;
        point.y = 3;
        expect(point.x).toBe(1);
        expect(point.y).toBe(3);
        expect(newPoint.x).toBe(1);
        expect(newPoint.y).toBe(3);
    });

    it("作ったオブジェクトのプロパティに値を代入", () => { //こっちは継承側のプロパティに値を代入
        const point = createPoint();
        const newPoint = createNewPoint(point);
        newPoint.x = 1;
        newPoint.y = 3;
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
        expect(newPoint.x).toBe(1);
        expect(newPoint.y).toBe(3);
    });
});