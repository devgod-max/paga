export default function AccountInfo({ user }) {
  const info = [
    { label: "Email", value: user.email, status: "Verified" },
    { label: "Name", value: user.name, status: "Set" },
  ];

  return (
    <section className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Account</h2>

      <div className="space-y-3">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-3 border border-gray-200 rounded-xl bg-white"
          >
            <span className="text-sm font-semibold text-black">
              {item.label}
            </span>
            <div className="text-right">
              <div className="text-sm text-emerald-500 font-medium">
                {item.value}
              </div>
              <div className="text-xs text-gray-400">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
