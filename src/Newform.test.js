 import Newform from './Newform';
 import {mount, shallow} from 'enzyme';
 import {BrowserRouter as Router} from 'react-router-dom';

 import {Provider } from 'react-redux';
 import {UserStore} from './redux/userStore';
 
const findTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-testid="${attr}"]`);
    return wrapper;
  };
   
describe('New application form', ()=>{

const formData = {
    userName:'Manivel',
    userEmail:'manivel@gmail.com',
    userPan:'BPLPM322E',
    userSalary:'400000',
    userDob:'15-15-1990',
    userMobile:'9000010000',
   };

   
const NewformComponent = () => (
  <Provider store={UserStore}>
    <Router>
      <Newform />
    </Router>
  </Provider>);

const element = mount(shallow(<NewformComponent />).get(0));
let component;

  beforeEach(() => {
    component = element.find(Newform);
  });

  //New apply form  exists
  it("Check New form component", ()=>{
    const wrapper = findTestAttr(component, "newForm");
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists()).toBeTruthy();
  });

  
it('should have all required inputs to apply Credit card', ()=> {
  //Required inputs field should be present
  expect(component.find('input#userName')).toHaveLength(1);
  expect(component.find('input#userPan')).toHaveLength(1);
  expect(component.find('input#userDob')).toHaveLength(1);
  expect(component.find('input#userEmail')).toHaveLength(1);
  expect(component.find('input#userMobile')).toHaveLength(1);
  expect(component.find('input#userSalary')).toHaveLength(1);
  expect(component.find('input#userTerms')).toHaveLength(1);
});


it('should have a Button component', ()=> {
    
    //There should be only one button
    expect(component.find('Button')).toHaveLength(2);

    //Button should have matching text
    expect(component.find('Button').at(0).text()).toEqual('Apply Now');
    expect(component.find('Button').at(1).text()).toEqual('Clear');
});


//Form submit 
it('Form onsubmit', ()=> {
  
  //Accept terms and conditions
  component.find('input#userTerms').simulate('change', {target: {checked: true}});
  
  //let userName = component.find('input#userName');
  
  let userName = component.find(`FormControl[data-testid="userName"]`);
  userName.simulate('change', {target: {id:"userName",value: "Manivel"}});
  
  component.find('input#userDob').simulate('change', {target: {id:"userDob",value: "12-06-1990"}});
  component.find('input#userPan').simulate('change', {target: {id:"userPan",value: "BPLPM322E"}});
  component.find('input#userEmail').simulate('change', {target: {id:"userEmail",value: "manivel@gmail.com"}});
  component.find('input#userMobile').simulate('change', {target: {id:"userMobile",value: "9000010000"}});
  component.find('input#userSalary').simulate('change', {target: {id:"userSalary",value: "500000"}});

  //Form submit
  findTestAttr(component, "applyNowBtn").at(0).simulate('submit');
  
  UserStore.dispatch({type:"SUBMIT", payload: formData });
  
  const state = UserStore.getState();
  //console.log(state)
  expect(state.cardData.userPan).toEqual("BPLPM322E");
  expect(state.cardData.userSalary).toEqual("400000");
  expect(state.cardData.userDob).toEqual("15-15-1990");
  expect(state.cardData.userName).toEqual("Manivel");
  expect(state.cardData.userEmail).toEqual("manivel@gmail.com");
  expect(state.cardData.userMobile).toEqual("9000010000");
  
});
 
 
});