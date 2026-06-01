import { useEffect, useRef, useState } from "react";

function ChatInput({ onSend, isSending }) {
  const [message, setMessage] = useState("");
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
    event.preventDefault();

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

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-message">
        Type your message
      </label>

      <div className="chat-input__composer">
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