import { CodeParser } from "../../../src/js/libs/fhir/code-parser";

describe("Code Parser", () => {
  it("returns the text of Code when available", () => {
    const code = {
      coding: [
        {
          system:
            "https://fhir.chbase.com/fhir/stu3/ValueSet/Lab-Test-Results/AHSLabTestResults",
          version: "2017-02-23",
          code: "XAB2004452-2",
          display: "Covid-19 Test",
        },
      ],
      text: "COVID-19 Test",
    };
    expect(CodeParser.parse(code)).toBe(code.text);
  });
  it("returns the display of coding when available", () => {
    const code = {
      coding: [
        {
          system:
            "https://fhir.chbase.com/fhir/stu3/ValueSet/wc/chbase-datatypes",
          version: "1",
          code: "labtestresult",
          display: "Lab Test Result",
        },
      ],
    };
    expect(CodeParser.parse(code)).toBe(code.coding[0].display);
  });
  it("returns a concatinated code", () => {
    const code = {
      coding: [
        {
          system:
            "https://fhir.chbase.com/fhir/stu3/ValueSet/Lab-Test-Results/AHSLabTestResults",
          version: "2017-02-23",
          code: "XAB2004452-2",
        },
      ],
    };
    expect(CodeParser.parse(code)).toBe(
      `${code.coding[0].code} (${code.coding[0].system})`
    );
  });
});
