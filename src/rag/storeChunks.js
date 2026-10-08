const { pipeline } = require("@xenova/transformers");

const getCollection = require("./vectorStore");
const { loadDocuments, chunkText } =
  require("./chunker");

async function main() {

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const collection =
    await getCollection();

  const docs = loadDocuments();

  let idCounter = 1;

  for (const doc of docs) {

    const chunks =
      chunkText(doc.content);

    for (const chunk of chunks) {

      const embedding =
        await extractor(chunk, {
          pooling: "mean",
          normalize: true
        });

      await collection.add({

        ids: [
          String(idCounter++)
        ],

        embeddings: [
          Array.from(
            embedding.data
          )
        ],

        documents: [
          chunk
        ],

        metadatas: [
          {
            source:
              doc.source
          }
        ]

      });

    }

  }

  console.log(
    "All chunks stored."
  );
}

main();