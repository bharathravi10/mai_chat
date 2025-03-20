import { FC } from "react";

interface Props {
  user: string;
  message: string;
  isOwnMessage: boolean;
  timestamp: string;
}

const MessageBubble: FC<Props> = ({
  user,
  message,
  isOwnMessage,
  timestamp,
}) => (
  <div
    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
  >
    <div
      className={`rounded-lg p-3 max-w-[75%] shadow ${
        isOwnMessage
          ? "bg-[#DCF8C6] text-gray-900 rounded-br-none"
          : "bg-gray-200 text-gray-800 rounded-bl-none"
      }`}
    >
      <div
        className={`text-sm font-bold ${
          isOwnMessage ? "text-green-700" : "text-blue-600"
        }`}
      >
        {user}
      </div>
      <div className="mt-1 text-base">{message}</div>
      <div className="text-xs text-gray-500 mt-1 text-right">{timestamp}</div>
    </div>
  </div>
);

export default MessageBubble;
