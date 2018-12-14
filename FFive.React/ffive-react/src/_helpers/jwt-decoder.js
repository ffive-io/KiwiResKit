export const jwtParser = {
    getDecodedAccessToken
};

function getDecodedAccessToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));        
    }
    catch (Error) {
        return null;
    }

};
