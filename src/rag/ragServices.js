const retrieve = require("../rag/retriever");
const askGemini = require("./geminiService");

async function askWithRAG(question) {

  const results = await retrieve(question);

  const context = results
    .map((r) => r.text)
    .join("\n\n");

  const prompt = `
You are Lulu Hypermarket AI Assistant.

Rules:
- Answer ONLY using the provided context.
- Do not make up information.
- If the answer is not in the context, say:
  "I couldn't find that information in Lulu's knowledge base."
- Reply in the user's language.

CONTEXT:
${context}

QUESTION:
${question}
`;

  const answer = await askGemini(prompt);

  return answer;
}

module.exports = askWithRAG;
