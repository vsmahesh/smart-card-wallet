export const HealthCardVerifier = Object.freeze({
  verify: (iss, kid, healthCardJWS) => {
    return new Promise((resolve, reject) => {
      if (!iss) {
        throw HealthCardVerifierExceptions.NoIssuer;
      }
      const RegEx_Url =
        /^(https?:\/\/)([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim;

      if (!RegEx_Url.test(iss)) {
        throw HealthCardVerifierExceptions.InvalidIssuer;
      }

      if (!kid) {
        throw HealthCardVerifierExceptions.NoKid;
      }

      return fetch(`${iss}/.well-known/jwks.json`)
        .then((response) => {
          if (!response.ok) {
            throw HealthCardVerifierExceptions.UnableToReachIssuer;
          }
          return response.json();
        })
        .then((jwks) => {
          const foundKey = jwks.keys.find((k) => k.kid == kid);
          if (!foundKey) {
            throw HealthCardVerifierExceptions.KeyNotFound;
          }
          return foundKey;
        })
        .then((publicKey) => JWSVerifier.verify(healthCardJWS, publicKey))
        .then((result) => resolve(result))
        .catch((e) => {
          reject(e);
        });
    });
  },
});

export const HealthCardVerifierExceptions = Object.freeze({
  NoIssuer: new Error("No Issuer"),
  InvalidIssuer: new Error("Invalid Issuer"),
  NoKid: new Error("No Key ID"),
  UnableToReachIssuer: new Error("Unable to reach the issuer"),
  KeyNotFound: new Error("Key not found in Issuer's portal"),
});
