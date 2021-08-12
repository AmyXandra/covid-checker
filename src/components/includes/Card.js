import React from 'react';

export default function Card(props) {
    const {icon, title, value} = props
    return (
        <div className="col-md-3 col-lg-3">
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex card-icon-bg">
                        <i className="i-Stopwatch"></i>
                        <div className="ml-2">
                            <h6 className="heading">{title}</h6>
                            <h2>{value}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}