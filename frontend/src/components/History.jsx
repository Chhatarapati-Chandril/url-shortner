import { useEffect, useState } from "react";
import { getHistory } from "../utils/helpers";
import { BASE_URL } from "../utils/constants";

export default function History() {
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (!history.length) return null;

  const visibleHistory = showAll ? history : history.slice(0, 5);
  
  // console.log("HISTORY:", history);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h2 className="text-base font-medium">Recent Links</h2>

      <div className="space-y-3">
        {visibleHistory.map((item, index) => (
          <div key={index} className="text-sm space-y-1 border-t pt-2">
            <p className="truncate text-gray-600">{item.url}</p>

            <a
              href={`${BASE_URL}/${item.shortId}`}
              target="_blank"
              className="text-blue-600 break-all"
            >
              {BASE_URL}/{item.shortId}
            </a>
          </div>
        ))}
      </div>

      {history.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}