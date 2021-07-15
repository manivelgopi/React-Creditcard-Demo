import { createStore } from 'redux';
import Rootreducer from './rootreducer';

export const UserStore = createStore(Rootreducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 
