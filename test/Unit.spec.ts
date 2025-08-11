import {
  bitsToReadable,
  decimalToPercentage,
  numberWithCommas,
  timeToReadable,
} from "../src/Unit"; // 根据实际路径进行修改

describe("numberWithCommas", () => {
  test("should format number with commas correctly", () => {
    expect(numberWithCommas(1234)).toBe("1,234");
    expect(numberWithCommas(123456789)).toBe("123,456,789");
    expect(numberWithCommas("1234")).toBe("1,234");
    expect(numberWithCommas("abc")).toBe("0");
    expect(numberWithCommas(null as any)).toBe("0");
    expect(numberWithCommas(undefined as any)).toBe("0");
  });
});

describe("decimalToPercentage", () => {
  test("should convert decimal to percentage with correct decimals", () => {
    expect(decimalToPercentage(0.5)).toBe("50%");
    expect(decimalToPercentage(0.1234, 2)).toBe("12.34%");
    expect(decimalToPercentage(0.1234, 3)).toBe("12.34%");
    expect(decimalToPercentage(0.123456, 3)).toBe("12.346%");
    expect(decimalToPercentage("abc" as any)).toBe("0%");
    expect(decimalToPercentage(NaN)).toBe("0%");
    expect(decimalToPercentage(-0.12)).toBe("-12%");
  });
});

describe("bitsToReadable", () => {
  test("should convert bits to human-readable format", () => {
    expect(bitsToReadable(0)).toBe("0B");
    expect(bitsToReadable(1023)).toBe("1023B");
    expect(bitsToReadable(1024)).toBe("1KB");
    expect(bitsToReadable(1048576)).toBe("1MB");
    expect(bitsToReadable(1073741824)).toBe("1GB");
    expect(bitsToReadable(1099511627776)).toBe("1TB");
    expect(bitsToReadable(123456789)).toBe("117.74MB");
    expect(bitsToReadable(-1)).toBe("0B");
  });
});

describe("timeToReadable", () => {
  test("should convert seconds to HH:MM:SS format", () => {
    expect(timeToReadable(0)).toBe("00:00:00");
    expect(timeToReadable(3600)).toBe("01:00:00");
    expect(timeToReadable(3661)).toBe("01:01:01");
    expect(timeToReadable(12345)).toBe("03:25:45");
    expect(timeToReadable(60)).toBe("00:01:00");
    expect(timeToReadable(1)).toBe("00:00:01");
    expect(timeToReadable("abc" as any)).toBe("0");
    expect(timeToReadable(-1)).toBe("0");
  });
});
