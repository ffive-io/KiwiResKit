import { platformConstants } from '../_constants';

export function platforms(state = {}, action) {
    switch (action.type) {
        case platformConstants.UPDATE_REQUEST:
            return {
                updating: true,
                platform: action.platform
            };
        case platformConstants.UPDATE_SUCCESS:
            return state;
        case platformConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case platformConstants.CREATE_REQUEST:
            return {
                creating: true
            };
        case platformConstants.CREATE_SUCCESS:
            return state;
        case platformConstants.CREATE_FAILURE:
            return {
                error: action.error
            };

        case platformConstants.FETCH_REQUEST:
            return {
                ...state,
                fetching: true,
                platform: action.platform
            };
        case platformConstants.FETCH_SUCCESS:
            return {
                ...state,
                result: action.platform
            };
        case platformConstants.FETCH_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}