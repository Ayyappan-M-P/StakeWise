"use client";

import { Button, Input } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ClearIcon from "@mui/icons-material/Clear";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
  ];

  interface ChatMessage {
    sender: string;
    message: string;
  }

  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Save and Load chatLog
  const saveChatLogToLocalStorage = (log: ChatMessage[]) => {
    localStorage.setItem("chatLog", JSON.stringify(log));
  };

  const loadChatLogFromLocalStorage = (): ChatMessage[] => {
    const storedChatLog = localStorage.getItem("chatLog");
    return storedChatLog ? JSON.parse(storedChatLog) : [];
  };

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedChatLog = loadChatLogFromLocalStorage();
    setChatLog(storedChatLog);
  }, []);

  useEffect(() => {
    if (chatLog.length > 0) saveChatLogToLocalStorage(chatLog);
  }, [chatLog]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatLog = [...chatLog, { sender: "user", message: userMessage }];
    setChatLog(newChatLog);
    setUserMessage("");
    setLoading(true);

    try {
      // Placeholder for the actual API call
      const responseText = "This is a mock response."; // Replace with API call result
      const updatedChatLog = [
        ...newChatLog,
        { sender: "bot", message: responseText },
      ];
      setChatLog(updatedChatLog);
      saveChatLogToLocalStorage(updatedChatLog);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorChatLog = [
        ...newChatLog,
        { sender: "bot", message: "Sorry, something went wrong." },
      ];
      setChatLog(errorChatLog);
      saveChatLogToLocalStorage(errorChatLog);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechInput = () => {
    console.log("Start speech-to-text conversion...");
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <Button
          className="bg-slate-200 w-16 h-16  flex items-center justify-center hover:bg-blue-50"
          onClick={toggleChat}
        >
          {isOpen ? <ClearIcon /> : <ModeCommentIcon />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-96 rounded-lg">
          <div className="bg-blue-800 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chatbot</h2>
            <select
              className="bg-blue-950 rounded-md px-2 py-2 text-sm w-52"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 h-96 ">
            {chatLog.length === 0 ? (
              <p className="text-white-500 text-center">
                No messages yet. Start a conversation!
              </p>
            ) : (
              chatLog.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-4 ${chat.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <p
                    className={`inline-block p-2 rounded-md ${
                      chat.sender === "user"
                        ? "bg-blue-600 "
                        : "bg-gray-700 "
                    }`}
                  >
                    {chat.message}
                  </p>
                </div>
              ))
            )}
            {loading && (
              <div className="text-gray-500 text-center">Bot is responding...</div>
            )}
          </div>

          <div className="p-4 bg-blue-600 flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-grow p-2 rounded bg-slate-100 "
            />

            <KeyboardVoiceIcon
              onClick={handleSpeechInput}
              className=" cursor-pointer hover:text-white-500"
            />

            <label className="cursor-pointer">
              <AttachmentIcon className=" hover:text-white-500" />
              <input type="file" className="hidden" onChange={handleFileInput} />
            </label>

            <Button
              onClick={handleSendMessage}
              className="bg-gray-100 text-black font-bold hover:bg-slate-100  p-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
