import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { rootReducer } from './reducers/index';
import { createBrowserHistory } from 'history';
import { fetchItems } from './actions/items';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import config from './config/client';
import freeze from 'redux-freeze';

const history = createBrowserHistory();
const loggerMiddleware = createLogger();

let middlewares = [
  thunkMiddleware,
  routerMiddleware(history)
];

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
  middlewares.push(loggerMiddleware)
}

// create the store
const store = createStore(
  rootReducer(history),
  applyMiddleware(...middlewares),
);

// initialize app state
store.dispatch(fetchItems(config.endpoint + 'items'));

export { store, history };