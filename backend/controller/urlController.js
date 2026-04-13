const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");

// URL validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// POST /shorten
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // If custom code provided
    let shortCode = customCode;

    if (customCode) {
      const exists = await Url.findOne({ shortCode: customCode });
      if (exists) {
        return res.status(400).json({ error: "Custom code already taken" });
      }
    } else {
      // Check duplicate URL
      const existing = await Url.findOne({ originalUrl });
      if (existing) {
        return res.json({
          shortUrl: `http://localhost:5000/${existing.shortCode}`
        });
      }

      let exists = true;
      while (exists) {
        shortCode = generateCode();
        const url = await Url.findOne({ shortCode });
        if (!url) exists = false;
      }
    }

    // Expiry (7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await Url.create({
      shortCode,
      originalUrl,
      expiresAt
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

    // Expiry check
    if (url.expiresAt && url.expiresAt < new Date()) {
      return res.status(410).send("Link expired");
    }

    // Increment clicks
    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);

  } catch (err) {
    res.status(500).send("Server error");
  }
};

// GET /stats/:code
const getStats = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getStats
};