import { useEffect, useState } from "react";
import { getStats } from "../services/api";

const Result = ({ shortUrl }) => {
  const [stats, setStats] = useState(null);

  const code = shortUrl.split("/").pop();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats(code);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div className="mt-6 w-full max-w-xl">
      <div className="bg-green-50 border p-4 rounded-xl">
        <p className="text-sm text-gray-600">Short URL:</p>

        <div className="flex justify-between items-center">
          <a href={shortUrl} className="text-blue-600">
            {shortUrl}
          </a>

          <button
            onClick={copyToClipboard}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Copy
          </button>
        </div>
      </div>

      {stats && (
        <div className="mt-4 bg-white shadow rounded-xl p-4">
          <p><strong>Original:</strong> {stats.originalUrl}</p>
          <p><strong>Clicks:</strong> {stats.clicks}</p>
          <p><strong>Created:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(stats.expiresAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Result;