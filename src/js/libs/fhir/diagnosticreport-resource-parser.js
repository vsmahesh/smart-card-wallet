import { ResourceTypes } from "./fhir-resource-types.js";
import { CodeParser } from "./code-parser.js";
export const DiagnosticReportParser = Object.freeze({
  parse: (diagnosticReport) => {
    const resultItems = [];
    diagnosticReport.result.forEach((result) => {
      let id = result.reference;
      if (id.startsWith("#")) {
        const resultResource = diagnosticReport.contained.find(
          (item) =>
            `#${item.id}` == id &&
            item.resourceType == ResourceTypes.Observation
        );
        if (resultResource) {
          resultItems.push({
            testName: CodeParser.parse(resultResource.code),
            value: resultResource.valueString,
            date: resultResource.effectiveDateTime,
          });
        }
      }
    });

    return { results: resultItems };
  },
});
