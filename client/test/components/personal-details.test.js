import { TagNames } from "../../src/js/components/tagnames";
import { PersonalDetailsComponentFactory } from "../../src/js/components/personal-details";
import { StaticData } from "../helpers/static-data-helper";
import { PersonalDetailsModel } from "../../src/js/models/personal-detail-model";
describe("Personal Details Component", () => {
  beforeAll(() => {
    PersonalDetailsComponentFactory.register();
  });
  let component = undefined;
  beforeEach(() => {
    component = document.createElement(TagNames.personalDetails);
  });
  afterEach(() => {
    component = undefined;
  });

  it("should accept personal details and render the UI", () => {
    const surName = StaticData.patientResource.resource.name[0].surName;
    const givenName =
      StaticData.patientResource.resource.name[0].given.join(" ");
    const dob = StaticData.patientResource.resource.birthDate;
    const sex = StaticData.patientResource.resource.gender;
    component.setDetails(
      new PersonalDetailsModel(surName, givenName, dob, sex)
    );
    const outerHTML = component.outerHTML;
    expect(outerHTML).toContain(surName);
    expect(outerHTML).toContain(givenName);
    expect(outerHTML).toContain(dob);
    expect(outerHTML).toContain("M");
  });

  it("should add a css class 'verified' when verifiedOn is defined", () => {
    const surName = StaticData.patientResource.resource.name[0].surName;
    const givenName =
      StaticData.patientResource.resource.name[0].given.join(" ");
    const dob = StaticData.patientResource.resource.birthDate;
    const sex = StaticData.patientResource.resource.gender;
    component.setDetails(
      new PersonalDetailsModel(surName, givenName, dob, sex),
      "some value"
    );
    const outerHTML = component.outerHTML;
    expect(outerHTML).toContain(`class="personal-details verified"`);
  });
  it("should have the css class 'rejected' when verifiedOn is undefined", () => {
    const surName = StaticData.patientResource.resource.name[0].surName;
    const givenName =
      StaticData.patientResource.resource.name[0].given.join(" ");
    const dob = StaticData.patientResource.resource.birthDate;
    const sex = StaticData.patientResource.resource.gender;
    component.setDetails(
      new PersonalDetailsModel(surName, givenName, dob, sex),
      undefined
    );
    const outerHTML = component.outerHTML;
    expect(outerHTML).toContain(`class="personal-details rejected"`);
  });
});
