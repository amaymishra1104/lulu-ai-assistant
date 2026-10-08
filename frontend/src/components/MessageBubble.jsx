function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Assistant is typing">
      <span />
      <span />
      <span />
    </span>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const isTyping = isAssistant && !content;
  const label = isUser ? "You" : "Lulu AI";

  return (
    <div className={`message-row ${isUser ? "message-row--user" : "message-row--assistant"}`}>
      {!isUser ? <div className="message-avatar" aria-hidden="true">L</div> : null}
      <article
        className={`message-bubble ${isUser ? "message-bubble--user" : "message-bubble--assistant"} ${isTyping ? "message-bubble--typing" : ""}`}
        aria-live={isTyping ? "polite" : undefined}
      >
        <div className="message-bubble__label">{label}</div>
        {isTyping ? <TypingDots /> : content}
      </article>
      {isUser ? <div className="message-avatar message-avatar--user" aria-hidden="true">Y</div> : null}
    </div>
  );
}

export default MessageBubble;