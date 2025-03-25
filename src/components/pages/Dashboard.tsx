import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
      <p className="text-gray-600">Welcome to your dashboard!</p>

      <Link to="/">
        <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Back to Signup
        </button>
      </Link>
    </div>
  );
}
