import { DiagnosticReportParser } from "../../../src/js/libs/fhir/diagnosticreport-resource-parser";
import { FHIRResources } from "../../helpers/static-data-helper";

describe("diagnostic report parser", () => {
  describe("when parsing a resource with contained result correctly", () => {
    const diagnosticReport = FHIRResources.containedDiagnosticReport.resource;
    const parsedResource = DiagnosticReportParser.parse(diagnosticReport);
    const result = parsedResource.results[0];
    test("result should have all the test results", () => {
      return expect(parsedResource.results.length).toBe(1);
    });
    test("result should have correct test name", () => {
      return expect(result.testName).toBe(
        diagnosticReport.contained[0].code.text
      );
    });
    test("result should have correct value", () => {
      return expect(result.value).toBe(
        diagnosticReport.contained[0].valueString
      );
    });
    test("result should have a date", () => {
      return expect(result.date).toBe(
        diagnosticReport.contained[0].effectiveDateTime
      );
    });
  });

  describe("when parsing a resource where results are part of the same bundle", () => {});
});
