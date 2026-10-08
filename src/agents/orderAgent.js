const orders =
  require("../../knowledge/orders.json");

const formatAgentResponse =
  require("../services/agentFormatter");

async function orderAgent(query) {

  const match =
    query.match(/ORD\d+/i);

  if (!match) {

    return `
Please provide a valid Order ID.

Example:
Track ORD124
`;
  }

  const orderId =
    match[0].toUpperCase();

  const order =
    orders[orderId];

  if (!order) {

    return `
Order ${orderId} not found.
`;
  }

  const rawData = JSON.stringify(
    {
      orderId,
      ...order
    },
    null,
    2
  );

  return await formatAgentResponse(
    "order tracking",
    rawData,
    query
  );
}

module.exports = orderAgent;