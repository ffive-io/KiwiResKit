import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { platforms } from './platform.reducer';
import { clients } from './client.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    platforms,
    alert,
    clients
});

export default rootReducer;