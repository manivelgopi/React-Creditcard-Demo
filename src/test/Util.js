import { createStore } from 'redux';
import Rootreducer from './../redux/rootreducer';

export const testStore = () => {
     return createStore(Rootreducer);
};

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-testid='${attr}']`);
    return wrapper;
};