const sessions = {};

function saveMessage(userId, role, content) {

  if (!sessions[userId]) {
    sessions[userId] = [];
  }

  sessions[userId].push({
    role,
    content
  });

  // Keep only last 10 messages
  if (sessions[userId].length > 10) {
    sessions[userId].shift();
  }
}

function getHistory(userId) {
  return sessions[userId] || [];
}

module.exports = {
  saveMessage,
  getHistory
};