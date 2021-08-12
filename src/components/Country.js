import React, { useEffect, useState } from 'react';
import Card from './includes/Card';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../redux/actions/adminActions';
import { useParams } from 'react-router-dom';
import LineChart from './includes/LineChart';
import LineChart2 from './includes/fake';
import Title from './includes/Title';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Country() {
    const dispatch = useDispatch();
    const params = useParams();
    let countryName = params.country;

    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 30);


    let newDate = new Date();

    const [start_date, setStartDate] = useState(lastWeek);
    const [end_date, setEndDate] = useState(newDate);

    const countryStatus = useSelector((state) => state.admin.countryStatus)
    console.log()
    useEffect(() => {
        dispatch(adminActions.getCountryStatus(countryName, start_date, end_date));
    }, [dispatch, countryName, start_date, end_date])

    // const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (event) =>{
        event.preventDefault();
        // setSubmitted(true);
        dispatch(adminActions.getCountryStatus(countryName, start_date, end_date));
    }
   
    

    return (
        <div className="container">
            <Title />
            <div className="my-5">
                <h3>{countryName} Covid Overview</h3>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="row">
                        <div className="form-group col-md-3" >
                            <label htmlFor="start_date">From</label>
                            <DatePicker
                                className="form-control"
                                selected={start_date}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>

                        <div className= "form-group col-md-3" >
                            <label htmlFor="date">To</label>
                            <DatePicker
                                className="form-control"
                                selected={end_date}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>
                    </div>
                </form>
            </div>


            <div className="row">
                <Card icon={"hfh"} title={"Active Cases"} value={"50"} />
                <Card icon={"hfh"} title={"Recovered Cases"} value={"50"} />
                <Card icon={"hfh"} title={"Deaths"} value={"2"} />
            </div>


            {countryStatus.length > 0 && <LineChart lineData={countryStatus} width={400} height={300} />}
            {/* {countryStatus && <LineChart lineData={countryStatus} width={400} height={300} />} */}
            <LineChart2/>
        </div>
    )
}