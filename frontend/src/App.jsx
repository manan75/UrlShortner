import { useState } from "react";

import Result from "./components/Result";
import UrlForm from "./components/UrlForm";

function App() {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      
      <h1 className="text-3xl font-bold mb-6">
        URL Shortener 🚀
      </h1>

      <UrlForm setShortUrl={setShortUrl} />

      {shortUrl && <Result shortUrl={shortUrl} />}
    </div>
  );
}

export default App;