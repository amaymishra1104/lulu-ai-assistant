const retrieve = require("../rag/retriever");
const askGemini = require("./geminiService");

const {
  getHistory
} = require("./memoryService");

async function askWithRAG(
  question,
  userId = "default"
) {

  console.log("=== ENTERED RAG SERVICE ===");

  const results = await retrieve(question);

  console.log("Retrieved Chunks:", results.length);

  results.forEach((r, index) => {
    console.log(
      `${index + 1}. ${r.source} | Score: ${r.score}`
    );
  });

  const context = results
    .map(r => r.text)
    .join("\n\n");

  const history = getHistory(userId)
    .map(
      msg =>
        `${msg.role}: ${msg.content}`
    )
    .join("\n");

  console.log(
    "Context Length:",
    context.length
  );

  const prompt = `
SYSTEM ROLE:
You are Lulu Hypermarket's official AI Assistant.

RULES:
1. Answer naturally and professionally.
2. Use ONLY the provided context.
3. Use chat history if it helps understand the question.
4. Never invent information.
5. Never say "As an AI".
6. Never ask which company the user means.
7. Detect the user's language automatically.
8. Reply in the SAME language as the user.
9. If information is not available, reply in the user's language.
10. Keep responses concise and customer-friendly.

CHAT HISTORY:
${history}

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;

  console.log(
    "Prompt Length:",
    prompt.length
  );

  const answer =
    await askGemini(prompt);

  return answer;
}

module.exports = askWithRAG;