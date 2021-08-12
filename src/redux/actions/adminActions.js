import {adminService} from '../services/adminService';



export const adminActions = {
    getAllCountryList,
    searchCountryList,
    getCountryStatus,
}

function getAllCountryList(setCountryList){
    return dispatch => {
        dispatch(request());
        adminService.getAllCountryList(dispatch,setCountryList)
    };
    function request() { return { type: "GETALLCOUNTRY_REQUEST" } }
}


function searchCountryList(result){
    console.log("heree", result)
    return dispatch => {
        dispatch(request());
    };
    function request() { return { type: "GETSEARCHRESULT", result } }
}


function getCountryStatus(countryName, start_date, end_date){
    return dispatch => {
        dispatch(request());
        adminService.getCountryStatus(dispatch, countryName, start_date, end_date)
    };
    function request() { return { type: "GETCOUNTRYSTATUS_REQUEST" } }
}
