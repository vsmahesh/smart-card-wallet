const jwsVerifier = require("./jws-verifier");
const jose = require("node-jose");
const zlib = require("zlib");
const fetch = require("cross-fetch");
const HealthCardVerifier = {
  parse: (healthcard) => {
    return new Promise((resolve, reject) => {
      try {
        const chunks = healthcard.split(".");
        const payload = chunks[1];
        const strData = jose.util.base64url.decode(payload);
        zlib.inflateRaw(strData, (err, result) => {
          resolve({
            payload: JSON.parse(result.toString("utf8")),
            header: JSON.parse(jose.util.base64url.decode(chunks[0])),
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  verify: (healthcard) => {
    return new Promise((resolve, reject) => {
      try {
        HealthCardVerifier.parse(healthcard).then((result) => {
          const jwksUrl = `${result.payload.iss}/.well-known/jwks.json`;
          const kid = result.header.kid;
          fetch(jwksUrl)
            .then((res) => {
              if (res.status >= 400) {
                throw new Error("Unable to download the key");
              }
              return res.json();
            })
            .then((jwks) => {
              jwk = jwks.keys.find((key) => key.kid == kid);
              if (!jwk) {
                throw new Error("Key not found in the isser's key set");
              }
              return jwk;
            })
            .then((jwk) => jwsVerifier.verify(healthcard, jwk))
            .then((result) => resolve(result))
            .catch((err) => {
              reject(err);
            });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
module.exports = HealthCardVerifier;
