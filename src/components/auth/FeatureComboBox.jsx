import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FeatureComboBox({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white shadow-md transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-semibold text-white/90 hover:text-white"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="mt-3 text-sm text-white/70 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}
