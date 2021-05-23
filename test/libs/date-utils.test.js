import { DateUtils } from "../../src/js/libs/date-utils";
describe("Date Utils", () => {
  test("convert to locale string should have both date and time", () => {
    const date = new Date();
    const result = DateUtils.toLocaleDateTimeString(date);
    expect(result).toBe(
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    );
  });
});
