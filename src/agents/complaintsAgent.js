const agentFormatter = require("../services/agentFormatter");

async function complaintsAgent(message) {
  const structure = {
    agent: "Complaints & Feedback Agent",
    info: "Listens to customer feedback and routes complaints to the relevant department.",
    data: "Feedback Received"
  };

  const instructions = `
    Acknowledge the customer's complaint or feedback professionally and empathetically.
    Let them know that their feedback has been logged and a support representative will reach out to them if necessary.
    Do not make promises about specific compensation unless explicitly stated in policy.
  `;

  return await agentFormatter(structure, message, instructions);
}

module.exports = complaintsAgent;
