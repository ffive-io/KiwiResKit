import * as jwt_decode from "jwt-decode";

console.log('Middleware called');

const checkTokenExpirationMiddleware = store => next => action => {
    console.log('Middleware called111');

    const token =
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user"))["accessToken"];

    console.log(jwt_decode(token).exp, 'tttt', Date.now() / 1000);

    if (jwt_decode(token).exp < Date.now() / 1000) {
        next(action);

        localStorage.clear();
    }
    next(action);
};

export default checkTokenExpirationMiddleware;