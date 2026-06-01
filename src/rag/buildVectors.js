const fs = require("fs");
const { pipeline } = require("@xenova/transformers");
const { loadDocuments, chunkText } = require("./chunker");

async function main() {

  console.log("Loading embedding model...");

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const docs = loadDocuments();

  const vectors = [];

  let id = 1;

  for (const doc of docs) {

    const chunks = chunkText(doc.content);

    for (const chunk of chunks) {

      console.log(`Embedding chunk ${id}`);

      const embedding = await extractor(
        chunk,
        {
          pooling: "mean",
          normalize: true
        }
      );

      vectors.push({
        id,
        source: doc.source,
        text: chunk,
        embedding: Array.from(
          embedding.data
        )
      });

      id++;
    }
  }

  fs.writeFileSync(
    "./vector-db/vectors.json",
    JSON.stringify(vectors)
  );

  console.log(
    `Stored ${vectors.length} vectors`
  );
}

main();