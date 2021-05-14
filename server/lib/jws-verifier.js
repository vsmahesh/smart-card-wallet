const jose = require("node-jose");
const jwsVerifier = {
  verify: (jws, jwks) => {
    return new Promise((resolve, reject) => {
      try {
        jose.JWK.asKey(jwks).then((publicKey) => {
          jose.JWS.createVerify(publicKey)
            .verify(jws)
            .then((result) => resolve({ success: true }))
            .catch((err) => resolve({ success: false, error: err }));
        });
      } catch (error) {
        resolve({ success: false, error: error });
      }
    });
  },
};
module.exports = jwsVerifier;
