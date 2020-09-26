import React, { useState } from 'react';
import './App.css';
import { Popup, Marker } from 'react-mapbox-gl';
import AirportIcon from './airport.png'

function Airport(props) {

    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <>
            <Marker
                coordinates={[props.airport.longitude, props.airport.latitude]}
                onClick={() => openPopup()}
                anchor="bottom">
                <img style={{ height: '25px' }} alt="" src={AirportIcon} />
            </Marker>

            {
                showPopup &&
                <Popup
                    coordinates={[props.airport.longitude, props.airport.latitude]}>
                    <span style={{ float: 'right' }} onClick={() => closePopup()}>&times;</span>
                    <h4>{props.airport.name}</h4>
                    <p>{props.airport.info}</p>
                </Popup>
            }
        </>
    );
}

export default Airport;
