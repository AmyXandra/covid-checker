import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../redux/actions/adminActions';
import SearchCountryData from './SearchCountryData';

export default function CountryList() {
    
    // Check if country list is in the localStorage. If yes, get from localStorage. 
    // Else, call the dispatch function make api call to get it and store in local storage
    const dispatch = useDispatch();
    const[countryList, setCountryList] = useState([]);
    useEffect(() => {
        if  (localStorage.getItem('countryList') !== null) {
            const getCountryData = async () => {
                setCountryList ( JSON.parse(await localStorage.getItem('countryList')));
            }
            getCountryData();
        } 
        else {
            dispatch(adminActions.getAllCountryList(setCountryList));
        }
    }, [dispatch])
    
    const searchList = useSelector((state) => state.admin.searchList)
    

    return (
        <div>
            <SearchCountryData data={countryList} change={setCountryList}/>
            
            {/* {countryList && countryList.length > 0 &&
                countryList.map((country, i) => {
                    return (
                        <div className="card p-3 mb-2" key={i}>
                            <div className="d-flex justify-content-between align-items-center">
                               <h5 className="mb-0">{country.Country} ({country.ISO2})</h5> 
                               <a className="btn btn-primary" href= {`/country/${country.Country}`}>View Cases</a>
                            </div>
                        </div>
                    )
                })
            } */}

            {searchList.length > 0 ? 
                searchList.map((country, i) => {
                    return (
                        <div className="card p-3 mb-2" key={i}>
                            <div className="d-flex justify-content-between align-items-center">
                               <h5 className="mb-0">{country.Country} ({country.ISO2})</h5> 
                               <a className="btn btn-primary" href= {`/country/${country.Country}`}>View Cases</a>
                            </div>
                        </div>
                    )
                })

            : 
                countryList && countryList.length > 0 && countryList.map((country, i) => {
                    return (
                        <div className="card p-3 mb-2" key={i}>
                            <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{country.Country} ({country.ISO2})</h5> 
                            <a className="btn btn-primary" href= {`/country/${country.Country}`}>View Cases</a>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}