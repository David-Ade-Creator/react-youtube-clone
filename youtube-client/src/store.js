import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import {composeWithDevTools} from 'redux-devtools-extension';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    userSignin: {userInfo},
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer
})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    reducer, 
    initialState , 
    composeWithDevTools(applyMiddleware(thunk)));
export default store;