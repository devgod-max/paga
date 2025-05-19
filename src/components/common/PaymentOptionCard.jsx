export default function PaymentOptionCard({
  icon,
  label,
  title,
  description,
  onClick,
  bg = "bg-white",
  text = "text-blue-900",
}) {
  return (
    <div className="border border-white/30 p-8 rounded-xl bg-white/10 text-center hover:shadow-xl transition flex flex-col justify-between min-h-[250px]">
      <div className="text-4xl mb-3">{title}</div>
      <div>
        <div className="text-5xl mb-3">{icon}</div>
        <p className="text-lg font-medium">{description}</p>
      </div>
      <button
        onClick={onClick}
        className={`mt-6 w-full ${bg} ${text} font-semibold px-6 py-2 rounded-lg hover:brightness-110 transition`}
      >
        {label}
      </button>
    </div>
  );
}
