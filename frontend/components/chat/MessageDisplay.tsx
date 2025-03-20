import { FC, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

interface Message {
  user: string;
  text: string;
  timestamp: string;
}

interface Props {
  messages: Message[];
  typing: string | null;
  username: string;
}

const MessageDisplay: FC<Props> = ({ messages, typing, username }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="h-[65vh] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 custom-scrollbar">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          user={msg.user}
          message={msg.text}
          isOwnMessage={msg.user === username}
          timestamp={msg.timestamp}
        />
      ))}

      {typing && (
        <div className="text-sm text-gray-500 italic">
          {typing} is typing...
        </div>
      )}

      {/* Auto-scroll reference */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageDisplay;
