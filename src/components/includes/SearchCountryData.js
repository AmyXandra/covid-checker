import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {adminActions} from '../../redux/actions/adminActions';


export default function SearchCountryData(data) {
    const [input, setInput] = useState({search:""});
    const {search} = input;
    const dispatch = useDispatch();

    const handleSearch = (event) =>{
        const { name, value } = event.target;
        setInput(input => ({ ...input, [name]: value }));
        
    }

    function filterIt(arr, searchKey) {
        return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
      }
      
    // const [result, setResult] = useState([]);  
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSubmitted(true);
        // setResult(filterIt(data.data, input.search));
        dispatch(adminActions.searchCountryList(filterIt(data.data, input.search),))
    }


    return (
        <div className="mb-4 d-flex justify-content-between">
            <form className="w-100" onSubmit={handleSubmit}>
                <div className="row">
                    <div className={"form-group col-md-4" + (submitted && !search ? " is-invalid" : "")}>
                        <input className="form-control w-100" name="search" placeholder="Search country" onChange={handleSearch} />
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-rounded btn-primary btn-block">
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <a href="/" className="btn btn-rounded btn-outline-primary btn-block">All Countries</a>
            </div>
        </div>


    )
}