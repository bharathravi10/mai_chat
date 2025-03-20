"use client";
import * as Toast from "@radix-ui/react-toast";
import { FC, useState } from "react";

const Notification: FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const notify = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <>
      <Toast.Provider>
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="bg-red-500 text-white px-4 py-3 rounded-md shadow-md"
        >
          <Toast.Title className="font-bold">Error</Toast.Title>
          <Toast.Description>{message}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 w-64" />
      </Toast.Provider>

      {/* ✅ Expose notify globally */}
      {typeof window !== "undefined" && (window as any).notify === undefined
        ? ((window as any).notify = notify)
        : null}
    </>
  );
};

export default Notification;
