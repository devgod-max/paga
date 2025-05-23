import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FeatureComboBox({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-cyan-400 rounded-xl px-6 py-4 shadow-md transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-medium"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="mt-3 text-white text-sm leading-relaxed">{content}</div>
      )}
    </div>
  );
}
