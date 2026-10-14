import { expect } from "vitest";
import { hash, newHashTable } from "./index.js";

describe("ch06-ex01(hash)", () => {
    it("hash関数に文字列を渡す", () => {
        expect(hash("abc")).toBe(294);
    });

    it("hash関数に文字列以外を渡す", () => {
        expect(() => hash(123)).toThrow(TypeError);
        expect(() => hash(true)).toThrow(TypeError);
        expect(() => hash(undefined)).toThrow(TypeError);
    });
});

describe("ch06-ex01(newHashTable)", () => {
    it("newHashTableにputする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        const index1 = hash("key1") % 10;
        expect(hashTable.entries[index1]).toEqual({ key:"key1", value:"value1", next: undefined });
        expect(hashTable.size).toBe(1);
        hashTable.put("key2", "value2");
        const index2 = hash("key2") % 10;
        expect(hashTable.entries[index2]).toEqual({ key:"key2", value:"value2", next: undefined });
        expect(hashTable.size).toBe(2);
    });

    it("newHashTableに同じkeyをputする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        const index1 = hash("key1") % 10;
        expect(hashTable.entries[index1]).toEqual({ key:"key1", value:"value1", next: undefined });
        expect(hashTable.size).toBe(1);
        hashTable.put("key1", "value2");
        const index2 = hash("key1") % 10;
        expect(hashTable.entries[index2]).toEqual({ key:"key1", value:"value2", next: undefined });
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableに衝突するものをputする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("ab", "value1");
        const index1 = hash("ab") % 10;
        expect(hashTable.entries[index1]).toEqual({ key:"ab", value:"value1", next: undefined });
        expect(hashTable.size).toBe(1);
        hashTable.put("ba", "value2");
        const index2 = hash("ba") % 10;
        expect(hashTable.entries[index2]).toEqual({ key:"ab", value:"value1", next: { key:"ba", value:"value2", next: undefined } });
        expect(hashTable.size).toBe(2);
    });

    it("newHashTableに数字をputする", () => {
        const hashTable = newHashTable(10);
        expect(() => hashTable.put(1)).toThrow(TypeError);
        expect(hashTable.size).toBe(0);
    });

    it("newHashTableに引数の多いobjectをputする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1", "name1");
        const index1 = hash("key1") % 10;
        expect(hashTable.entries[index1]).toEqual({ key:"key1", value:"value1", next: undefined });
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableからgetする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableからkeyにないものをgetする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.get("aaa")).toBe(undefined);
        expect(hashTable.size).toBe(1);
    });

    it("空のnewHashTableからgetする", () => {
        const hashTable = newHashTable(10);
        expect(hashTable.get("aaa")).toBe(undefined);
        expect(hashTable.size).toBe(0);
    });

    it("newHashTableから上書きされた値をgetする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.size).toBe(1);
        hashTable.put("key1", "value2");
        expect(hashTable.get("key1")).toBe("value2");
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableから衝突した値をgetする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("ab", "value1");
        hashTable.put("ba", "value2");
        expect(hashTable.get("ba")).toBe("value2");
        expect(hashTable.size).toBe(2);
    });

    it("newHashTableのgetに数字を引数として渡す", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(() => hashTable.get(1)).toThrow(TypeError);
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableのgetに余分な引数を渡す", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.get("key1","key2","key3")).toBe("value1");
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableからremoveする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.size).toBe(1);
        hashTable.remove("key1");
        expect(hashTable.get("key1")).toBe(undefined);
        expect(hashTable.size).toBe(0);
    });

    it("newHashTableからkeyにないものをremoveする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.size).toBe(1);
        hashTable.remove("aaa");
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.size).toBe(1);
    });

    it("空のnewHashTableからremoveする", () => {
        const hashTable = newHashTable(10);
        hashTable.remove("key1");
        expect(hashTable.get("key1")).toBe(undefined);
        expect(hashTable.size).toBe(0);
    });

    it("newHashTableから上書きされた値をremoveする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        hashTable.put("key1", "value2");
        expect(hashTable.size).toBe(1);
        hashTable.remove("key1");
        expect(hashTable.get("key1")).toBe(undefined);
        expect(hashTable.size).toBe(0);
    });

    it("newHashTableから衝突した値をremoveする", () => {
        const hashTable = newHashTable(10);
        hashTable.put("ab", "value1");
        hashTable.put("ba", "value2");
        expect(hashTable.size).toBe(2);
        hashTable.remove("ba");
        expect(hashTable.get("ba")).toBe(undefined);
        expect(hashTable.get("ab")).toBe("value1");
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableのremoveに数字を引数として渡す", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(() => hashTable.remove(1)).toThrow(TypeError);
        expect(hashTable.size).toBe(1);
    });

    it("newHashTableのremoveに余分な引数を渡す", () => {
        const hashTable = newHashTable(10);
        hashTable.put("key1", "value1");
        expect(hashTable.size).toBe(1);
        hashTable.remove("key1","key2","key3");
        expect(hashTable.get("key1")).toBe(undefined);
        expect(hashTable.size).toBe(0);
    });
});