const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); // Parses requests with json content bodies

// Sessions
// Check for existing session (used on page load)
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsername(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  res.cookie('sid', sid);
  res.json({ username });
});

app.post('/api/v1/message', (req, res) => {
  const sid = req.cookies.sid;
  const userName = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !userName) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { message } = req.body;

  if(!message || message === '') {
    res.status(400).json({ error: 'required-message' });
    return;
  }

  users.messages.push({userName, message, timeStamp: new Date()});

  res.json({ messages: users.messages });
});

app.get('/api/v1/chatHistory', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const sessionList = sessions.getSessionList();
  let response = [];
  const visited = {};
  sessionList.forEach((userName) => {
    if (!visited[userName]) {
      visited[userName] = true;
      response.push(userName);
    }
  });
  res.json({ sessionList: response, messages: users.messages });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  res.json({ wasLoggedIn: !!username }); 
});



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));