export default function Profile({ username }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p>Username: <strong>{username}</strong></p>
      </div>
    </div>
  );
}
