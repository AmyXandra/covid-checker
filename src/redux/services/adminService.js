import axios from 'axios';
import moment from 'moment';


function getAllCountryList(dispatch,setCountryList){
    axios.get("https://api.covid19api.com/countries")
    .then((data) => {
        dispatch(onSuccess(data.data));
        setCountryList(data.data);
        localStorage.setItem("countryList", JSON.stringify(data.data));
    })
    .catch(error => {
        dispatch(onFailure(error));
    });
    function onSuccess(data) { return { type: "GETALLCOUNTRY_SUCCESS", data } }
    function onFailure(error) { return { type: "GETALLCOUNTRY_FAILURE", error } }
}


function getCountryStatus(dispatch, countryName, start_date, end_date){
    axios.get(`https://api.covid19api.com/country/${countryName}?from=${moment(start_date).format('YYYY-MM-DD')}&to=${moment(end_date).format('YYYY-MM-DD')}`)
    .then((data) => {
        dispatch(onSuccess(data.data));
    })
    .catch(error => {
        dispatch(onFailure(error));
    });
    function onSuccess(data) { return { type: "GETCOUNTRYSTATUS_SUCCESS", data } }
    function onFailure(error) { return { type: "GETCOUNTRYSTATUS_FAILURE", error } }
}


export const adminService = {
    getAllCountryList,
    getCountryStatus,
}