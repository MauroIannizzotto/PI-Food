// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension"; //puede funcionar con la constante de windows no se que
// import thunk from "redux-thunk";
// import rootReducer from "../reducer";


// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)));

export default store;