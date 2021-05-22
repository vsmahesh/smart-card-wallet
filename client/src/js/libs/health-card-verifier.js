export const HealthCardVerifier = Object.freeze({
  verify: (iss, kid, healthCardJWS) => {
    if (!iss) {
      throw new Error(HealthCardVerifierExceptions.NoIssuer);
    }
    const RegEx_Url =
      /^(https?:\/\/)([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim;

    if (!RegEx_Url.test(iss)) {
      throw new Error(HealthCardVerifierExceptions.InvalidIssuer);
    }

    if (!kid) {
      throw new Error(HealthCardVerifierExceptions.NoKid);
    }

    return fetch(`${iss}/.well-known/jwks.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(HealthCardVerifierExceptions.UnableToReachIssuer);
        }
        return response.json();
      })
      .then((jwks) => {
        const foundKey = jwks.keys.find((k) => k.kid == kid);
        if (!foundKey) {
          throw new Error(HealthCardVerifierExceptions.KeyNotFound);
        }
        return foundKey;
      })
      .then((publicKey) => JWSVerifier.verify(healthCardJWS, publicKey))
      .catch((e) => {
        throw e;
      });
  },
});

export const HealthCardVerifierExceptions = Object.freeze({
  NoIssuer: "No Issuer",
  InvalidIssuer: "Invalid Issuer",
  NoKid: "No Key ID",
  UnableToReachIssuer: "Unable to reach the issuer",
  KeyNotFound: "Key not found in Issuer's portal",
});
