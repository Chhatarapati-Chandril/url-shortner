import { useState } from "react";
import { getAnalytics } from "../api/links";
import ChartWrapper from "./ChartWrapper";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [shortId, setShortId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    if (!shortId.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await getAnalytics(shortId);
      setData(res.data.data);
    } catch {
      setError("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h2 className="text-base font-medium">Analytics</h2>

      <input
        type="text"
        placeholder="Enter shortId"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
        className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />

      <button
        onClick={fetchAnalytics}
        className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
      >
        Fetch
      </button>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {data && (
        <div className="space-y-6 border-t pt-4">
          <p className="text-sm text-gray-600">
            Total Clicks:{" "}
            <span className="font-medium text-black">
              {data.totalClicks}
            </span>
          </p>

          <ChartWrapper title="Device Stats">
            <div className="w-full h-64">
              <ResponsiveContainer>
                <BarChart data={data.deviceStats}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartWrapper>

          <ChartWrapper title="Country Stats">
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.countryStats}
                    dataKey="count"
                    nameKey="country"
                    outerRadius={80}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartWrapper>

          <ChartWrapper title="Daily Clicks">
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={data.dailyClicks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartWrapper>
        </div>
      )}
    </div>
  );
}