import { Bot } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function LoadingIndicator() {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-3 mb-4">
      <div
        className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center animate-pulse
        ${isDark ? "bg-[#2d2d30]" : "bg-gray-200"}
      `}
      >
        <Bot
          className={`w-5 h-5 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
        />
      </div>
      <div
        className={`
        flex items-center gap-2 px-4 py-3 rounded-2xl rounded-tl-sm
        ${isDark ? "bg-[#2d2d30]" : "bg-white shadow-md"}
      `}
      >
        <span
          className={`w-2 h-2 rounded-full animate-ping ${isDark ? "bg-[#4ec9b0]" : "bg-teal-500"}`}
          style={{ animationDelay: "0ms" }}
        />
        <span
          className={`w-2 h-2 rounded-full animate-ping ${isDark ? "bg-[#4ec9b0]" : "bg-teal-500"}`}
          style={{ animationDelay: "100ms" }}
        />
        <span
          className={`w-2 h-2 rounded-full animate-ping ${isDark ? "bg-[#4ec9b0]" : "bg-teal-500"}`}
          style={{ animationDelay: "200ms" }}
        />
        <span
          className={`text-sm ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          thinking...
        </span>
      </div>
    </div>
  );
}
