import { authHeader, config } from '../_helpers';

export const resourceService = {
    getAll,
    getById,
    add,
    update,
    getAllByRoleName,
    createUserAccountForResource,
    getAllResourceOwnerNames,
    getAllManagerNames,
    getAllNames,
    delete: _delete
};

function getAll(pageNumber) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/resources?page=' + pageNumber, requestOptions).then(handleResponse, handleError);
}

function getAllNames() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/resources/allresources', requestOptions).then(handleResponse, handleError);
}

function getAllManagerNames() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/resources/allmanagers', requestOptions).then(handleResponse, handleError);
}


function getAllResourceOwnerNames() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/resources/allresourceowners', requestOptions).then(handleResponse, handleError);
}


function getAllByRoleName(roleName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/v1/resources/byrole/' + roleName, requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/v1/resources/' + id, requestOptions).then(handleResponse, handleError);
}

function add(resource) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(resource)
    };

    return fetch(config.apiUrl + '/api/v1/resources', requestOptions).then(handleResponse, handleError);
}

function createUserAccountForResource(resource) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(resource)
    };

    return fetch(config.apiUrl + '/api/v1/resources/createwithuseraccount', requestOptions).then(handleResponse, handleError);
}

function update(resource) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(resource)
    };

    return fetch(config.apiUrl + '/api/v1/resources/' + resource.id, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(config.apiUrl + '/api/v1/resources/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}