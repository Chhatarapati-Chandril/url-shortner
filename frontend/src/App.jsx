import CreateShortUrl from "./components/CreateShortUrl";
import Analytics from "./components/Analytics";
import History from "./components/History";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-semibold text-center">
          URL Shortener
        </h1>

        <CreateShortUrl />
        <Analytics />
        <History />
      </div>
    </div>
  );
}