import { useState } from "react";
import { shortenUrl } from "../services/api";

const UrlForm = ({ setShortUrl }) => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url) {
      setError("URL is required");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await shortenUrl({
        originalUrl: url,
        customCode: customCode || undefined
      });

      setShortUrl(res.data.shortUrl);

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Shorten your URL</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border p-3 rounded-lg mb-3"
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        className="w-full border p-3 rounded-lg mb-3"
      />

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Shorten"}
      </button>
    </div>
  );
};

export default UrlForm;