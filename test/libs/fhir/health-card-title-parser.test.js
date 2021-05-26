import { HealthCardTitleParser } from "../../../src/js/libs/fhir/health-card-title-parser.js";
describe("Health Card Title Parser", () => {
  describe("when no patient details available", () => {
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
      expect(HealthCardTitleParser.parse(cardData).main).toBe(
        "Vaccination Card"
      );
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
      expect(HealthCardTitleParser.parse(cardData).main).toBe(
        "Laboratory Card"
      );
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
      expect(HealthCardTitleParser.parse(cardData).main).toBe("Health Card");
    });
  });

  describe("when patient details available", () => {
    const cardData = {
      iss: undefined,
      nbf: undefined,
      vc: {
        type: [
          "https://smarthealth.cards#health-card",
          "https://smarthealth.cards#immunization",
          "https://smarthealth.cards#covid19",
        ],
        credentialSubject: {
          fhirBundle: {
            resourceType: "Bundle",
            id: "988fad56-114b-4f1a-91a5-6cf2c171408d",
            type: "collection",
            entry: [
              {
                fullUrl: "urn:uuid:dad04b5d-7380-4992-b350-5da18b523086",
                resource: {
                  resourceType: "Patient",
                  name: [
                    {
                      text: "Zara Hunt",
                      family: "Hunt",
                      given: ["Zara"],
                    },
                  ],
                  gender: "female",
                  birthDate: "1999-03-20",
                },
              },
            ],
          },
        },
      },
    };
    const result = HealthCardTitleParser.parse(cardData);
    it("should set patient name as the main", () => {
      expect(result.main).toBe("Zara Hunt");
    });
    it("should set card type as sub", () => {
      expect(result.sub).toBe("Vaccination Card");
    });
  });
});
