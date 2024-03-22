import { createContext, ReactNode, useContext, useState } from "react";
import Snackbar from "../Components/Snackbar";
import { v4 as uniqueId } from "uuid";
import { MessagesType } from "../types/MessageProviderInterfaces";

export const MessageContext = createContext<MessageContextProps>(
  {} as MessageContextProps
);

export interface MessageContextProps {
  createSuccessMessage: (text: string) => void;
  createErrorMessage: (text: string) => void;
}

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessagesType[]>([]);

  const createSuccessMessage = (text: string) => {
    const messageObject: MessagesType = {
      id: uniqueId(),
      text: text,
      status: "success",
    };
    setMessages((prevMessages) => [...prevMessages, messageObject]);
  };

  const clearSeenMessage = (id: string) => {
    setMessages((prevMessages) => {
      const newMessagesArray = prevMessages.filter(
        (message) => message.id !== id
      );
      return newMessagesArray;
    });
  };

  const createErrorMessage = (text: string) => {
    const messageObject: MessagesType = {
      id: uniqueId(),
      text: text,
      status: "error",
    };
    setMessages((prevMessages) => [...prevMessages, messageObject]);
  };

  const contextValue: MessageContextProps = {
    createSuccessMessage,
    createErrorMessage,
  };
  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      {messages.length > 0 && (
        <div>
          {messages.map((message, index) => (
            <Snackbar
              message={message}
              clearSeenMessage={clearSeenMessage}
              offset={index * 100}
            />
          ))}
        </div>
      )}
    </MessageContext.Provider>
  );
};

export const useMessageSettings = (): MessageContextProps => {
  return useContext(MessageContext);
};

export default MessageProvider;
