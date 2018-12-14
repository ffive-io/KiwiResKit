import { authHeader, config } from '../_helpers';

export const projectService = {
    getAll,
    getById,
    getAllProjects,
    GetAllBillingRolesByProjectId,
    add,
    update,
    delete: _delete
};

function getAll(pageNumber) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/projects?pageNumber=' + pageNumber, requestOptions).then(handleResponse, handleError);
}

function getAllProjects() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/projects/allprojects', requestOptions).then(handleResponse, handleError);
}

function GetAllBillingRolesByProjectId(projectId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/v1/projects/' + projectId + '/billingroles', requestOptions).then(handleResponse, handleError);
}

function getById(id, startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    var queryString = '';
    if (startDate && endDate) {
        queryString = '?startDate=' + startDate + '&endDate=' + endDate;
    }

    return fetch(config.apiUrl + '/api/v1/projects/' + id + queryString, requestOptions).then(handleResponse, handleError);
}

function add(project) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(config.apiUrl + '/api/v1/projects', requestOptions).then(handleResponse, handleError);
}

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(config.apiUrl + '/api/v1/projects/' + project.id, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(config.apiUrl + '/api/v1/projects/' + id, requestOptions).then(handleResponse, handleError);
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