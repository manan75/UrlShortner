const Result = ({ shortUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 w-full max-w-xl">
      <p className="text-sm text-gray-600">Your short URL:</p>

      <div className="flex justify-between items-center mt-2">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-medium"
        >
          {shortUrl}
        </a>

        <button
          onClick={copyToClipboard}
          className="ml-4 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Result;