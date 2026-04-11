import { useState } from "react";
import { shortenUrl } from "../services/api";

const UrlForm = ({ setShortUrl }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;

    try {
      setLoading(true);
      const res = await shortenUrl({ originalUrl: url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Enter your URL</h2>

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Generating..." : "Shorten URL"}
      </button>
    </div>
  );
};

export default UrlForm;