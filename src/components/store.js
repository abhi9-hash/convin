import {createStore,  applyMiddleware, combineReducers, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { userlistReducers , userDetailsReducers} from './reducers/userReducers';

const initialState = {};

const reducer=combineReducers({
    userList : userlistReducers,
    userDetails: userDetailsReducers
});

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store= createStore(reducer,initialState, composeEnhancer(applyMiddleware(thunk)));


export default store;