/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchChatHistory": () => (/* binding */ fetchChatHistory),
/* harmony export */   "fetchExistingSessions": () => (/* binding */ fetchExistingSessions),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "postMessage": () => (/* binding */ postMessage)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/v1/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchChatHistory() {
  return fetch('/api/v1/chatHistory/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    }
  })["catch"](function (err) {
    console.error(err);
    Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

;
function fetchLogout() {
  return fetch('/api/v1/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

;
function postMessage(message) {
  return fetch('/api/v1/message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  })["catch"](function (error) {
    throw error;
  });
}
function fetchExistingSessions() {
  return fetch('/api/v1/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/service.js");

var PAGES = {
  LOGIN: 'login',
  CHAT: 'chat',
  LOADING: 'loading',
  FETCH: 'fetch'
};
function app() {
  var appEl = document.querySelector('#app');
  var loginEl = document.querySelector('#login-div');
  var userEl = document.querySelector('.user-div');
  var chatEl = document.querySelector('.chat-div');
  var newMessageEl = document.querySelector('.new-message');
  var intervalId = -1;
  var state = {
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
    var userList = document.querySelector('#user-list-ul');
    var userListHTML = '';
    state.userList.forEach(function (userName) {
      userListHTML += "<li>\n                    <span>".concat(userName, "</span>\n                </li>");
    });
    userList.innerHTML = userListHTML;
  }
  function renderChatHistory() {
    var chatHistory = document.querySelector('.chat-ul');
    if (chatHistory) {
      var messageHistory = '';
      state.messages.reverse().forEach(function (object) {
        if (state.userName === object.userName) {
          messageHistory += "<li class='chat-msg'>\n                    <span class=\"user-name\">".concat(object.userName, "</span>\n                    <span class=\"time-stamp\">").concat(new Date(object.timeStamp).toLocaleString('en-US'), "</span>\n                    <p class=\"message-block\">").concat(object.message, "</p>\n                </li>");
        } else {
          messageHistory += "<li class='other-chat-msg'>\n                    <span class=\"user-name\">".concat(object.userName, "</span>\n                    <span class=\"time-stamp\">").concat(new Date(object.timeStamp).toLocaleString('en-US'), "</span>\n                    <p class=\"message-block\">").concat(object.message, "</p>\n                </li>");
        }
      });
      chatHistory.innerHTML = messageHistory;
    }
  }
  function renderErrorMessage() {
    var loginErrorEl = document.querySelector('#error-message');
    if (loginErrorEl) {
      loginErrorEl.innerHTML = "<span class=\"warning-message\">".concat(state.errorMessage, "</span>");
    }
  }
  function renderSpinner() {
    loginEl.innerHTML = "<div class='spinner'>Loading...</div>";
  }
  function renderLogin() {
    chatEl.innerHTML = '';
    newMessageEl.innerHTML = '';
    state.page = PAGES.LOADING;
    render();
    // The SPA will determine (using a service call) on load if the user is already logged in. 
    // Users that are already logged in are not required to login again.
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchExistingSessions)().then(function (response) {
      if (response) {
        state.userName = response.username;
        state.page = PAGES.CHAT;
        fetchChatHistoryAndRender();
        // Every 5 seconds (roughly) the client side will check to see 
        // if there are new messages and/or if the list of currently logged in users 
        // has changed
        intervalId = setInterval(function () {
          state.page = PAGES.FETCH;
          fetchChatHistoryAndRender();
        }, 5000);
      } else {
        state.page = PAGES.LOGIN;
        showLogInEl();
      }
    })["catch"](function () {
      state.page = PAGES.LOGIN;
      showLogInEl();
      renderErrorMessage();
    });
  }
  function showLogInEl() {
    loginEl.innerHTML = "<h1 class=\"home-title\">Chat App</h1>\n                <div class=\"user-login\">\n                <h2 class=\"login-title\">Login</h2>\n                <label for=\"username\"><b>Username</b>\n                    <input id=\"username-input\" type=\"text\" placeholder=\"Enter Username\" name=\"username\" required>\n                </label>\n                <button class=\"login-btn\" type=\"submit\" data-target=\"chat\">Login</button>\n                <div id=\"error-message\"></div>\n            </div>";
  }
  function renderChats() {
    loginEl.innerHTML = '';
    var userList = '';
    state.userList.forEach(function (userName) {
      userList += "<li>\n                    <span>".concat(userName, "</span>\n                </li>");
    });
    var messageHistory = '';
    state.messages.reverse().forEach(function (object) {
      if (state.userName === object.userName) {
        messageHistory += "<li class='chat-msg'>\n                <span class=\"user-name\">".concat(object.userName, "</span>\n                <span class=\"time-stamp\">").concat(new Date(object.timeStamp).toLocaleString('en-US'), "</span>\n                <p class=\"message-block\">").concat(object.message, "</p>\n            </li>");
      } else {
        messageHistory += "<li class='other-chat-msg'>\n                <span class=\"user-name\">".concat(object.userName, "</span>\n                <span class=\"time-stamp\">").concat(new Date(object.timeStamp).toLocaleString('en-US'), "</span>\n                <p class=\"message-block\">").concat(object.message, "</p>\n            </li>");
      }
    });
    chatEl.innerHTML = "<div class=\"chat-box\">\n            <h1 class=\"title\">Chat App</h1> \n            <span class=\"login-title\">".concat(state.userName, ", Welcome to the Chat App !</span>   \n            <div class=\"chat-message\">\n            <div class=\"chat-content\">\n                <ul class=\"chat-ul\">\n                    ").concat(messageHistory, "\n                </ul>\n                </div>\n                <div class=\"logged-users\">\n                <h2>User List</h2> \n                <ul id=\"user-list-ul\">\n                    ").concat(userList, "\n                </ul>\n            </div>\n            </div>\n        ");
    var chatContent = document.querySelector('.chat-ul');
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  function renderNewMessage() {
    newMessageEl.innerHTML = "\n            <div class=\"send-button\">\n                <div id=\"error-message\"></div>\n                <input id=\"new-message\" type=\"text\" placeholder=\"Enter New Message\">\n                <button data-target=\"chat\" class=\"chat-btn\">Send</button>\n                <button id=\"logout-btn\" class=\"logout-btn\" type=\"logout\" data-target=\"log-out\">Logout</button>\n            </div>\n            ";
  }
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('login-btn')) {
      var username = document.getElementById('username-input');
      (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username.value).then(function (response) {
        var target = e.target.dataset.target;
        state.page = target;
        state.errorMessage = '';
        state.userName = response.username;
        fetchChatHistoryAndRender();
        // Every 5 seconds (roughly) the client side will check to see 
        // if there are new messages and/or if the list of currently logged in users 
        // has changed
        intervalId = setInterval(function () {
          state.page = PAGES.FETCH;
          fetchChatHistoryAndRender();
        }, 5000);
      })["catch"](function (error) {
        state.errorMessage = getErrorMessageByError(error.error);
        render();
      });
      return;
    }
    if (e.target.classList.contains('chat-btn')) {
      var message = document.getElementById('new-message');
      (0,_service__WEBPACK_IMPORTED_MODULE_0__.postMessage)(message.value).then(function (response) {
        if (response) {
          state.page = PAGES.FETCH;
          state.errorMessage = '';
          state.messages = response.messages;
          message.value = '';
          render();
        }
      })["catch"](function (error) {
        state.page = PAGES.FETCH;
        state.errorMessage = getErrorMessageByError(error.error);
        render();
      });
      return;
    }
    if (e.target.classList.contains('logout-btn')) {
      (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function (response) {
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
      return "dog can't be used as username";
    } else {
      return 'An error occurred';
    }
  }
  function fetchChatHistoryAndRender() {
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchChatHistory)().then(function (userListResponse) {
      state.userList = userListResponse.sessionList;
      state.messages = userListResponse.messages;
      render();
    });
  }
}
;
app();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map