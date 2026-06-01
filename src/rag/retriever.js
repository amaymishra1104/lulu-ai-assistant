const fs = require("fs");
const { pipeline } = require("@xenova/transformers");

function cosineSimilarity(a, b) {

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {

    dot += a[i] * b[i];

    normA += a[i] * a[i];

    normB += b[i] * b[i];
  }

  return dot / (
    Math.sqrt(normA) *
    Math.sqrt(normB)
  );
}

async function retrieve(query) {

  const vectors = JSON.parse(
    fs.readFileSync(
      "./vector-db/vectors.json",
      "utf-8"
    )
  );

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const embedding = await extractor(
    query,
    {
      pooling: "mean",
      normalize: true
    }
  );

  const queryVector =
    Array.from(
      embedding.data
    );

  const scored = vectors.map(v => {

    return {
      ...v,
      score: cosineSimilarity(
        queryVector,
        v.embedding
      )
    };

  });

  scored.sort(
    (a, b) =>
      b.score - a.score
  );

  return scored
  .slice(0, 5)
  .map(item => ({
    source: item.source,
    text: item.text,
    score: item.score
  }));
}

module.exports = retrieve;