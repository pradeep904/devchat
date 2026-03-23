import { useState } from "react";
import { Copy, Check, Bot, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function MessageBubble({ message, isTyping }) {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${
          isUser
            ? isDark
              ? "bg-[#0d9488]"
              : "bg-teal-500"
            : isDark
              ? "bg-[#2d2d30]"
              : "bg-gray-200"
        }
      `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot
            className={`w-5 h-5 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
          />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}
      >
        <div
          className={`
          group relative px-4 py-3 rounded-2xl
          ${
            isUser
              ? isDark
                ? "bg-[#0d9488]"
                : "bg-teal-500"
              : isDark
                ? "bg-[#2d2d30]"
                : "bg-white shadow-md"
          }
          ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}
        `}
        >
          <p
            className={`text-sm whitespace-pre-wrap ${isUser ? "text-white" : isDark ? "text-[#cccccc]" : "text-gray-800"}`}
          >
            {message.content}
            {isTyping && (
              <span className="inline-block w-2 h-4 ml-1 bg-[#4ec9b0] animate-pulse" />
            )}
          </p>

          {/* Copy Button - shows on hover */}
          <button
            onClick={handleCopy}
            className={`
              absolute top-2 opacity-0 group-hover:opacity-100 
              transition-opacity duration-200 p-1 rounded
              ${
                isUser
                  ? "right-2 hover:bg-[#0f766e]"
                  : isDark
                    ? "right-2 hover:bg-[#3e3e42]"
                    : "hover:bg-gray-100"
              }
            `}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy
                className={`w-4 h-4 ${isUser ? "text-white/70" : isDark ? "text-[#858585]" : "text-gray-400"}`}
              />
            )}
          </button>
        </div>

        <span
          className={`text-xs mt-1 ${isDark ? "text-[#858585]" : "text-gray-400"}`}
        >
          {message.timestamp || ""}
        </span>
      </div>
    </div>
  );
}
