const { ChromaClient } = require("chromadb");

const client = new ChromaClient();

async function getCollection() {

  try {

    const collection =
      await client.getCollection({
        name: "lulu-knowledge"
      });

    return collection;

  } catch {

    const collection =
      await client.createCollection({
        name: "lulu-knowledge"
      });

    return collection;
  }
}

module.exports = getCollection;