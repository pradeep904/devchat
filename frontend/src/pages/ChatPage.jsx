import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, StopCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";
import { useChatHistory } from "../hooks/useChatHistory";
import { Sidebar } from "../components/Sidebar";
import { MessageBubble } from "../components/MessageBubble";
import { InputBar } from "../components/InputBar";
import { Suggestions } from "../components/Suggestions";
import { LoadingIndicator } from "../components/LoadingIndicator";

export function ChatPage() {
  const { isDark } = useTheme();
  const { sendMessage, stopReply, isLoading, isTyping, clearTyping } =
    useChat();
  const { chatHistory, saveChat, deleteChat, getChat } = useChatHistory();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentReply, setCurrentReply] = useState("");

  const messagesEndRef = useRef(null);
  const pendingReplyRef = useRef("");

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentReply]);

  // Load chat when selecting from history
  const handleSelectChat = useCallback(
    (chatId) => {
      const chat = getChat(chatId);
      if (chat) {
        setCurrentChatId(chatId);
        setMessages(chat.messages);
        setCurrentReply("");
        pendingReplyRef.current = "";
        clearTyping();
      }
      setSidebarOpen(false);
    },
    [getChat, clearTyping],
  );

  // Create new chat
  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setCurrentReply("");
    pendingReplyRef.current = "";
    clearTyping();
    setSidebarOpen(false);
  }, [clearTyping]);

  // Delete chat
  const handleDeleteChat = useCallback(
    (chatId) => {
      deleteChat(chatId);
      if (currentChatId === chatId) {
        handleNewChat();
      }
    },
    [deleteChat, currentChatId, handleNewChat],
  );

  // Stop reply
  const handleStopReply = useCallback(() => {
    stopReply();
    setCurrentReply("");
    pendingReplyRef.current = "";
  }, [stopReply]);

  // Send message
  const handleSendMessage = useCallback(
    async (text) => {
      const userMessage = {
        role: "user",
        content: text,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setCurrentReply("");
      pendingReplyRef.current = "";

      // Generate chat ID if not exists
      const chatId = currentChatId || `chat-${Date.now()}`;
      setCurrentChatId(chatId);

      try {
        const reply = await sendMessage(newMessages, (chunk) => {
          setCurrentReply(chunk);
          pendingReplyRef.current = chunk;
        });

        // Store reply for when typing completes
        pendingReplyRef.current = reply || "";
      } catch (error) {
        const errorMessage = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages([...newMessages, errorMessage]);
      }
    },
    [messages, currentChatId, sendMessage],
  );

  // When typing finishes, add the final message to chat
  useEffect(() => {
    if (!isTyping && pendingReplyRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user" && pendingReplyRef.current.trim()) {
        const aiMessage = {
          role: "assistant",
          content: pendingReplyRef.current,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        const finalMessages = [...messages, aiMessage];
        setMessages(finalMessages);
        setCurrentReply("");

        // Save to history
        const title =
          lastMessage.content.slice(0, 30) +
          (lastMessage.content.length > 30 ? "..." : "");
        const chatId = currentChatId || `chat-${Date.now()}`;
        saveChat({
          id: chatId,
          title,
          date: new Date().toISOString(),
          messages: finalMessages,
        });

        pendingReplyRef.current = "";
      }
    }
  }, [isTyping, messages, currentChatId, saveChat]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (prompt) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage],
  );

  return (
    <div className={`flex h-screen ${isDark ? "bg-[#1e1e1e]" : "bg-gray-50"}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header
          className={`
          md:hidden flex items-center gap-3 p-4 border-b
          ${isDark ? "border-[#3e3e42] bg-[#1e1e1e]" : "border-gray-200 bg-white"}
        `}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-[#2d2d30]" : "hover:bg-gray-100"}`}
          >
            <Menu className={isDark ? "text-[#cccccc]" : "text-gray-600"} />
          </button>
          <span
            className={`font-semibold ${isDark ? "text-[#cccccc]" : "text-gray-800"}`}
          >
            DevChat AI
          </span>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && !isLoading ? (
            <Suggestions onSelect={handleSuggestionClick} />
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg}
                  isTyping={
                    msg.role === "assistant" &&
                    index === messages.length - 1 &&
                    isTyping
                  }
                />
              ))}
              {/* Show loading indicator while waiting for API response */}
              {isLoading && !currentReply && <LoadingIndicator />}
              {/* Show typing animation while AI is generating response */}
              {currentReply && isTyping && (
                <MessageBubble
                  message={{ role: "assistant", content: currentReply }}
                  isTyping={true}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <InputBar
          onSend={handleSendMessage}
          isLoading={isLoading || isTyping}
          disabled={false}
          onStop={isTyping ? handleStopReply : null}
        />
      </main>
    </div>
  );
}
