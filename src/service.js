export function fetchLogin(username) {
    return fetch('/api/v1/session/', {
        method: 'POST',
        headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify( { username } ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
        }
      return response.json(); // happy status code means resolve with data from service
    });
}

export function fetchChatHistory() {
    return fetch('/api/v1/chatHistory/', {
        method: 'GET',
        headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
    })
    .catch( err => {
        console.error(err);
        Promise.reject({ error: 'network-error' })
    } )
    .then( response => {
        if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
        }
      return response.json(); // happy status code means resolve with data from service
    });   
};

export function fetchLogout() {
    return fetch('/api/v1/session/', {
        method: 'DELETE',
        headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
        }
      return response.json(); // happy status code means resolve with data from service
    });   
};

export function postMessage(message) {
    return fetch('/api/v1/message', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify( { message } ),
    })
    .then((response) => {
        if(!response.ok) { 
            return response.json().then(err => Promise.reject(err));
        }
        return response.json(); // happy status code means resolve with data from service
    })
    .catch((error) => {
        throw error;
    })
}

export function fetchExistingSessions() {
    return fetch('/api/v1/session/', {
        method: 'GET',
        headers: {
        'content-type': 'application/json',    
        }
})
.catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
        }
        return response.json(); 
    });   
};