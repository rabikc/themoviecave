// const GOOGLE_AUTH_SUCCESS = 'GOOGLE_AUTH_SUCCESS';
// const GOOGLE_AUTH_FAIL = 'GOOGLE_AUTH_FAIL';
// const FACEBOOK_AUTH_SUCCESS = 'FACEBOOK_AUTH_SUCCESS';
// const FACEBOOK_AUTH_FAIL = 'FACEBOOK_AUTH_FAIL';

// const initialState = {
//     access: localStorage.getItem('tokens', tokens.access),
//     refresh: localStorage.getItem('tokens', tokens.refresh),
//     isAuthenticated: null,
//     userData: null
// };

// export default function(state = initialState, action) {
//     const { type, payload } = action;

//     switch(type) {
//         // case AUTHENTICATED_SUCCESS:
//         //     return {
//         //         ...state,
//         //         isAuthenticated: true
//         //     }
//         // case LOGIN_SUCCESS:
//         case GOOGLE_AUTH_SUCCESS:
//         case FACEBOOK_AUTH_SUCCESS:
//             localStorage.setItem('access', payload.access);
//             localStorage.setItem('refresh', payload.refresh);
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 access: payload.access,
//                 refresh: payload.refresh
//             }
//         // case SIGNUP_SUCCESS:
//         //     return {
//         //         ...state,
//         //         isAuthenticated: false
//         //     }
//         // case USER_LOADED_SUCCESS:
//         //     return {
//         //         ...state,
//         //         user: payload
//         //     }
//         // case AUTHENTICATED_FAIL:
//         //     return {
//         //         ...state,
//         //         isAuthenticated: false
//         //     }
//         // case USER_LOADED_FAIL:
//         //     return {
//         //         ...state,
//         //         userData: null
//         //     }
//         case GOOGLE_AUTH_FAIL:
//         case FACEBOOK_AUTH_FAIL:
//         case LOGIN_FAIL:
//         case SIGNUP_FAIL:
//         case LOGOUT:
//             localStorage.removeItem('access');
//             localStorage.removeItem('refresh');
//             return {
//                 ...state,
//                 access: null,
//                 refresh: null,
//                 isAuthenticated: false,
//                 userData: null
//             }
//         case PASSWORD_RESET_SUCCESS:
//         case PASSWORD_RESET_FAIL:
//         case PASSWORD_RESET_CONFIRM_SUCCESS:
//         case PASSWORD_RESET_CONFIRM_FAIL:
//         case ACTIVATION_SUCCESS:
//         case ACTIVATION_FAIL:
//             return {
//                 ...state
//             }
//         default:
//             return state
//     }
// };