import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './EditingEventPage.module.css';
import { getEventById } from '../../../api/Client';
import DateRangePicker from './components/DatePicker/DateRangePicker';
import ServiceForm from './components/ServicesForm/ServicesForm';
import ImagesScrollBarPicker from "./components/ImagesScrollbarPicker/ImagesScrollbarPicker";
import BaseUrlContext from "../../../api/BaseUrlContext";
import {useModal} from "../../../components/elements/Modal/ModalProvider";

import {validateServicesData, inputNumbersValidate, validateDates, inputEmptyValidate} from "./validator/validator"

function EditingEventPage() {
    const baseUrl = useContext(BaseUrlContext);
    const { openModal } = useModal();
    const { _id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            const token = '123';
            try {
                const data = await getEventById(baseUrl, token, _id);
                if (data) {
                    setEvent(data);
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [_id, baseUrl]);

    const eventNameRef = useRef(null);
    const eventDescriptionRef = useRef(null);
    const eventLinkRef = useRef(null);
    const eventPriceRef = useRef(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [servicesData, setServicesData] = useState([]);
    const [servicesRefs, setServicesRefs] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (event) {
            setStartDate(new Date(event.date_time.start));
            setEndDate(new Date(event.date_time.end));
            setStartTime(new Date(event.date_time.start));
            setEndTime(new Date(event.date_time.end));
            setServicesData(event.services || [{ name: '', price: '' }]);
            setMainImage(event.main_image);
            setImages(event.images);
        }
    }, [event]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    const handleSubmit = async () => {
        let validationResult = inputNumbersValidate(eventPriceRef.current.value)
        if (!validationResult.isValid) {
            openModal({
                label: "Ошика в поле!",
                unSuccess: true,
                content: 'В поле "Базовая цена" вводить можно только числа!'
            });
            eventPriceRef.current.focus();
            eventPriceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }

        validationResult = validateServicesData(servicesData, servicesRefs);
        if (!validationResult.isValid) {
            openModal({
                label: "Ошика в поле!",
                unSuccess: true,
                content: 'В поле "Цена" вводить можно только числа!'
            });
            validationResult.ref.current.focus();
            validationResult.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }
        for (let i=0; i < servicesData.length; i++) {
            servicesData[i].price = parseFloat(servicesData[i].price)
        }

        startDate.setHours(startTime.getHours())
        startDate.setMinutes(startTime.getMinutes())
        endDate.setHours(endTime.getHours())
        endDate.setMinutes(endTime.getMinutes())

        const date_time = { startDate: startDate, endDate: endDate}

        validationResult = validateDates(date_time.startDate, date_time.endDate)
        if (!validationResult.isValid) {
            openModal({
                label: "Ошика в дате!",
                unSuccess: true,
                content: 'Дата конца мероприятия не может быть меньше начала!'
            });
            return
        }

        validationResult = inputEmptyValidate(eventNameRef.current.value)
        if (!validationResult.isValid) {
            openModal({
                label: "Ошика в поле названия!",
                unSuccess: true,
                content: 'Название мероприятия не может быть пустым!'
            });
            eventNameRef.current.focus();
            eventNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }

        validationResult = inputEmptyValidate(eventDescriptionRef.current.value)
        if (!validationResult.isValid) {
            openModal({
                label: "Ошика в поле описания!",
                unSuccess: true,
                content: 'Описание мероприятия не может быть пустым!'
            });
            eventDescriptionRef.current.focus();
            eventDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }



        const updatedEvent = {
            name: eventNameRef.current.value,
            description: eventDescriptionRef.current.value,
            link: {
                url: eventLinkRef.current.value,
                text: event.link.text
            },
            price: parseFloat(eventPriceRef.current.value),
            date_time: {
                start: date_time.startDate,
                end: date_time.endDate
            },
            services: servicesData,
            images: images,
            main_image: mainImage
        };


        try {
            const response = await fetch(`http://localhost:8000/events/update/${_id}`, {
                method: 'POST',
                body: JSON.stringify(updatedEvent)
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div>
            <div className={styles.eventTitle}>МЕРОПРИЯТИЕ</div>
            <div className={styles.eventId}>{event._id}</div>

            <div className={styles.mainContainer}>
                <div className={styles.eventName}>{event.name}</div>

                <ImagesScrollBarPicker mainImage={mainImage} setMainImage={setMainImage} images={images} setImages={setImages} _id={_id}/>

                <div className={styles.detailMainContainer}>
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
                    </div>

                    <div className={styles.eventNameContainer}>
                        <div>
                            <label htmlFor="eventName" className={styles.eventInputLabel}>
                                Название мероприятия
                            </label>
                            <div className={styles.eventInputAreaContainer}>
                                <div className={styles.eventInputAreaContainerArea}>
                                    <input type="text" name="eventName" id="eventName" autoComplete="eventName"
                                           className={styles.inputField}
                                           placeholder=""
                                           defaultValue={event.name}
                                           ref={eventNameRef} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventDescriptionContainer}>
                        <label htmlFor="eventDescription" className={styles.eventInputLabel}>
                            Описание мероприятия
                        </label>
                        <div className={styles.eventInputAreaContainer}>
                            <textarea
                                id="eventDescription"
                                name="eventDescription"
                                rows={3}
                                className={styles.inputFieldDescription}
                                defaultValue={event.description}
                                ref={eventDescriptionRef} />
                        </div>
                    </div>

                    <div className={styles.eventLinkContainer}>
                        <div>
                            <label htmlFor="eventLink" className={styles.eventInputLabel}>
                                Ссылка
                            </label>
                            <div className={styles.eventInputAreaContainer}>
                                <div className={styles.eventInputAreaContainerArea}>
                                    <span className={styles.eventInputAreaSpan}>
                                        https://
                                    </span>
                                    <input type="text" name="eventLink" id="eventLink" autoComplete="eventLink"
                                           className={styles.inputField}
                                           placeholder=""
                                           defaultValue={event.link.url}
                                           ref={eventLinkRef} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventServicesContainer}>
                        <label htmlFor="eventServices" className={styles.eventInputLabel}>Услуги</label>
                    </div>
                    <ServiceForm servicesData={servicesData} setServicesData={setServicesData} servicesRefs={servicesRefs} setServicesRefs={setServicesRefs} />

                    <div className="flex">
                        <div className={styles.eventPriceContainer}>
                            <div className="">
                                <label htmlFor="eventPrice" className={styles.eventInputLabel}>Базовая стоимость посещения</label>
                                <div className={styles.eventPriceResizeContainer}>
                                    <div className={styles.eventInputAreaContainerArea}>
                                        <span className={styles.eventInputAreaSpan}>₽</span>
                                        <input type="number" name="eventPrice" id="eventPrice" autoComplete="eventPrice"
                                               className={styles.inputPriceField}
                                               placeholder="0.00"
                                               defaultValue={event.price}
                                               ref={eventPriceRef}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancelButton} type="reset">Отмена</button>
                        <button className={styles.applyButton} type="button" onClick={() => handleSubmit()}>Применить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditingEventPage;