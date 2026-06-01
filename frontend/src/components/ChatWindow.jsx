import MessageBubble from "./MessageBubble";

function ChatWindow({
  messages
}) {

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
      </div>
    </section>
  );
}

export default ChatWindow;