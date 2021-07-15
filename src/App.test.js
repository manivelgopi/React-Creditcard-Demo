import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Home from './home';
import PageNotFound from './pageNotFound';
import App from './App';
import Newform from './Newform';
import Status from './Status';

import {Provider} from 'react-redux';
import {UserStore} from './redux/userStore';

const dispatch = jest.fn(); 


describe('App', ()=>{

  it('valid path should not redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(PageNotFound)).toHaveLength(0);
  });
  
  it('invalid path should redirect to 404', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/randomjjs']} initialIndex={0}>
           <App  />
        </MemoryRouter>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(PageNotFound)).toHaveLength(1);
    });

    it('Apply page URL check', () => {
      const wrapper = mount(
        <Provider store={UserStore}>
          <MemoryRouter initialEntries={['/apply']}>
            <App  />
          </MemoryRouter>
        </Provider>
      );
      
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(PageNotFound)).toHaveLength(0);
      expect(wrapper.find(Newform)).toHaveLength(1);
    });

    it('Status page url check', () => {
      const wrapper = mount(
        <Provider store={UserStore}>
          <MemoryRouter initialEntries={['/status']}>
            <App  />
          </MemoryRouter>
        </Provider>
      );
      
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(PageNotFound)).toHaveLength(0);
      expect(wrapper.find(Status)).toHaveLength(1);
    });

});