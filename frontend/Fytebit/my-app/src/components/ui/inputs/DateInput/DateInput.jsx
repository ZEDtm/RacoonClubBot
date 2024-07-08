import React from "react"
import classes from "./DateInput.module.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function DateInput() {
    const [selectedDate, setDate] = React.useState(null)

    return(
        <div wrapperClassName={classes.dateInputContainer}>
            <DatePicker
                    wrapperClassName={classes.dateInput}
                    selected={selectedDate}
                    onChange={date => {setDate(date); console.log(date)}}
                    dateFormat="Дата:  dd.MM.yyyy"
                />
        </div>
    )
}

export default DateInput