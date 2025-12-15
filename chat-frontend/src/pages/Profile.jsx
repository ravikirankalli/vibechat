// src/pages/Profile.jsx
export default function Profile({ username }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl text-center">
        
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-bold text-white">
          {username?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">
          Profile
        </h2>

        <p className="text-gray-300 text-sm mb-4">
          Logged in as
        </p>

        <div className="bg-white/10 border border-white/20 rounded-xl py-3">
          <p className="text-lg font-semibold text-indigo-300">
            {username}
          </p>
        </div>
      </div>
    </div>
  );
}
