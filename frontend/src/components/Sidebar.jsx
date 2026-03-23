import {
  Bot,
  Plus,
  MessageSquare,
  Trash2,
  Sun,
  Moon,
  Wifi,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function Sidebar({
  isOpen,
  onClose,
  chatHistory,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) {
  const { isDark, toggleDark } = useTheme();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col
        border-r
        ${
          isDark
            ? "bg-[#252526] border-[#3e3e42]"
            : "bg-gray-100 border-gray-200"
        }
      `}
      >
        {/* Logo */}
        <div
          className={`
          p-4 border-b flex items-center gap-3
          ${isDark ? "border-[#3e3e42]" : "border-gray-200"}
        `}
        >
          <div className="p-2 bg-[#14b8a6] rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span
            className={`font-semibold text-lg ${isDark ? "text-[#cccccc]" : "text-gray-800"}`}
          >
            DevChat AI
          </span>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={onNewChat}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${
                isDark
                  ? "bg-[#14b8a6] hover:bg-[#0d9488] text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }
            `}
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <h3
            className={`
            px-3 py-2 text-xs font-semibold uppercase
            ${isDark ? "text-[#858585]" : "text-gray-500"}
          `}
          >
            Chat History
          </h3>
          <div className="space-y-1">
            {chatHistory.length === 0 ? (
              <p
                className={`px-3 py-4 text-sm ${isDark ? "text-[#858585]" : "text-gray-400"}`}
              >
                No chats yet
              </p>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`
                    group flex items-center justify-between px-3 py-2 rounded-lg
                    cursor-pointer transition-colors duration-150
                    ${
                      currentChatId === chat.id
                        ? isDark
                          ? "bg-[#3e3e42]"
                          : "bg-gray-200"
                        : isDark
                          ? "hover:bg-[#2d2d30]"
                          : "hover:bg-gray-200"
                    }
                  `}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MessageSquare
                      className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-[#858585]" : "text-gray-400"}`}
                    />
                    <span
                      className={`text-sm truncate ${isDark ? "text-[#cccccc]" : "text-gray-700"}`}
                    >
                      {chat.title || "New Chat"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${isDark ? "text-[#858585]" : "text-gray-400"}`}
                    >
                      {formatDate(chat.date)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className={`
                        opacity-0 group-hover:opacity-100 p-1 rounded
                        transition-opacity duration-150
                        ${isDark ? "hover:bg-[#4e4e4e] text-[#858585]" : "hover:bg-gray-300 text-gray-500"}
                      `}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`
          p-3 border-t flex items-center justify-between
          ${isDark ? "border-[#3e3e42]" : "border-gray-200"}
        `}
        >
          <div
            className={`flex items-center gap-2 text-sm ${isDark ? "text-[#858585]" : "text-gray-500"}`}
          >
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </div>
          <button
            onClick={toggleDark}
            className={`
              p-2 rounded-lg transition-colors duration-200
              ${
                isDark
                  ? "hover:bg-[#3e3e42] text-[#cccccc]"
                  : "hover:bg-gray-200 text-gray-600"
              }
            `}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
