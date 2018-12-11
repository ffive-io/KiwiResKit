import { resourceConstants } from '../_constants';
import { resourceService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const resourceActions = {
    edit,
    editRequest
};

function editRequest(resource) {
    return dispatch => {
        dispatch(request(resource));
        history.push('/resources/edit');
    };
    function request(resource) { return { type: resourceConstants.UPDATE_REQUEST, resource } }
}

function edit(resource) {
    return dispatch => {
        resourceService.update(resource)
            .then(
                () => {
                    dispatch(success());
                    dispatch(alertActions.success('Updated successfully!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                    history.push('/resources');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error('Update failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                }
            );
    };

    function success(resource) { return { type: resourceConstants.UPDATE_SUCCESS, resource } }
    function failure(error) { return { type: resourceConstants.UPDATE_FAILURE, error } }
}