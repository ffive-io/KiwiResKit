import { authHeader, config } from '../_helpers';

export const projectLocationBillingRoleService = {
    getAll,
    getById,
    add,
    update,
    delete: _delete
};

function getAll(pageNumber) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/projectlocationbillingroles?pageNumber=' + pageNumber, requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/v1/projectlocationbillingroles/' + id, requestOptions).then(handleResponse, handleError);
}

function add(data) {

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/api/v1/projectlocationbillingroles', requestOptions).then(handleResponse, handleError);
}

function update(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: data
    };

    return fetch(config.apiUrl + '/api/v1/projectlocationbillingroles/' + data.id, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(config.apiUrl + '/api/v1/projectlocationbillingroles/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    console.log(response);

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