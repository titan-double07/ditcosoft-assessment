import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Signup Page</h1>
      <p className="text-gray-600">Click below to go to the Dashboard</p>

      <Link to="/admin">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
