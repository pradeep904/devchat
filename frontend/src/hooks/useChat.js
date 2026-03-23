import { useState, useCallback, useRef } from "react";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/chat";

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(async (messages, onChunk) => {
    setIsLoading(true);
    setIsTyping(true);
    setTypingText("");

    // Clear any existing typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Typing animation - character by character
      if (onChunk && data.reply) {
        const replyText = data.reply;
        let currentIndex = 0;

        const typeChar = () => {
          if (currentIndex < replyText.length) {
            setTypingText(replyText.slice(0, currentIndex + 1));
            onChunk(replyText.slice(0, currentIndex + 1));
            currentIndex++;
            typingTimeoutRef.current = setTimeout(typeChar, 3); // Typing speed
          } else {
            setIsTyping(false);
          }
        };

        typeChar();
      }

      return data.reply;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return null;
      }
      console.error("Chat error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopReply = useCallback(() => {
    // Abort the fetch request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Stop the typing animation
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Reset states
    setIsLoading(false);
    setIsTyping(false);
  }, []);

  const clearTyping = useCallback(() => {
    setTypingText("");
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, []);

  return {
    sendMessage,
    stopReply,
    isLoading,
    typingText,
    isTyping,
    clearTyping,
  };
}
