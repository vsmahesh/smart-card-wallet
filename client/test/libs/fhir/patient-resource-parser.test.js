import { StaticData } from "../../helpers/static-data-helper";
import { PatientResourceParser } from "../../../src/js/libs/fhir/patient-resource-parser";
describe("Patient Resource Parser", () => {
  it("should parse a resource", () => {
    const parsedValue = PatientResourceParser.parse(StaticData.patientResource);
    expect(parsedValue.surName).toBe(
      StaticData.patientResource.resource.name[0].family
    );
    expect(parsedValue.givenName).toBe(
      StaticData.patientResource.resource.name[0].given.join(" ")
    );
    expect(parsedValue.dob).toBe(StaticData.patientResource.resource.birthDate);
    expect(parsedValue.sex).toBe(StaticData.patientResource.resource.gender);
  });
  it("should return empty when no given name", () => {
    const resource = StaticData.patientResource;
    delete resource.resource.name[0].given;
    const parsedValue = PatientResourceParser.parse(resource);
    expect(parsedValue.givenName).toBeUndefined();
  });
  it("should convert to single letter", () => {
    const resource = StaticData.patientResource;
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
