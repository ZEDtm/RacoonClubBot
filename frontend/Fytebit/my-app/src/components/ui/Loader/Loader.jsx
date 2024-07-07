import './Loader-styles.css'
import FyteLogo from '../Icons/FyteLogo'
import React from "react";


export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center loader">
            <FyteLogo width="150px" height="150px" color="var(--color-heading)"/>
            <svg className="container" viewBox="0 0 40 40" height="40" width="40">
                <circle className="track" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5px" fill="none" />
                <circle className="car" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5px" fill="none" />
            </svg>
        </div>
    );
}