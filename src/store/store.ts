import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../reducers/rootReducer';
import {rootSaga} from '../sagas/rootSaga';

const middleware = [];

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        collapsed: true,
        diff: true,
    });
    middleware.push(logger);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);
