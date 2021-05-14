const request = require("supertest");
const app = require("../app");
const TestConstants = require("../test/TestConstants");
describe("Verify Route", () => {
  it("successfully verifies a valid health card", () => {
    return request(app)
      .post("/verify")
      .send({ healthcard: TestConstants.JWS_RemoteKeyAvailable })
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("fails when issuer can not be reached", () => {
    return request(app)
      .post("/verify")
      .send({ healthcard: TestConstants.JWS_InvalidIssUrl })
      .expect(406);
  });
  it("fails when kid is no longer available in issuer's jwks", () => {
    return request(app)
      .post("/verify")
      .send({ healthcard: TestConstants.ValidJWS })
      .expect(406);
  });
});
