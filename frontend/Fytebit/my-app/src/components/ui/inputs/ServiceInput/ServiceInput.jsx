import React from "react"
import classes from "./ServiceInput.module.css"


function ServiceInput() {
    return(
        <div className={classes.container}>
            <input className={classes.serviceInput} type="text" placeholder="Название"></input>
            <input className={classes.serviceInput} type="text" placeholder="Цена"></input>
        </div>
        
    )
}

export default ServiceInput