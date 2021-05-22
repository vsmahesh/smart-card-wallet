import { HealthCardTitleParser } from "../../../src/js/libs/fhir/health-card-title-parser.js";
describe("Health Card Title Parser", () => {
  it("should return `Immunization Card` when types contain immunization", () => {
    const cardData = {
      iss: undefined,
      nbf: undefined,
      vc: {
        type: [
          "https://smarthealth.cards#health-card",
          "https://smarthealth.cards#immunization",
          "https://smarthealth.cards#covid19",
        ],
        credentialSubject: undefined,
      },
    };
    expect(HealthCardTitleParser.parse(cardData)).toBe("Vaccination Card");
  });
  it("should return `Laboratory Card` when types contain laboratory", () => {
    const cardData = {
      iss: undefined,
      nbf: undefined,
      vc: {
        type: [
          "https://smarthealth.cards#health-card",
          "https://smarthealth.cards#laboratory",
          "https://smarthealth.cards#covid19",
        ],
        credentialSubject: undefined,
      },
    };
    expect(HealthCardTitleParser.parse(cardData)).toBe("Laboratory Card");
  });
  it("should return `Health Card` when types do not contain either laboratory or immunization", () => {
    const cardData = {
      iss: undefined,
      nbf: undefined,
      vc: {
        type: [
          "https://smarthealth.cards#health-card",
          "https://smarthealth.cards#covid19",
        ],
        credentialSubject: undefined,
      },
    };
    expect(HealthCardTitleParser.parse(cardData)).toBe("Health Card");
  });
});
