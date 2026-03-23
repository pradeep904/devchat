import { useState, useRef, useEffect } from "react";
import { Send, Loader2, StopCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function InputBar({ onSend, isLoading, disabled, onStop }) {
  const { isDark } = useTheme();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isStopMode = Boolean(onStop);

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        p-4 border-t
        ${isDark ? "border-[#3e3e42] bg-[#1e1e1e]" : "border-gray-200 bg-white"}
      `}
    >
      <div
        className={`
        flex items-end gap-3 px-4 py-3 rounded-xl border
        transition-colors duration-200
        ${
          isDark
            ? "bg-[#2d2d30] border-[#3e3e42] focus-within:border-[#14b8a6]"
            : "bg-gray-50 border-gray-200 focus-within:border-teal-400"
        }
      `}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading || disabled}
          className={`
            flex-1 bg-transparent resize-none outline-none
            text-sm max-h-[120px] overflow-y-auto
            ${isDark ? "text-[#cccccc] placeholder-[#858585]" : "text-gray-700 placeholder-gray-400"}
          `}
        />
        <button
          type={isStopMode ? "button" : "submit"}
          onClick={() => isStopMode && onStop()}
          disabled={!isStopMode && (!message.trim() || isLoading || disabled)}
          className={`
            flex-shrink-0 p-2 rounded-lg transition-all duration-200
            ${
              isStopMode
                ? isDark
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-600 hover:bg-red-700"
                : message.trim() && !isLoading && !disabled
                  ? isDark
                    ? "bg-[#14b8a6] hover:bg-[#0d9488]"
                    : "bg-teal-500 hover:bg-teal-600"
                  : isDark
                    ? "bg-[#3e3e42] cursor-not-allowed"
                    : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          {isStopMode ? (
            <StopCircle className="w-5 h-5 text-white" />
          ) : isLoading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Send
              className={`w-5 h-5 ${message.trim() ? "text-white" : isDark ? "text-[#858585]" : "text-gray-400"}`}
            />
          )}
        </button>
      </div>
      <p
        className={`text-xs text-center mt-2 ${isDark ? "text-[#858585]" : "text-gray-400"}`}
      >
        {isStopMode
          ? "Click stop to cancel the reply"
          : "Press Enter to send, Shift+Enter for new line"}
      </p>
    </form>
  );
}
