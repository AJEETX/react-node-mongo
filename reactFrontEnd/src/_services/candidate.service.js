import config from 'config';
import { authHeader } from '../_helpers';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const candidateService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/candidates`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/candidates/${id}`, requestOptions).then(handleResponse);
}

function register(candidate) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate)
    };

    return fetch(`${config.apiUrl}/candidates/register`, requestOptions).then(handleResponse);
}

function update(candidate) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate)
    };

    return fetch(`${config.apiUrl}/candidates/${candidate.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/candidates/${id}`, requestOptions).then(handleResponse);
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    currentUserSubject.next(null);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}