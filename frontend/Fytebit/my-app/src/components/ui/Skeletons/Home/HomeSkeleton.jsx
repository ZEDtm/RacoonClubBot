import './HomeSkeleton.css'
import React from "react";


export default function HomeSkeleton() {
    return (
        <div className="flex event-prev-card">
        <div className="flex-none">
            <div className="w-12 h-12 event-prev-card preimage"></div>
        </div>
        <div className="flex-grow ml-2">
            <div className="flex items-start">
                <div className="h-5 flex-grow event-prev-card top"></div>
            </div>
            <div className="pt-2 flex items-start">
                <div className="h-5 flex-grow event-prev-card bottom"></div>
            </div>
        </div>
    </div>
    );
}

