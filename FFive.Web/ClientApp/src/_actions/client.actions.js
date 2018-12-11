import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const clientActions = {
    edit,
    editRequest
};

function editRequest(client) {
    return dispatch => {
        dispatch(request(client));
        history.push('/clients/edit');
    };
    function request(client) { return { type: clientConstants.UPDATE_REQUEST, client } }
}

function edit(client) {
    return dispatch => {
        clientService.update(client)
            .then(
                () => {
                    dispatch(success());
                    dispatch(alertActions.success('Updated successfully!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                    history.push('/clients');
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

    function success(client) { return { type: clientConstants.UPDATE_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.UPDATE_FAILURE, error } }
}