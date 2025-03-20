"use client";
import { useEffect, useRef, useState } from "react";
import UsernameInput from "./UsernameInput";
import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";
import { ChatConstants } from "../constants-variable/constants";

interface Message {
  user: string;
  text: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [typing, setTyping] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(true);
  const socketRef = useRef<WebSocket | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // ✅ Capitalize name and message when setting state
  const capitalize = (text: string) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    connectSocket();

    return () => {
      socketRef.current?.close();
    };
  }, []);

  // ✅ Reconnect on connection loss
  const connectSocket = () => {
    socketRef.current = new WebSocket("ws://localhost:4000");

    socketRef.current.onopen = () => {
      setConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === ChatConstants.MESSAGE) {
          setMessages((prev) => [...prev, data]);
        } else if (data.type === ChatConstants.TYPING) {
          setTyping(data.user);
          setTimeout(() => setTyping(null), 1000);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    socketRef.current.onclose = () => {
      setConnected(false);

      // ✅ Attempt to reconnect after 2 seconds
      setTimeout(() => {
        connectSocket();
      }, 2000);
    };
  };
  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };
  // ✅ Prevent sending empty messages or empty names
  const sendMessage = () => {
    if (input.trim() === "" || username.trim() === "") {
      notify(ChatConstants.USER_EMPTY);
      return;
    }

    const message = {
      type: ChatConstants.MESSAGE,
      user: capitalize(username),
      text: capitalize(input),
      timestamp: new Date().toLocaleTimeString(),
    };

    socketRef.current?.send(JSON.stringify(message));
    setInput("");
  };

  const handleTyping = () => {
    if (username.trim()) {
      socketRef.current?.send(
        JSON.stringify({
          type: ChatConstants.TYPING,
          user: capitalize(username),
        })
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl md:max-w-4xl h-[90vh] bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        {/* ✅ Show connection status */}
        {!connected && (
          <div className="bg-red-500 text-white text-center py-2">
            {ChatConstants.DISCONNECTED}
          </div>
        )}
        {connected && (
          <div className="bg-green-500 text-white text-center py-2">
            {ChatConstants.CONNECTED}
          </div>
        )}

        {/* Components */}
        <UsernameInput username={username} setUsername={setUsername} />
        <MessageDisplay
          messages={messages}
          typing={typing}
          username={capitalize(username)}
        />
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          handleTyping={handleTyping}
        />
        {/* ✅ Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
