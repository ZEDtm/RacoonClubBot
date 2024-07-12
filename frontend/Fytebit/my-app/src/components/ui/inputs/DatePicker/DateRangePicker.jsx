import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css'; // Import your styles

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
            <label htmlFor="username" className="mb-2 block text-base font-medium leading-6 ">Начало мероприятия</label>
            <div
                className="flex justify-center text-base font-medium leading-6 bg-[var(--custom-input-back)]">
                <DatePicker
                    selected={startDate}
                    onChange={onStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="Дата:  dd.MM.yyyy"
                    customInput={<input
                                        className="w-4/5 text-center box-border focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[var(--color-text)] sleading-6 focus:outline-none text-base"
                                        placeholder="Select start date"/>}
                />
                <DatePicker
                    selected={startTime}
                    onChange={onStartTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="Время:  HH:mm"
                    customInput={<input type="readonly"
                                        className="w-4/5 text-center box-border focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[var(--color-text)]  leading-6 focus:outline-none text-base"
                                        placeholder="Select start date"/>}

                />
            </div>
            <label htmlFor="username" className="mb-2 block pt-2 text-base font-medium leading-6 ">Конец мероприятия</label>
            <div
                className="flex justify-center  text-base font-medium leading-6 bg-[var(--custom-input-back)]">

                <DatePicker
                    selected={endDate}
                    onChange={onEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="Дата:  dd.MM.yyyy"
                    customInput={<input type="text"
                                        className="w-4/5 text-center box-border focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[var(--color-text)] leading-6 focus:outline-none text-base"
                                        placeholder="Select start date"/>}

                />
                <DatePicker
                    selected={endTime}
                    onChange={onEndTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="Время:  HH:mm"
                    customInput={<input type="text"
                                        className="w-1/2 text-center focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[var(--color-text)] leading-6 focus:outline-none text-base"
                                        placeholder="Select start date"/>}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;