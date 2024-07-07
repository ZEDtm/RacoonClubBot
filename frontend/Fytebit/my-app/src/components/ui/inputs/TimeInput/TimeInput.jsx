import React from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from "./TimeInput.module.css"

function TimeInput() {
    const [selectedTime, setTime] = React.useState(null)
    return(
        <div wrapperClassName={classes.timeInput}>
            <DatePicker
                    className={classes.timeInputInner}
                    selected={selectedTime}
                    onChange={time => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="Время:  HH:mm"
                />
        </div>
    )
}

export default TimeInput