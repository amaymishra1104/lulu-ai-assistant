const retrieve = require("./retriever");

async function test() {

  const results =
    await retrieve(
      "What is the refund policy?"
    );

  results.forEach((r, index) => {

    console.log(
      `${index + 1}. ${r.source}`
    );

    console.log(
      `Score: ${r.score}`
    );

    console.log(
      r.text.substring(0, 200)
    );

    console.log("------------");

  });

}

test();