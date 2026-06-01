const storeAgent = require("../agents/storeAgent");
const offersAgent = require("../agents/offersAgent");
const orderAgent = require("../agents/orderAgent");
const askWithRAG = require("./ragService");

async function routeMessage(
  message,
  userId = "default"
) {

  console.log("\n========================");
  console.log("USER QUERY:", message);

  const lower = message.toLowerCase();

  // STORE AGENT
  if (
    lower.includes("store") ||
    lower.includes("location") ||
    lower.includes("branch") ||
    lower.includes("nearest") ||
    lower.includes("dubai") ||
    lower.includes("abu dhabi") ||
    lower.includes("sharjah") ||
    lower.includes("ajman") ||
    lower.includes("al ain") ||
    lower.includes("doha") ||
    lower.includes("muscat") ||
    lower.includes("riyadh") ||
    lower.includes("jeddah") ||
    lower.includes("manama") ||
    lower.includes("kuwait") ||
    lower.includes("timing") ||
    lower.includes("timings") ||
    lower.includes("close") ||
    lower.includes("open") ||
    lower.includes("hours") ||
    lower.includes("near me") ||
    lower.includes("nearby")
  ) {

    console.log("ROUTE: STORE AGENT");

    return await storeAgent(message);
  }

  // OFFERS AGENT
  if (
    lower.includes("offer") ||
    lower.includes("offers") ||
    lower.includes("discount") ||
    lower.includes("deal") ||
    lower.includes("deals") ||
    lower.includes("promotion") ||
    lower.includes("sale")
  ) {

    console.log("ROUTE: OFFERS AGENT");

    return await offersAgent(message);
  }

  // ORDER AGENT
  if (
    lower.includes("track") ||
    lower.includes("order") ||
    lower.includes("shipment") ||
    lower.includes("delivery status") ||
    /ord\d+/i.test(message)
  ) {

    console.log("ROUTE: ORDER AGENT");

    return await orderAgent(message);
  }

  // FAQ RAG AGENT
  console.log("ROUTE: FAQ RAG");

  return await askWithRAG(
    message,
    userId
  );
}

module.exports = routeMessage;