import { useEffect, useRef, useState } from "react";

function ChatInput({ onSend, isSending, quickReplies = [] }) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (!textArea) {
      return;
    }

    textArea.style.height = "0px";
    textArea.style.height = `${Math.min(textArea.scrollHeight, 180)}px`;
  }, [message]);

  const handleSubmit = (event) => {
    event?.preventDefault();

    if (!message.trim() || isSending) {
      return;
    }

    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleQuickReply = (reply) => {
    if (isSending) {
      return;
    }

    onSend(reply);
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev) => prev + (prev ? " " : "") + transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-message">
        Type your message
      </label>

      {quickReplies.length > 0 ? (
        <div className="quick-replies" aria-label="Quick reply suggestions">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              className="quick-replies__chip"
              onClick={() => handleQuickReply(reply)}
              disabled={isSending}
            >
              {reply}
            </button>
          ))}
        </div>
      ) : null}

      <div className="chat-input__composer">
        <button
          type="button"
          onClick={toggleListening}
          className={`chat-input__voice ${isListening ? "listening" : ""}`}
          title="Voice Input"
          style={{
            background: isListening ? 'rgba(255, 94, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isListening ? '#ff8f8f' : '#9eb0c9'
          }}
        >
          🎤
        </button>
        <textarea
          id="chat-message"
          ref={textAreaRef}
          className="chat-input__field"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Lulu about delivery, refunds, returns, and more..."
          rows={1}
          autoComplete="off"
          disabled={isSending}
        />

        <button
          className="chat-input__button"
          type="submit"
          disabled={isSending || !message.trim()}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>

      <p className="chat-input__hint">Press Enter to send, Shift + Enter for a new line.</p>
    </form>
  );
}

export default ChatInput;