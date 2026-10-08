const askGemini = require("./geminiService");

async function formatAgentResponse(
  type,
  rawData,
  userQuery
) {

  const prompt = `
You are Lulu Hypermarket's AI Assistant.

Convert the provided ${type} information into a natural, professional and customer-friendly response.

Rules:
- Reply in the same language as the user.
- Be concise.
- Do not invent information.
- Present information clearly.

USER QUERY:
${userQuery}

DATA:
${rawData}

RESPONSE:
`;

  return await askGemini(prompt);
}

module.exports = formatAgentResponse;