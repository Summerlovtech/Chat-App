// message stores the object of username + message pair. so that we can maintain the order of message
// ex: messages: [{userName: 'Paul', message: 'this is the first sentence', timestamp: new Date()}]
const messages = [];

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  isValidUsername,
  messages,
};
