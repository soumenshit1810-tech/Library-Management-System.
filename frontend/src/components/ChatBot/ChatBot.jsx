import React, { useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";

const quickQuestions = [
  "What can I do here?",
  "How do I find books?",
  "How does cart work?",
  "What can admins do?",
];

const botReplies = [
  {
    keywords: ["book", "books", "find", "search", "discover", "all books"],
    answer:
      "You can browse the complete book collection from All Books, open any book to view details, and discover the latest titles from the home page.",
  },
  {
    keywords: ["cart", "buy", "order", "checkout"],
    answer:
      "After logging in, users can add books to the cart and place orders. Order details are available from the Profile section.",
  },
  {
    keywords: ["login", "register", "account", "profile"],
    answer:
      "Create an account with Register, then Login to unlock your cart, favourites, profile settings, and order history.",
  },
  {
    keywords: ["admin", "add", "update", "manage"],
    answer:
      "Admins can manage the library catalogue, add new books, update book details, and view all orders from the admin profile.",
  },
  {
    keywords: ["favourite", "favorite", "save"],
    answer:
      "Logged-in users can save books to favourites from book details, then revisit them from the Profile page.",
  },
  {
    keywords: ["about", "library", "system", "app"],
    answer:
      "StoryNest is a Library Management System built to help readers explore books and help admins manage books and orders in one place.",
  },
];

const getBotReply = (message) => {
  const lowerMessage = message.toLowerCase();
  const matchedReply = botReplies.find((reply) =>
    reply.keywords.some((keyword) => lowerMessage.includes(keyword))
  );

  return (
    matchedReply?.answer ||
    "I can help with information about books, login, cart, favourites, orders, profile, and admin features in this Library Management System."
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am your StoryNest assistant. Ask me about the library system, books, cart, profile, or admin features.",
    },
  ]);

  const sendMessage = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { sender: "user", text: trimmedMessage },
      { sender: "bot", text: getBotReply(trimmedMessage) },
    ]);
    setInput("");
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 text-white shadow-2xl">
          <div className="flex items-center justify-between bg-zinc-800 px-4 py-3">
            <div>
              <h2 className="text-base font-semibold">StoryNest Assistant</h2>
              <p className="text-xs text-zinc-400">Library system help</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-zinc-800 px-4 py-3">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 hover:border-blue-400 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 border-t border-zinc-800 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the library..."
              className="min-w-0 flex-1 rounded bg-zinc-800 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded bg-blue-500 text-white hover:bg-blue-600"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-xl transition-all hover:bg-blue-600"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>
    </div>
  );
};

export default ChatBot;
