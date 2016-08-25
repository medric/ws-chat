/**
 * Store configuration takes place here
 */
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

export default function configureStore(initialState = {}) {
  const logger = createLogger({
    collapsed: true
  });

  const enhancer = compose(
    // Middleware
    applyMiddleware(
      thunk,
      logger
    ),

    // Required! Enable Redux DevTools with the chosen monitors
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(reducers, enhancer);

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
}
