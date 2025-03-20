import { FC } from "react";
import { ChatConstants } from "../constants-variable/constants";

interface Props {
  username: string;
  setUsername: (username: string) => void;
}

const UsernameInput: FC<Props> = ({ username, setUsername }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Capitalize first letter of the name
    const capitalized = e.target.value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setUsername(capitalized);
  };

  return (
    <div className="p-4 bg-[#128C7E] text-white">
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder={ChatConstants.ENTER_NAME}
        className="w-full p-3 rounded bg-[#075E54] placeholder-white outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default UsernameInput;
