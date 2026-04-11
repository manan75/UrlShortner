const Url = require("../db/Url");
const generateCode = require("../utils/generateCode");

// POST /shorten
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Optional: check if already exists
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json({
        shortUrl: `http://localhost:5000/${existing.shortCode}`
      });
    }

    let shortCode;
    let exists = true;

    // Ensure unique code
    while (exists) {
      shortCode = generateCode();
      const url = await Url.findOne({ shortCode });
      if (!url) exists = false;
    }

    await Url.create({
      shortCode,
      originalUrl
    });
    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /:code
const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).send("Not found");
    }

    res.redirect(url.originalUrl);

  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  createShortUrl,
  redirectUrl
};