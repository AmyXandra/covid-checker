let init = {
    loading: false,
    countryList: [],
    countryStatus: [],
    searchList: [],
}

export function admin(state = init, action){
    switch (action.type) {
        case "GETALLCOUNTRY_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "GETALLCOUNTRY_SUCCESS":
            return {
                ...state,
                countryList: action.data
            };

        case "GETALLCOUNTRY_FAILURE":
            return {
                error: action.error
            };

        
        
        case "GETCOUNTRYSTATUS_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "GETCOUNTRYSTATUS_SUCCESS":
            return {
                ...state,
                countryStatus: action.data
            };

        case "GETCOUNTRYSTATUS_FAILURE":
            return {
                error: action.error
            };

        

        case "GETSEARCHRESULT":
            return {
                ...state,
                searchList: action.result
            }


        default:
            return state
    }
}