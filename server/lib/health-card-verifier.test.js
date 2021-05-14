const HealthCardVerifier = require("./health-card-verifier");
const TestConstants = require("../test/TestConstants");
describe("Health Card Verifier", () => {
  it("should be able to parse the payload ", () => {
    return HealthCardVerifier.parse(TestConstants.ValidJWS).then((result) => {
      expect(result.payload.iss).toBe(
        "https://smarthealth.cards/examples/issuer"
      );
      expect(result.header.kid).toBe(TestConstants.ValidJWK.kid);
    });
  });
});
