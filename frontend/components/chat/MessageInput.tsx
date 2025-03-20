import { FC } from "react";
import { ChatConstants } from "../constants-variable/constants";

interface Props {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  handleTyping: () => void;
}

const MessageInput: FC<Props> = ({
  input,
  setInput,
  sendMessage,
  handleTyping,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Capitalize first letter of each word
    const capitalized = e.target.value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setInput(capitalized);
    handleTyping();
  };

  return (
    <div className="p-4 flex gap-2 bg-white dark:bg-gray-800 border-t">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={ChatConstants.TYPE_PLACEHOLDER}
        className="flex-1 p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition shadow"
      >
        {ChatConstants.SEND}
      </button>
    </div>
  );
};

export default MessageInput;
