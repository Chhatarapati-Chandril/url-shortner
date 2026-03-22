import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createShortUrl } from "../api/links";
import { BASE_URL } from "../utils/constants";
import {
  copyToClipboard,
  downloadCanvasImage,
  normalizeUrl,
  saveToHistory,
} from "../utils/helpers";

const Skeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
  </div>
);

export default function CreateShortUrl() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const qrRef = useRef(null);

  const handleCreate = async () => {
    if (!url.trim()) {
      setError("URL is required");
      return;
    }

    const formattedUrl = normalizeUrl(url);

    if (!formattedUrl) {
      setError("Invalid URL format");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await createShortUrl(formattedUrl);

      console.log("FULL RESPONSE:", res.data);

      const id = res.data.data.shortId;

      setShortId(id);

      console.log("SHORT ID:", id);

      saveToHistory(id, formattedUrl);
    } catch (err) {
      console.log("ERROR:", err);
      setError("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  const shortUrl = shortId ? `${BASE_URL}/${shortId}` : "";

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h2 className="text-base font-medium">Create Short URL</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) handleCreate();
        }}
        className="space-y-3"
      >
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
        >
          Generate
        </button>
      </form>

      {loading && <Skeleton />}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {shortId && (
        <div className="space-y-3 border-t pt-3">
          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-600 text-sm break-all"
          >
            {shortUrl}
          </a>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => copyToClipboard(shortUrl)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
            >
              Copy
            </button>

            <button
              onClick={() =>
                downloadCanvasImage(
                  qrRef.current.querySelector("canvas")
                )
              }
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
            >
              Download QR
            </button>
          </div>

          <div className="flex justify-center pt-2">
            <div ref={qrRef} className="p-3 border rounded-md">
              <QRCodeCanvas value={shortUrl} size={120} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}