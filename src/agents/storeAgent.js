const stores = require("../../knowledge/stores.json");
const formatAgentResponse =
  require("../services/agentFormatter");

async function storeAgent(query) {

  const search = query.toLowerCase();

  // NEAR ME QUERIES
  if (
    search.includes("near me") ||
    search.includes("nearby")
  ) {

    return `
To find the nearest Lulu store, please tell me your city or country.

Examples:
• Dubai
• Abu Dhabi
• Doha
• Riyadh
• Muscat
`;
  }

  // TIMING QUERIES WITHOUT CITY
  if (
    (search.includes("timing") ||
     search.includes("timings") ||
     search.includes("hours") ||
     search.includes("open") ||
     search.includes("close"))
    &&
    !search.includes("dubai") &&
    !search.includes("abu dhabi") &&
    !search.includes("sharjah") &&
    !search.includes("ajman") &&
    !search.includes("al ain") &&
    !search.includes("doha") &&
    !search.includes("muscat") &&
    !search.includes("riyadh") &&
    !search.includes("jeddah") &&
    !search.includes("manama") &&
    !search.includes("kuwait")
  ) {

    return `
Please tell me which city's Lulu store timings you need.

Available cities:
• Dubai
• Abu Dhabi
• Sharjah
• Ajman
• Al Ain
• Doha
• Muscat
• Riyadh
• Jeddah
• Manama
• Kuwait
`;
  }

  const results = stores.filter(store =>
    store.city.toLowerCase().includes(search) ||
    store.country.toLowerCase().includes(search) ||
    search.includes(store.city.toLowerCase()) ||
    search.includes(store.country.toLowerCase())
  );

  if (results.length === 0) {

    return `
I can help you find Lulu stores.

Available cities:
• Dubai
• Abu Dhabi
• Sharjah
• Ajman
• Al Ain
• Doha
• Muscat
• Riyadh
• Jeddah
• Manama
• Kuwait

Please tell me your city.
`;
  }

  const rawData = JSON.stringify(
    results,
    null,
    2
  );

  return await formatAgentResponse(
    "store information",
    rawData,
    query
  );
}

module.exports = storeAgent;