import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers/index';
import freeze from 'redux-freeze';
import { fetchItems } from './actions/items';
import config from './config/client';

const history = createBrowserHistory();
const loggerMiddleware = createLogger()

let middlewares = [
  routerMiddleware(history),
  thunkMiddleware
]

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
  middlewares.push(loggerMiddleware)
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// fetch compose enhancer
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// add the redux dev tools
if (process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension())
  } else if (composeEnhancer) {
    middleware = composeEnhancer( applyMiddleware(middleware) )
  }
}

// create the store
const store = createStore(
  connectRouter(history)(rootReducer),
  middleware
);

// initialize app state
store.dispatch(fetchItems(config.endpoint + 'items'))

export { store, history };