import { StaticData } from "../helpers/static-data-helper";
import { JWSHelper } from "../../src/js/libs/jws-helper";
import { ZlibHelper } from "../helpers/zlib-helper";
describe("JWS Helper", () => {
  test.skip("decodes and deflate a jws string", () => {
    const helper = new JWSHelper();
    const healthCard = helper.decode(StaticData.JWS);
    expect(healthCard.iss).toBe(StaticData.SHC.iss);
    expect(healthCard.nbf).toBe(StaticData.SHC.nbf);
    expect(healthCard.vc.type).toContain(StaticData.SHC.type);
    expect(healthCard.vc.credentialSubject.fhirBundle.resourceType).toBe(
      StaticData.SHC.resourceType
    );
  });

  test.skip("fails when bad jws provided", () => {
    const helper = new JWSHelper(ZlibHelper.inflateFn);
    expect(() => helper.decode(undefined)).toThrow();
    expect(() => helper.decode("a.b.c")).toThrow();
    expect(() => helper.decode("abc")).toThrow();
  });
});
