import Rootreducer, {initData} from './rootreducer';

const cardData = {
        userName:'Manivel',
        userEmail:'manivel@gmail.com',
        userPan:'BPLPM322E',
        userSalary:'400000',
        userDob:'15-15-1990',
        userMobile:'9000010000'
        };

const expectedUserData = { date:'',
                ip:'',
                cardData:  {
                    userName:'Manivel',
                    userEmail:'manivel@gmail.com',
                    userPan:'BPLPM322E',
                    userSalary:'400000',
                    userDob:'15-15-1990',
                    userMobile:'9000010000'
                    },
                applicationNumber: ''
                }

describe('Posts Reducer', () => {

    it('Should return default state', () => {
        const newState = Rootreducer(initData, {});
        expect(newState).toEqual(initData);
    });

    it('Should return new state if receiving type', () => {
        
        const newState = Rootreducer(initData, {type:"SUBMIT", payload: cardData});
        expect(newState).toEqual(expectedUserData);

    });

});