import { FHIRResources } from "../../helpers/static-data-helper";
import { PatientResourceParser } from "../../../src/js/libs/fhir/patient-resource-parser";
describe("Patient Resource Parser", () => {
  it("should parse a resource", () => {
    const parsedValue = PatientResourceParser.parse(
      FHIRResources.patientResource
    );
    expect(parsedValue.surName).toBe(
      FHIRResources.patientResource.resource.name[0].family
    );
    expect(parsedValue.givenName).toBe(
      FHIRResources.patientResource.resource.name[0].given.join(" ")
    );
    expect(parsedValue.dob).toBe(
      FHIRResources.patientResource.resource.birthDate
    );
    expect(parsedValue.sex).toBe(FHIRResources.patientResource.resource.gender);
  });
  it("should return empty when no given name", () => {
    const resource = FHIRResources.patientResource;
    delete resource.resource.name[0].given;
    const parsedValue = PatientResourceParser.parse(resource);
    expect(parsedValue.givenName).toBe("");
  });
  it("should convert to single letter", () => {
    const resource = FHIRResources.patientResource;
    [
      { value: "male", display: "M" },
      { value: "female", display: "F" },
    ].forEach((item) => {
      resource.resource.gender = item.value;
      const parsedValue = PatientResourceParser.parse(resource);
      expect(parsedValue.sex).toBe(item.display);
    });
  });
});
