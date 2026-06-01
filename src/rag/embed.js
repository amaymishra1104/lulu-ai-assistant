const { pipeline } = require("@xenova/transformers");

async function testEmbedding() {

  console.log("Loading model...");

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  console.log("Model loaded.");

  const embedding = await extractor(
    "What is Lulu return policy?",
    {
      pooling: "mean",
      normalize: true
    }
  );

  console.log(
    "Dimensions:",
    embedding.data.length
  );

}

testEmbedding();