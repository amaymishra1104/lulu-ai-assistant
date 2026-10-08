import { useState } from "react";
import axios from "axios";

import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5005/chat";

const QUICK_REPLIES = [
  "What are your return policies?",
  "How much is delivery?",
  "What is your refund process?",
  "Tell me about courier delivery",
];

const createMessage = (role, content, id = `${role}-${Date.now()}`) => ({
  id,
  role,
  content,
});

function App() {
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Welcome to Lulu Hypermarket AI Assistant. How can I help you today?"
    ),
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voiceLang, setVoiceLang] = useState("en-US");

  const sendMessage = async (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = createMessage("user", trimmedMessage);
    const typingMessageId = `typing-${Date.now()}`;

    setError("");
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      createMessage("assistant", "", typingMessageId),
    ]);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        message: trimmedMessage,
      });

      const answer = response?.data?.answer;

      setMessages((previousMessages) =>
        previousMessages.map((item) =>
          item.id === typingMessageId
            ? createMessage(
                "assistant",
                typeof answer === "string" && answer.trim()
                  ? answer
                  : "I could not generate a response for that request."
              )
            : item
        )
      );

      if (typeof answer === "string" && answer.trim()) {
        const speech = new SpeechSynthesisUtterance(answer);
        speech.lang = voiceLang;
        window.speechSynthesis.speak(speech);
      }
    } catch (requestError) {
      setMessages((previousMessages) =>
        previousMessages.map((item) =>
          item.id === typingMessageId
            ? createMessage(
                "assistant",
                "Sorry, I'm having trouble reaching the server right now. Please try again."
              )
            : item
        )
      );

      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Something went wrong while sending your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="chat-card">
        <header className="chat-header">
          <div className="chat-brand">
            <div className="chat-brand__badge" aria-hidden="true">
              🛒
            </div>
            <div>
              <p className="chat-eyebrow">Lulu Hypermarket</p>
              <h1>Lulu AI Assistant</h1>
            </div>
          </div>

          <div className="status-pill" aria-live="polite">
            <span className={`status-dot ${loading ? "status-dot--busy" : ""}`} />
            {loading ? "Thinking" : "Online"}
          </div>
        </header>

        <div className="chat-subheader">
          <p>
            Professional retail support for delivery, returns, refunds, and store policy questions.
          </p>
          <div style={{ marginTop: "12px", display: "flex", gap: "12px", alignItems: "center" }}>
            <button 
              onClick={() => window.speechSynthesis.cancel()} 
              className="quick-replies__chip"
              style={{ padding: "6px 12px", fontSize: "0.85rem" }}
            >
              🛑 Stop Voice
            </button>
            <select 
              value={voiceLang} 
              onChange={(e) => setVoiceLang(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: "12px", border: "1px solid var(--panel-border)", fontSize: "0.85rem", outline: "none" }}
            >
              <option value="en-US">English</option>
              <option value="ar-SA">Arabic</option>
              <option value="ml-IN">Malayalam</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>
        </div>

        <ChatWindow messages={messages} />

        {error ? <p className="error-banner">{error}</p> : null}

        <ChatInput
          onSend={sendMessage}
          isSending={loading}
          quickReplies={QUICK_REPLIES}
        />
      </main>
    </div>
  );
}

export default App;