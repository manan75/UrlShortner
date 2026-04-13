const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getStats
} = require("../controller/urlController");

router.post("/shorten", createShortUrl);
router.get("/stats/:code", getStats);
router.get("/:code", redirectUrl);

module.exports = router;