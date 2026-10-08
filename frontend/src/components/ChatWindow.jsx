import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

function ChatWindow({
  messages
}) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <section className="chat-window" aria-label="Conversation">
      <div className="chat-window__inner">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </section>
  );
}

export default ChatWindow;