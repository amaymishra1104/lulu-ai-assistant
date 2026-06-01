const offers =
  require("../../knowledge/offers.json");

const formatAgentResponse =
  require("../services/agentFormatter");

async function offersAgent(query) {

  const search = query.toLowerCase();

  let filteredOffers = offers;

  if (search.includes("electronics")) {

    filteredOffers =
      offers.filter(
        offer =>
          offer.category ===
          "Electronics"
      );
  }

  if (search.includes("fashion")) {

    filteredOffers =
      offers.filter(
        offer =>
          offer.category ===
          "Fashion"
      );
  }

  if (
    filteredOffers.length === 0
  ) {

    return "No offers found.";
  }

  const rawData = JSON.stringify(
    filteredOffers,
    null,
    2
  );

  return await formatAgentResponse(
    "offers",
    rawData,
    query
  );
}

module.exports = offersAgent;