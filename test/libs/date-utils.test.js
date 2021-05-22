import { DateUtils } from "../../src/js/libs/date-utils";
describe("Date Utils", () => {
  test("can create", () => {
    expect(new DateUtils()).toBeDefined();
  });
  test("convert to locale string should have both date and time", () => {
    const dateUtils = new DateUtils();
    const date = new Date();
    const result = dateUtils.toLocaleDateTimeString(date);
    expect(result).toBe(
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    );
  });
});
