
export const initData = {
            date:'',
            ip:'',
            cardData:  {
                   userName:'',
                   userEmail:'',
                   userPan:'',
                   userSalary:'',
                   userDob:'',
                   userMobile:'',
                },
            applicationNumber: ''
};

const Rootreducer = (state = initData, action) => {
    switch(action.type){
        case "SUBMIT":
            //console.log(`object`, action.payload);
            return {...state, cardData: action.payload};
        
        case "APPNUMBER":
            //console.log(`object`, action.payload);
            return {...state, applicationNumber: action.payload};
                
        case "TEST":
            return {...state, dob: action.payload};
            
        default:
            return state;
    }
    
}

export default Rootreducer;