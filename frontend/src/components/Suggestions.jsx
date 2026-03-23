import {
  Code2,
  Bug,
  Briefcase,
  Server,
  Palette,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const suggestions = [
  {
    icon: Code2,
    label: "Write Code",
    prompt: "Help me write a React component for a to-do list",
  },
  {
    icon: Bug,
    label: "Debug",
    prompt: "Help me debug this JavaScript error: undefined is not a function",
  },
  {
    icon: Briefcase,
    label: "Career",
    prompt: "What skills should I learn to become a frontend developer?",
  },
  {
    icon: Server,
    label: "Explain",
    prompt: "Explain how React hooks work in simple terms",
  },
  {
    icon: Palette,
    label: "Design",
    prompt: "How can I make my website look more modern with CSS?",
  },
  {
    icon: Zap,
    label: "Tips",
    prompt: "Give me 5 tips to improve my coding productivity",
  },
];

export function Suggestions({ onSelect }) {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center mb-8">
        <div
          className={`
          w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
          ${isDark ? "bg-[#2d2d30]" : "bg-gray-100"}
        `}
        >
          <Zap
            className={`w-8 h-8 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
          />
        </div>
        <h2
          className={`text-2xl font-semibold mb-2 ${isDark ? "text-[#cccccc]" : "text-gray-800"}`}
        >
          How can I help you today?
        </h2>
        <p className={`text-sm ${isDark ? "text-[#858585]" : "text-gray-500"}`}>
          Choose a suggestion or type your own message
        </p>
      </div>

      <div className="suggestions-grid w-full max-w-3xl">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.prompt)}
            className={`
              group flex items-center gap-3 p-4 rounded-xl border
              transition-all duration-200 text-left
              ${
                isDark
                  ? "bg-[#2d2d30] border-[#3e3e42] hover:border-[#14b8a6] hover:bg-[#3e3e42]"
                  : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-md"
              }
            `}
          >
            <div
              className={`
              p-2 rounded-lg
              ${isDark ? "bg-[#1e1e1e]" : "bg-gray-50"}
            `}
            >
              <item.icon
                className={`w-5 h-5 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
              />
            </div>
            <span
              className={`flex-1 font-medium ${isDark ? "text-[#cccccc]" : "text-gray-700"}`}
            >
              {item.label}
            </span>
            <ArrowRight
              className={`
              w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity
              ${isDark ? "text-[#14b8a6]" : "text-teal-500"}}
            `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
