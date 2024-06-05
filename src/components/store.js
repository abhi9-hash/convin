import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import {
  workspaceDetailsReducers,
  workspacelistReducers,
  analyticsReducers,
} from "./reducers/workspaceReducers";

const initialState = {};

const reducer = combineReducers({
  workspaceList: workspacelistReducers,
  workspaceDetails: workspaceDetailsReducers,
  workspacesAnalytics: analyticsReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
