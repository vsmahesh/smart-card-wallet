import { ResourceTypes } from "./fhir-resource-types.js";
import { PatientResourceParser } from "./patient-resource-parser.js";

export const HealthCardTitleParser = Object.freeze({
  parse: (healthcard) => {
    let result = "Health";
    const types = healthcard?.vc?.type;
    if (types?.find((type) => type.endsWith("#immunization"))) {
      result = "Vaccination";
    } else if (types?.find((type) => type.endsWith("#laboratory"))) {
      result = "Laboratory";
    }

    const patientResource =
      healthcard?.vc?.credentialSubject?.fhirBundle?.entry.find(
        (entry) => entry.resource.resourceType == ResourceTypes.Patient
      );
    if (patientResource) {
      const patientName = PatientResourceParser.getName(patientResource);
      return { main: patientName, sub: `${result} Card` };
    } else {
      return { main: `${result} Card` };
    }
  },
});
