import { userConstants } from '../_constants';
import * as jwt_decode from "jwt-decode";

let user = JSON.parse(localStorage.getItem('user'));
let userDecoded = user ? getDecodedAccessToken(user.accessToken) : null;
let role = userDecoded ? userDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
let email = userDecoded ? userDecoded.sub : null;
const initialState = user ? { loggedIn: true, user, role, email } : {};

function getDecodedAccessToken(token) {
    try {
        return jwt_decode(token);
    }
    catch (Error) {
        return null;
    }
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            let userDecoded = action.user ? getDecodedAccessToken(action.user.accessToken) : null;
            let role = userDecoded ? userDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
            let email = userDecoded ? userDecoded.sub : null;
            return {
                loggedIn: true,
                user: action.user,
                role: role,
                email: email
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}