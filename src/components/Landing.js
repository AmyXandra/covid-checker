import React from 'react';
import CountryList from './includes/CountryList';
import Title from './includes/Title';

export default function Landing(){
    return(
        <div className="container">
            <Title/>
            <div className="row mb-5">
                <div className="col-md-5">
                    <h5>180+ countries are affected by</h5>
                    <h1 className="mb-4">Covid-19</h1>
                    <p>The virus was first reported in Wuhan China on 17 Noveber, 2019 and on 11 March 2020, the WHO decleared the outbreak a pandemic.</p>
                </div>
                <div className="col-md-6 offset-md-1"></div>
            </div>

            <CountryList/>
        </div>
    )
}