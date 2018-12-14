import { menuConstants } from '../_constants';


export const menus = (state = {}, action) => {

    console.log('hhhhhhhhhhhhhhh');

    switch (action.type) {
        case 'tabClicked':

            console.log('ggggg');

            return {
                ...state,
                activeTab: action.activeTab
            }
        default:
            {
                console.log('kkkkkkk');
                return state;
            }
    }
};