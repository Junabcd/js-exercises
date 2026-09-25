import { MonthChecker } from "./index.js";

describe("ch05-ex03", () => {
  it("Jan", () => {
    expect(MonthChecker.has31DaysIf("Jan")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Jan")).toBe(true);
  });

  it("Feb", () => {
    expect(MonthChecker.has31DaysIf("Feb")).toBe(false);
    expect(MonthChecker.has31DaysSwitch("Feb")).toBe(false);
  });

  it("Mar", () => {
    expect(MonthChecker.has31DaysIf("Mar")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Mar")).toBe(true);
  });

  it("Apr", () => {
    expect(MonthChecker.has31DaysIf("Apr")).toBe(false);
    expect(MonthChecker.has31DaysSwitch("Apr")).toBe(false);
  });

  it("May", () => {
    expect(MonthChecker.has31DaysIf("May")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("May")).toBe(true);
  });

  it("Jun", () => {
    expect(MonthChecker.has31DaysIf("Jun")).toBe(false);
    expect(MonthChecker.has31DaysSwitch("Jun")).toBe(false);
  });

  it("Jul", () => {
    expect(MonthChecker.has31DaysIf("Jul")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Jul")).toBe(true);
  });

  it("Aug", () => {
    expect(MonthChecker.has31DaysIf("Aug")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Aug")).toBe(true);
  });

  it("Sep", () => {
    expect(MonthChecker.has31DaysIf("Sep")).toBe(false);
    expect(MonthChecker.has31DaysSwitch("Sep")).toBe(false);
  });

  it("Oct", () => {
    expect(MonthChecker.has31DaysIf("Oct")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Oct")).toBe(true);
  });

  it("Nov", () => {
    expect(MonthChecker.has31DaysIf("Nov")).toBe(false);
    expect(MonthChecker.has31DaysSwitch("Nov")).toBe(false);
  });

  it("Dec", () => {
    expect(MonthChecker.has31DaysIf("Dec")).toBe(true);
    expect(MonthChecker.has31DaysSwitch("Dec")).toBe(true);
  });
});