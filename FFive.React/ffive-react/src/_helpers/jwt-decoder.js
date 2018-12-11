import * as jwt_decode from "jwt-decode";

export const jwtParser = {
    getDecodedAccessToken
};

function getDecodedAccessToken(token) {
    try {
        return jwt_decode(token);
    }
    catch (Error) {
        return null;
    }
};