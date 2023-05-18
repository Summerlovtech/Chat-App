
import { fetchLogin, fetchChatHistory, fetchExistingSessions, postMessage, fetchLogout } from './service';

const PAGES = {
    LOGIN: 'login',
    CHAT: 'chat',
    LOADING: 'loading',
    FETCH: 'fetch'
};

function app() {
    const appEl = document.querySelector('#app');
    const loginEl = document.querySelector('#login-div');
    const userEl = document.querySelector('.user-div');
    const chatEl = document.querySelector('.chat-div');
    const newMessageEl = document.querySelector('.new-message');

    let intervalId = -1;

    const state = {
        userName: '',
        page: PAGES.LOGIN,
        userList: [],
        messages: [],
        errorMessage: ''
    };
    function render() {
        if (state.page === PAGES.LOGIN) {
            renderLogin();
            return;
        }
        if (state.page === PAGES.CHAT) {
            renderChats();
            renderErrorMessage();
            renderNewMessage();
            return;
        }
        if (state.page === PAGES.FETCH) {
            renderChatHistory();
            renderUserList();
            renderErrorMessage();
            return;
        }
        if (state.page === PAGES.LOADING) {
            renderSpinner();
            return;
        }
    }

    function renderUserList() {
        const userList = document.querySelector('#user-list-ul');
        let userListHTML = '';
        state.userList.forEach(userName => {
            userListHTML +=
                `<li>
                    <span>${userName}</span>
                </li>`;
        });
        userList.innerHTML = userListHTML;
    }

    function renderChatHistory() {
        const chatHistory = document.querySelector('.chat-ul');
        if (chatHistory) {
            let messageHistory = '';
            state.messages.reverse().forEach((object) => {
                if (state.userName === object.userName) {
                    messageHistory +=
                        `<li class='chat-msg'>
                    <span class="user-name">${object.userName}</span>
                    <span class="time-stamp">${new Date(object.timeStamp).toLocaleString('en-US')}</span>
                    <p class="message-block">${object.message}</p>
                </li>`;
                } else {
                    messageHistory +=
                        `<li class='other-chat-msg'>
                    <span class="user-name">${object.userName}</span>
                    <span class="time-stamp">${new Date(object.timeStamp).toLocaleString('en-US')}</span>
                    <p class="message-block">${object.message}</p>
                </li>`;
                }
                });
            chatHistory.innerHTML = messageHistory;
        }
    }

    function renderErrorMessage() {
        const loginErrorEl = document.querySelector('#error-message');
        if (loginErrorEl) {
            loginErrorEl.innerHTML = `<span class="warning-message">${state.errorMessage}</span>`;
        }
    }

    function renderSpinner() {
        loginEl.innerHTML = `<div class='spinner'>Loading...</div>`
    }

    function renderLogin() {
        chatEl.innerHTML = '';
        newMessageEl.innerHTML = '';
        state.page = PAGES.LOADING;
        render();
        // The SPA will determine (using a service call) on load if the user is already logged in. 
        // Users that are already logged in are not required to login again.
        fetchExistingSessions()
            .then((response) => {
                if (response) {
                    state.userName = response.username;
                    state.page = PAGES.CHAT;
                    fetchChatHistoryAndRender();
                    // Every 5 seconds (roughly) the client side will check to see 
                    // if there are new messages and/or if the list of currently logged in users 
                    // has changed
                    intervalId = setInterval(() => {
                        state.page = PAGES.FETCH;
                        fetchChatHistoryAndRender();
                    }, 5000);
                } else {
                    state.page = PAGES.LOGIN;
                    showLogInEl();
                }
            })
            .catch(() => {
                state.page = PAGES.LOGIN;
                showLogInEl();
                renderErrorMessage();
            });
    }

    function showLogInEl() {
        loginEl.innerHTML =
            `<h1 class="home-title">Chat App</h1>
                <div class="user-login">
                <h2 class="login-title">Login</h2>
                <label for="username"><b>Username</b>
                    <input id="username-input" type="text" placeholder="Enter Username" name="username" required>
                </label>
                <button class="login-btn" type="submit" data-target="chat">Login</button>
                <div id="error-message"></div>
            </div>`;
    }

    function renderChats() {
        loginEl.innerHTML = '';
        let userList = '';
        state.userList.forEach(userName => {
            userList +=
                `<li>
                    <span>${userName}</span>
                </li>`;
        });
        let messageHistory = '';
        state.messages.reverse().forEach((object) => {
            if (state.userName === object.userName) {
                messageHistory +=
                    `<li class='chat-msg'>
                <span class="user-name">${object.userName}</span>
                <span class="time-stamp">${new Date(object.timeStamp).toLocaleString('en-US')}</span>
                <p class="message-block">${object.message}</p>
            </li>`;
            } else {
                messageHistory +=
                    `<li class='other-chat-msg'>
                <span class="user-name">${object.userName}</span>
                <span class="time-stamp">${new Date(object.timeStamp).toLocaleString('en-US')}</span>
                <p class="message-block">${object.message}</p>
            </li>`;
            }

        })
        chatEl.innerHTML = `<div class="chat-box">
            <h1 class="title">Chat App</h1> 
            <span class="login-title">${state.userName}, Welcome to the Chat App !</span>   
            <div class="chat-message">
            <div class="chat-content">
                <ul class="chat-ul">
                    ${messageHistory}
                </ul>
                </div>
                <div class="logged-users">
                <h2>User List</h2> 
                <ul id="user-list-ul">
                    ${userList}
                </ul>
            </div>
            </div>
        `;
        const chatContent = document.querySelector('.chat-ul')
        chatContent.scrollTop = chatContent.scrollHeight
    }

    function renderNewMessage() {
        newMessageEl.innerHTML = `
            <div class="send-button">
                <div id="error-message"></div>
                <input id="new-message" type="text" placeholder="Enter New Message">
                <button data-target="chat" class="chat-btn">Send</button>
                <button id="logout-btn" class="logout-btn" type="logout" data-target="log-out">Logout</button>
            </div>
            `
    }

    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('login-btn')) {
            const username = document.getElementById('username-input');
            fetchLogin(username.value).then((response) => {
                const target = e.target.dataset.target;
                state.page = target;
                state.errorMessage = '';
                state.userName = response.username;
                fetchChatHistoryAndRender();
                // Every 5 seconds (roughly) the client side will check to see 
                // if there are new messages and/or if the list of currently logged in users 
                // has changed
                intervalId = setInterval(() => {
                    state.page = PAGES.FETCH;
                    fetchChatHistoryAndRender();
                }, 5000);
            }).catch((error) => {
                state.errorMessage = getErrorMessageByError(error.error);
                render();
            });

            return;
        }

        if (e.target.classList.contains('chat-btn')) {
            const message = document.getElementById('new-message');
            postMessage(message.value)
                .then((response) => {
                    if (response) {
                        state.page = PAGES.FETCH;
                        state.errorMessage = '';
                        state.messages = response.messages;
                        message.value = '';
                        render();
                    }
                })
                .catch((error) => {
                    state.page = PAGES.FETCH;
                    state.errorMessage = getErrorMessageByError(error.error);
                    render();
                });

            return;
        }

        if (e.target.classList.contains('logout-btn')) {
            fetchLogout().then((response) => {
                state.page = PAGES.LOGIN;
                if (intervalId !== -1) {
                    clearInterval(intervalId);
                }
                state.errorMessage = '';
                render();
            });
            return;
        }
    });

    render();

    function getErrorMessageByError(error) {
        if (error === 'auth-missing') {
            return 'Please make sure user is logged in';
        } else if (error === 'required-message') {
            return 'Please enter text message';
        } else if (error === 'invalid-username') {
            return 'Please enter a valid username, no special characters';
        } else if (error === 'auth-insufficient') {
            return `dog can't be used as username`;
        } else {
            return 'An error occurred';
        }
    }

    function fetchChatHistoryAndRender() {
        fetchChatHistory().then((userListResponse) => {
            state.userList = userListResponse.sessionList;
            state.messages = userListResponse.messages;

            render();
        });
    }
};

app();
