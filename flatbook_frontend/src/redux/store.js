import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';
import ReduxThunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default store;
