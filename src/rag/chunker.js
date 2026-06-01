const fs = require("fs");
const path = require("path");

function loadDocuments() {
  const folderPath = "./knowledge/website";

  const files = fs.readdirSync(folderPath);

  const documents = [];

  for (const file of files) {
    const content = fs.readFileSync(
      path.join(folderPath, file),
      "utf-8"
    );

    documents.push({
      source: file,
      content
    });
  }

  return documents;
}

function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    chunks.push(
      text.slice(start, end)
    );

    start += chunkSize - overlap;
  }

  return chunks;
}

module.exports = {
  loadDocuments,
  chunkText
};