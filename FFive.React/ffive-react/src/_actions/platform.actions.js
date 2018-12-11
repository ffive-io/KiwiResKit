import { platformConstants } from '../_constants';
import { platformService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { platforms } from '../_reducers/platform.reducer';

export const platformActions = {
    edit,
    editRequest
};

function editRequest(platform) {
    return dispatch => {
        dispatch(request(platform));
        history.push('/platforms/edit');
    };
    function request(platform) { return { type: platformConstants.UPDATE_REQUEST, platform } }
}

function edit(platform) {
    return dispatch => {
        platformService.update(platform)
            .then(
                () => {
                    dispatch(success());
                    dispatch(alertActions.success('Updated successfully!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                    history.push('/platforms');
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

    function success(platform) { return { type: platformConstants.UPDATE_SUCCESS, platform } }
    function failure(error) { return { type: platformConstants.UPDATE_FAILURE, error } }
}