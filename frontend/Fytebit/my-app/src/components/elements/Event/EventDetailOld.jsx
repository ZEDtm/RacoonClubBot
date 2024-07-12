import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../views/EditEvent/EventDetail.module.css'
import { getEventById } from '../../../api/Client';
import DateRangePicker from '../../ui/inputs/DatePicker/DateRangePicker'
import ServiceForm from '../../ui/inputs/ServicesForm/ServicesForm';

function EventDetail() {
    const { _id } = useParams();
    // const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [services, setServices] = useState([]);

    const handleServiceSubmit = (servicesData) => {
        setServices(servicesData);
        console.log(servicesData);
    };

        const event = {
        _id: 'asdasdasdasdasdasdasdaasdasds',
        name: 'Казантип',
        price: 100,
        date: "16.06.2024",
        editor: 'Виталий'
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    const handleSubmit = () => {
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Start Time:', startTime);
        console.log('End Time:', endTime);
    };

    return (
        <div className="event-detail-card">
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6">
                    Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">

                        <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                            </label>

                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>

            <div>
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    startTime={startTime}
                    endTime={endTime}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 ">Название
                        мероприятия</label>
                    <div className="mt-2">
                        <div
                            className="flex r sm:max-w-md form-input">
                            <span className="flex select-none items-center pl-3 sm:text-sm">@</span>
                            <input type="text" name="username" id="username" autoComplete="username"
                                   className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                                   placeholder="janesmith"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 ">
                    Описание мероприятия
                </label>
                <div className="mt-2">
                <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="p-1 bg-transparent block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md text-base sm:leading-6 focus:outline-none form-input"
                    defaultValue={''}
                />
                </div>
                <p className="mt-3 text-sm leading-6">Write a few sentences about yourself.</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 ">Ссылка</label>
                    <div className="mt-2">
                        <div
                            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 sm:text-sm">@</span>
                            <input type="text" name="username" id="username" autoComplete="username"
                                   className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                                   placeholder="janesmith"/>
                        </div>
                    </div>
                </div>
            </div>

            <label htmlFor="username" className="block text-sm font-medium leading-6 ">Услуги</label>
            <ServiceForm onSubmit={handleServiceSubmit} />

            <div className="flex justify-between">
                <div className="w-2/5 mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 ">Цена</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 sm:text-sm">@</span>
                                <input type="text" name="username" id="username" autoComplete="username"
                                       className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                                       placeholder="janesmith"/>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-2/5 mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 ">Автор</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 sm:text-sm">@</span>
                                <input type="text" name="username" id="username" autoComplete="username"
                                       className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                                       placeholder="janesmith" disabled={true}/>

                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>

    );
}

export default EventDetail;