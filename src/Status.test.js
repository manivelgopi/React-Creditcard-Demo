import React from 'react';
import Status from './Status';
import {mount} from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider } from 'react-redux';
import {UserStore} from './redux/userStore';
import { findByTestAtrr } from './test/Util';


describe('New application form', ()=>{

const NewformComponent = () => (
 <Provider store={UserStore}>
   <Router>
     <Status />
   </Router>
 </Provider>);

const element = mount(<NewformComponent />);
let component;

 beforeEach(() => {
   component = element.find(Status);
 });

 //Status form exists
 it("Check New form component", ()=>{
   const wrapper = findByTestAtrr(component, "appStatus");
   expect(wrapper.length).toBe(1);
   expect(wrapper.exists()).toBeTruthy();
 });

 //Form component check
 it('Should load form elements',()=>{
     expect(component.find(`Form[data-testid="statusForm"]`)).toHaveLength(1);
     expect(component.find(`FormControl[data-testid="userApplicationNumber"]`)).toHaveLength(1);
     expect(component.find('Button')).toHaveLength(2);
    //verify button name
     expect(component.find('Button').at(0).text()).toEqual('Check Status');
 });

 it('Should update store on Application number onchange',()=>{
    const appNumInput = findByTestAtrr(component, 'userApplicationNumber').at(0);
    appNumInput.simulate('change',{target:{id:'applicationNumber', value:"1234567890"}})
    const state = UserStore.getState();
    expect(state.applicationNumber).toEqual('1234567890');
 })

 //Form submit 
it('status Form onsubmit and validate submited Application number', ()=> {    
    let applicationNumber = component.find(`input[data-testid="userApplicationNumber"]`);
    applicationNumber.simulate('change', {target: {id:"userName",value: "1234568758"}});
   
    //Form submit
    findByTestAtrr(component, "checkStatusBtn").at(0).simulate('submit');
    //store data
    const state = UserStore.getState();
    expect(state.applicationNumber).toEqual('1234568758');

  });

});