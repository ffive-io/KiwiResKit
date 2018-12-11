import { clientConstants } from '../_constants';

export function clients(state = {}, action) {
    switch (action.type) {
        case clientConstants.UPDATE_REQUEST:
            return {
                updating: true,
                client: action.client
            };
        case clientConstants.UPDATE_SUCCESS:
            return state;
        case clientConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}