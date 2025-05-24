export default function PaymentOptionCard({
  iconSrc,
  label,
  title,
  methodLabel,
  onClick,
  className = "",
}) {
  return (
    <div
      className={`group rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300 shadow-md border bg-white border-black hover:bg-gradient-to-br hover:from-cyan-100 hover:to-blue-100 hover:border-cyan-400 ${className}`}
    >
      {iconSrc && (
        <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:from-cyan-600 group-hover:to-blue-600 transition">
          <img src={iconSrc} alt={title} className="w-6 h-6" />
        </div>
      )}

      <div className="flex-grow mb-6">
        <h3 className="text-xl font-black mb-2 text-black group-hover:text-blue-800 transition">
          {title}
        </h3>
        {methodLabel && (
          <span className="inline-block text-xs bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-full px-3 py-0.5 font-medium group-hover:from-cyan-500 group-hover:to-blue-600">
            {methodLabel}
          </span>
        )}
      </div>

      <button
        onClick={onClick}
        className="w-full rounded-full py-2 text-sm font-semibold border border-black text-black bg-transparent hover:bg-blue-500 hover:text-white transition"
      >
        {label}
      </button>
    </div>
  );
}
