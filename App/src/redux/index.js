import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducers";
import rootSage from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSage)

export default store