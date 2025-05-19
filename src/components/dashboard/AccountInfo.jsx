// src/components/dashboard/AccountInfo.jsx
export default function AccountInfo({ user }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
        Account
      </h2>
      <div className="overflow-auto">
        <table className="w-full table-auto border border-white/30 text-sm">
          <thead>
            <tr className="bg-white/10">
              <th className="p-2 text-left">Setting</th>
              <th className="p-2 text-left">Value</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Email</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">✅ Verified</td>
            </tr>
            <tr>
              <td className="p-2">Name</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">✅ Set</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
