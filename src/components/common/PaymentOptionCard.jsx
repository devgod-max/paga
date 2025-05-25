export default function PaymentOptionCard({
  iconSrc,
  label = "Pay",
  title,
  methodLabel,
  onClick,
  className = "",
}) {
  return (
    <div
      className={`group rounded-[32px] p-6 text-left flex flex-col justify-between transition-all duration-300 shadow-lg border border-white/10 bg-gradient-to-br from-[#1b1f2c] to-[#141925] hover:from-[#164e63] hover:to-[#1e3a8a] hover:border-cyan-500 ${className}`}
    >
      {/* Icon */}
      {iconSrc && (
        <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:from-cyan-300 group-hover:to-blue-400">
          <img src={iconSrc} alt={title} className="w-6 h-6" />
        </div>
      )}

      {/* Title and Method */}
      <div className="flex-grow mb-6">
        <h3 className="text-2xl font-black mb-2 text-white group-hover:text-white">
          {title}
        </h3>
        {methodLabel && (
          <span className="inline-block text-xs bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-full px-3 py-0.5 font-medium group-hover:from-cyan-300 group-hover:to-blue-400">
            {methodLabel}
          </span>
        )}
      </div>

      {/* Pay Button */}
      <button
        onClick={onClick}
        className="w-full rounded-full py-2 text-sm font-semibold border border-white text-white bg-transparent group-hover:bg-[#e0f2fe] group-hover:text-[#0c4a6e] transition-all duration-300"
      >
        {label}
      </button>
    </div>
  );
}
