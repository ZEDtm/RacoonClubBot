import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditingEventPage.module.css'
import { getEventById } from '../../../api/Client';
import DateRangePicker from './components/DatePicker/DateRangePicker'
import ServiceForm from './components/ServicesForm/ServicesForm';
import FileInput from "./components/FileInput/FileInput";
import Icons from "../../../components/ui/Icons/Icons";
import ImagesScrollBarPicker from "./components/ImagesScrollbarPicker/ImagesScrollbarPicker";

function EditingEventPage() {
    const { _id } = useParams();
    const event = {
        _id: 'asdasdasdasdasdasdasdaasdasds',
        name: 'Сочи 2024',
        description: "Приглашаем вас на яркий и веселый фестиваль в Сочи. Участвуйте в концертах, мастер-классах и других мероприятиях, которые подарят вам множество положительных эмоций.",
        link: 'google.com',
        price: 100,
        date_time: {
            start: "2024-08-07 10:30",
            end: "2024-08-08 10:30",
        },
        services: [
            { name: '', price: '' }
        ],
        main_image: {src: "/image_4.jpg", id: 10},
        images: [
            {src: "/image_1.jpg", id: 1},
            {src: "/image_2.jpg", id: 2},
            {src: "/image_4.jpg", id: 3},
            {src: "/image_5.jpg", id: 4},
            {src: "/image_6.jpg", id: 5}
        ],
        editor: 'Виталий',
    }
    const eventNameRef = useRef(null);
    const eventDescriptionRef = useRef(null);
    const eventLinkRef = useRef(null);
    const eventPriceRef = useRef(null);



    // Обработчик загрузки страницы
    const [loading, setLoading] = useState(false);

    // DatePicker
    const [startDate, setStartDate] = useState(new Date(event.date_time.start));
    const [endDate, setEndDate] = useState(new Date(event.date_time.end));
    const [startTime, setStartTime] = useState(new Date(event.date_time.start));
    const [endTime, setEndTime] = useState(new Date(event.date_time.end));

    // ServicesForm
    const [servicesData, setServicesData] = useState(event.services? event.services: [{ name: '', price: '' }])

    // Images
    const [mainImage, setMainImage] = useState(event.main_image);

    const [images, setImages] = useState(event.images);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    const handleSubmit = () => {
        const result = {
            _id: event._id,
            name: eventNameRef.current.value,
            description: eventDescriptionRef.current.value,
            link: eventLinkRef.current.value,
            price: eventPriceRef.current.value,
            date_time: {
                start: "2024-08-07 10:30",
                end: "2024-08-08 10:30",
            },
            services: servicesData,
            main_image: mainImage,
            images: images,
            editor: 'Виталий',
        }
        console.log(result)

    };



    return (
        <div>
            <div className={styles.eventTitle}>МЕРОПРИЯТИЕ</div>
            <div className={styles.eventId}>{event._id}</div>

            <div className={styles.mainContainer}>
                <div className={styles.eventName}>{event.name}</div>

                <ImagesScrollBarPicker mainImage={mainImage} setMainImage={setMainImage} images={images} setImages={setImages}/>

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
                            <label htmlFor="evemtName" className={styles.eventInputLabel}>
                                Название мероприятия
                            </label>
                            <div className={styles.eventInputAreaContainer}>
                                <div className={styles.eventInputAreaContainerArea}>
                                    <input type="text" name="evemtName" id="evemtName" autoComplete="evemtName"
                                           className={styles.inputField}
                                           placeholder=""
                                           defaultValue={event.name}
                                           ref={eventNameRef}/>
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
                        ref={eventDescriptionRef}/>
                        </div>
                    </div>

                    <div className={styles.eventLinkContainer}>
                        <div>
                            <label htmlFor="eventLink" className={styles.eventInputLabel}>
                                Ссылка
                            </label>
                            <div className={styles.eventInputAreaContainer}>
                                <div
                                    className={styles.eventInputAreaContainerArea}>
                                    <span className={styles.eventInputAreaSpan}>
                                        https://
                                    </span>
                                    <input type="text" name="eventLink" id="eventLink" autoComplete="eventLink"
                                           className={styles.inputField}
                                           placeholder=""
                                           defaultValue={event.link}
                                           ref={eventLinkRef}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventServicesContainer}>
                        <label htmlFor="eventServices" className={styles.eventInputLabel}>Услуги</label>
                    </div>
                        <ServiceForm servicesData={servicesData} setServicesData={setServicesData} />


                    <div className="flex">
                        <div className={styles.eventPriceContainer}>
                            <div className="">
                                <label htmlFor="eventPrice" className={styles.eventInputLabel}>Базовая
                                    стоимость посещения</label>
                                <div className={styles.eventPriceResizeContainer}>
                                    <div className={styles.eventInputAreaContainerArea}>
                                        <span className={styles.eventInputAreaSpan}>₽</span>
                                        <input type="text" name="eventPrice" id="eventPrice" autoComplete="eventPrice"
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
                        <button className={styles.applyButton} type="button" onClick={handleSubmit}>Применить</button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditingEventPage;