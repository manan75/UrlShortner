const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl
} = require("../controller/urlController");

router.post("/shorten", createShortUrl);
router.get("/:code", redirectUrl);

module.exports = router;