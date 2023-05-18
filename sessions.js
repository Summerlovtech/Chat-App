const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

function getSessionList() {
    const sessionList = [];
    let session = Object.keys(sessions);
    session.forEach(sid => {
        username = sessions[sid]?.username;
        sessionList.push(username);
    });
    return sessionList;
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    getSessionList
};