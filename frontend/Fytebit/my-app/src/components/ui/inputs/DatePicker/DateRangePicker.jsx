import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css';
import styles from './DateRangePicker.module.css';
import Icons from "../../Icons/Icons"; // Import your styles

const DateRangePicker = ({
     startDate,
     endDate,
     startTime,
     endTime,
     onStartDateChange,
     onEndDateChange,
     onStartTimeChange,
     onEndTimeChange,
}) => {
    return (
        <div>
            <label htmlFor="dateStart" className={styles.dateStartInputLabel}>
                Начало мероприятия
            </label>
            <div className={styles.datePickerContainer}>
                <div className={styles.inputIconContainer}>
                    <Icons type="calendar" width="1.2rem" height="2.2rem" color="var(--color-text)"/>
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={onStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd.MM.yyyy"
                    customInput={<input className={styles.inputField}/>}/>
                <div className={styles.inputIconContainer}>
                    <Icons type="clock" width="1.2rem" height="2.2rem" color="var(--color-text)"/>
                </div>

                <DatePicker
                    selected={startTime}
                    onChange={onStartTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    customInput={<input className={styles.inputField}/>}/>
            </div>

            <label htmlFor="dateEnd" className={styles.dateEndInputLabel}>
                Конец мероприятия
            </label>
            <div className={styles.datePickerContainer}>
                <div className={styles.inputIconContainer}>
                    <Icons type="calendar" width="1.2rem" height="2.2rem" color="var(--color-text)"/>
                </div>
                <DatePicker
                    selected={endDate}
                    onChange={onEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd.MM.yyyy"
                    customInput={<input className={styles.inputField}/>}/>

                <div className={styles.inputIconContainer}>
                    <Icons type="clock" width="1.2rem" height="2.2rem" color="var(--color-text)"/>
                </div>
                <DatePicker
                    selected={endTime}
                    onChange={onEndTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    customInput={<input className={styles.inputField}/>}/>
            </div>
        </div>
    );
};

export default DateRangePicker;