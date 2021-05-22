import * as faker from "faker";
import { StaticData } from "../helpers/static-data-helper";
import {
  HealthCardVerifier,
  HealthCardVerifierExceptions,
} from "../../src/js/libs/health-card-verifier";
describe("Health Card Verifier", () => {
  it("should throw when 'iss' is undefined", () => {
    return expect(() => HealthCardVerifier.verify(undefined)).toThrow(
      HealthCardVerifierExceptions.NoIssuer
    );
  });

  it("should throw if the iss is not a url", () => {
    return expect(() =>
      HealthCardVerifier.verify(faker.lorem.words(1), {})
    ).toThrow(HealthCardVerifierExceptions.InvalidIssuer);
  });

  it("should throw when 'kid' is not available or undefined", () => {
    return expect(() =>
      HealthCardVerifier.verify(StaticData.SHC.iss, undefined)
    ).toThrow(HealthCardVerifierExceptions.NoKid);
  });

  it("should throw if the iss url can not be reached", () => {
    const spy = jest.spyOn(window, "fetch");
    spy.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => undefined,
    });

    expect.assertions(1);
    return expect(
      HealthCardVerifier.verify(faker.internet.url(), faker.lorem.word(10))
    ).rejects.toThrowError(HealthCardVerifierExceptions.UnableToReachIssuer);
  });

  it("should try to fetch public key from designated path", () => {
    const spy = jest.spyOn(window, "fetch");
    spy.mockClear();
    expect.assertions(2);
    return HealthCardVerifier.verify(
      StaticData.SHC.iss,
      faker.lorem.word(10)
    ).catch((e) => {
      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0][0]).toBe(
        `${StaticData.SHC.iss}/.well-known/jwks.json`
      );
    });
  });

  it("should throw error when the kid is not found in issuer's jwks", () => {
    const spy = jest.spyOn(window, "fetch");
    spy.mockClear();
    spy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => StaticData.jwks,
    });

    expect.assertions(1);
    return expect(
      HealthCardVerifier.verify(faker.internet.url(), faker.lorem.word(10))
    ).rejects.toThrowError(HealthCardVerifierExceptions.KeyNotFound);
  });

  it("should return 'false' when the verification fails", () => {
    const spy = jest.spyOn(window, "fetch");
    spy.mockClear();
    spy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => StaticData.jwks,
    });

    window.JWSVerifier = { verify: jest.fn() };
    JWSVerifier.verify.mockClear();
    JWSVerifier.verify.mockReturnValueOnce(false);

    expect.assertions(3);

    return HealthCardVerifier.verify(
      StaticData.SHC.iss,
      StaticData.jwks.keys[1].kid,
      StaticData.JWS
    ).then((result) => {
      expect(result).toBe(false);
      expect(JWSVerifier.verify.mock.calls[0][0]).toBe(StaticData.JWS);
      expect(JWSVerifier.verify.mock.calls[0][1]).toBe(StaticData.jwks.keys[1]);
    });
  });
  it("should return 'true' when verification succeed", () => {
    const spy = jest.spyOn(window, "fetch");
    spy.mockClear();
    spy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => StaticData.jwks,
    });

    window.JWSVerifier = { verify: jest.fn() };
    JWSVerifier.verify.mockClear();
    JWSVerifier.verify.mockReturnValueOnce(true);

    expect.assertions(3);

    return HealthCardVerifier.verify(
      StaticData.SHC.iss,
      StaticData.jwks.keys[0].kid,
      StaticData.JWS
    ).then((result) => {
      expect(result).toBe(true);
      expect(JWSVerifier.verify.mock.calls[0][0]).toBe(StaticData.JWS);
      expect(JWSVerifier.verify.mock.calls[0][1]).toBe(StaticData.jwks.keys[0]);
    });
  });
});
