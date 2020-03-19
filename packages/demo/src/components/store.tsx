import {createStore} from 'redux';
import {MakeStore} from 'next-redux-wrapper';
import reducer, {State} from './reducer';

export const makeStore: MakeStore = (initialState: State, {isServer, req, res}) => {
    const store = createStore(reducer, initialState);

    console.log('In Make Store', initialState);
    console.log('In Make Store: does req exist', !!req);

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            console.log('Replacing reducer');
            store.replaceReducer(require('./reducer').default);
        });
    }

    return store;
};
