import { useState, useEffect, useCallback } from "react";

const CHAT_HISTORY_KEY = "devchat-chat-history";

export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const saveChat = useCallback((chat) => {
    setChatHistory((prev) => {
      const existing = prev.findIndex((c) => c.id === chat.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = chat;
        return updated;
      }
      return [chat, ...prev];
    });
  }, []);

  const deleteChat = useCallback((chatId) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== chatId));
  }, []);

  const getChat = useCallback(
    (chatId) => {
      return chatHistory.find((c) => c.id === chatId);
    },
    [chatHistory],
  );

  return { chatHistory, saveChat, deleteChat, getChat };
}
