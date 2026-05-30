const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("chat-gpt");

async function getUserMemories(req, res) {
  const user = req.user;
  const id = user._id;
  console.log("Fetching memories for user ID:", id);
  const fetchData = await index.namespace("__default__").query({
    vector: new Array(768).fill(0), // dummy vector
    topK: 100,
    filter: { user: id },
    includeMetadata: true,
  });
  res.status(200).json({
    memories: fetchData.matches.map((msg) => ({
      id: msg.id,
      metadata: msg.metadata,
    })),
  });
}

async function deleteMemory(req, res) {
  const user = req.user;
  const id = user._id;
  await index.namespace("__default__").deleteMany({
    user: { $eq: id },
  });
  res.status(200).json({
    message: "All memories deleted successfully",
  });
}

module.exports = {
  getUserMemories,
  deleteMemory,
};
