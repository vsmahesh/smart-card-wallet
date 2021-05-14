const TestConstants = require("../test/TestConstants");
const jwsVerifier = require("./jws-verifier");

describe("Verify JWS", () => {
  it("should succeed when verify with correct key", () => {
    return jwsVerifier
      .verify(TestConstants.ValidJWS, TestConstants.ValidJWK)
      .then((result) => expect(result.success).toBe(true));
  });
  it("should fail when the verify with incorrect key", () => {
    return jwsVerifier
      .verify(TestConstants.ValidJWS, TestConstants.DifferentJWK)
      .then((result) => {
        expect(result.success).toBe(false);
      });
  });
});
