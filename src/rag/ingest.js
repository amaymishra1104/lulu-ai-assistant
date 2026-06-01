const fs = require("fs");
const path = require("path");

const folderPath = "./knowledge/website";

function loadDocuments() {

  const files = fs.readdirSync(folderPath);

  let documents = [];

  for (const file of files) {

    const fullPath = path.join(folderPath, file);

    const content = fs.readFileSync(
      fullPath,
      "utf-8"
    );

    documents.push({
      file,
      content
    });

  }

  return documents;
}

function chunkText(text, chunkSize = 1000) {

  const chunks = [];

  for (
    let i = 0;
    i < text.length;
    i += chunkSize
  ) {
    chunks.push(
      text.slice(i, i + chunkSize)
    );
  }

  return chunks;
}

const docs = loadDocuments();

let totalChunks = 0;

for (const doc of docs) {

  const chunks = chunkText(
    doc.content
  );

  totalChunks += chunks.length;

  console.log(
    `${doc.file} -> ${chunks.length} chunks`
  );

}

console.log(
  `Total Chunks: ${totalChunks}`
);