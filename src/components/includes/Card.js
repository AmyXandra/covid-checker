import React from 'react';

export default function Card(props) {
    const {color, title, value} = props
    return (
        <div className="col-md-3 col-lg-3">
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex card-icon-bg">
                        <div className="ml-2 px-3">
                            <p className="heading mb-1 text-bold">{title}</p>
                            <h2 className={color + ' font-weight-bold'}>{value}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}