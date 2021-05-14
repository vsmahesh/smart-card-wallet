const express = require("express");
const HealthCardVerifier = require("../lib/health-card-verifier");
const router = express.Router();
const createError = require("http-errors");
router.post("/", function (req, res, next) {
  HealthCardVerifier.verify(req.body.healthcard)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      //console.log(err);
      next(createError(406, "Unable to verify the health card"));
    });
});

module.exports = router;
