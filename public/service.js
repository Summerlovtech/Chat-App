
export function fetchLogin(username) {
    return fetch('/api/session/', {
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
      return response.json(); 
    });
}
