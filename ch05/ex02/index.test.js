import { converter } from "./index.js";

describe("ch05-ex02 convertIf", () => {
  it("convertIf \\0", () => {
    expect(converter.convertIf("Java\0Script")).toBe("Java\\0Script");
    expect(converter.convertIf("Java\0Script").length).toBe(12);
  });

  it("convertIf \\b", () => {
    expect(converter.convertIf("Java\bScript")).toBe("Java\\bScript");
    expect(converter.convertIf("Java\bScript").length).toBe(12);
  });

  it("convertIf \\t", () => {
    expect(converter.convertIf("Java\tScript")).toBe("Java\\tScript");
    expect(converter.convertIf("Java\tScript").length).toBe(12);
  });

  it("convertIf \\n", () => {
    expect(converter.convertIf("Java\nScript")).toBe("Java\\nScript");
    expect(converter.convertIf("Java\nScript").length).toBe(12);
  });

  it("convertIf \\v", () => {
    expect(converter.convertIf("Java\vScript")).toBe("Java\\vScript");
    expect(converter.convertIf("Java\vScript").length).toBe(12);
  });

  it("convertIf \\f", () => {
    expect(converter.convertIf("Java\fScript")).toBe("Java\\fScript");
    expect(converter.convertIf("Java\fScript").length).toBe(12);
  });

  it("convertIf \\r", () => {
    expect(converter.convertIf("Java\rScript")).toBe("Java\\rScript");
    expect(converter.convertIf("Java\rScript").length).toBe(12);
  });

  it('convertIf \\"', () => {
    expect(converter.convertIf('Java\"Script')).toBe('Java\\"Script');
    expect(converter.convertIf('Java\"Script').length).toBe(12);
  });

  it("convertIf \\'", () => {
    expect(converter.convertIf("Java\'Script")).toBe("Java\\'Script");
    expect(converter.convertIf("Java\'Script").length).toBe(12);
  });

  it("convertIf \\\\", () => {
    expect(converter.convertIf("Java\\Script")).toBe("Java\\\\Script");
    expect(converter.convertIf("Java\\Script").length).toBe(12);
  });
});

describe("ch05-ex02 convertSwitch", () => {
  it("convertSwitch \\0", () => {
    expect(converter.convertSwitch("Java\0Script")).toBe("Java\\0Script");
    expect(converter.convertSwitch("Java\0Script").length).toBe(12);
  });

  it("convertSwitch \\b", () => {
    expect(converter.convertSwitch("Java\bScript")).toBe("Java\\bScript");
    expect(converter.convertSwitch("Java\bScript").length).toBe(12);
  });

  it("convertSwitch \\t", () => {
    expect(converter.convertSwitch("Java\tScript")).toBe("Java\\tScript");
    expect(converter.convertSwitch("Java\tScript").length).toBe(12);
  });

  it("convertSwitch \\n", () => {
    expect(converter.convertSwitch("Java\nScript")).toBe("Java\\nScript");
    expect(converter.convertSwitch("Java\nScript").length).toBe(12);
  });

  it("convertSwitch \\v", () => {
    expect(converter.convertSwitch("Java\vScript")).toBe("Java\\vScript");
    expect(converter.convertSwitch("Java\vScript").length).toBe(12);
  });

  it("convertSwitch \\f", () => {
    expect(converter.convertSwitch("Java\fScript")).toBe("Java\\fScript");
    expect(converter.convertSwitch("Java\fScript").length).toBe(12);
  });

  it("convertSwitch \\r", () => {
    expect(converter.convertSwitch("Java\rScript")).toBe("Java\\rScript");
    expect(converter.convertSwitch("Java\rScript").length).toBe(12);
  });

  it('convertSwitch \\"', () => {
    expect(converter.convertSwitch('Java\"Script')).toBe('Java\\"Script');
    expect(converter.convertSwitch('Java\"Script').length).toBe(12);
  });

  it("convertSwitch \\'", () => {
    expect(converter.convertSwitch("Java\'Script")).toBe("Java\\'Script");
    expect(converter.convertSwitch("Java\'Script").length).toBe(12);
  });

  it("convertSwitch \\\\", () => {
    expect(converter.convertSwitch("Java\\Script")).toBe("Java\\\\Script");
    expect(converter.convertSwitch("Java\\Script").length).toBe(12);
  });
});