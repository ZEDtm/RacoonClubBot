import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetail.module.css'
import { getEventById } from '../../api/Client';
import DateRangePicker from '../../components/ui/inputs/DatePicker/DateRangePicker'
import ServiceForm from '../../components/ui/inputs/ServicesForm/ServicesForm';
import FileInput from "../../components/ui/inputs/FileInput/FileInput";
import Icons from "../../components/ui/Icons/Icons";

function EventDetail() {
    const { _id } = useParams();
    // const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [selectedFile, setSelectedFile] = useState(null);

    const [images, setImages] = useState([
        {src: "/image_1.jpg", id: 1},
        {src: "/image_2.jpg", id: 2},
        {src: "/image_4.jpg", id: 3},
        {src: "/image_5.jpg", id: 4},
        {src: "/image_6.jpg", id: 5}
    ]);



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

    // Обработкич FileInput
    const handleFileChange = (file) => {
        const newImage = {
            src: URL.createObjectURL(file),
            id: images.length + 1
        };
        setImages([newImage, ...images]);
    };



    return (
        <div>
            <div className={styles.eventTitle}>МЕРОПРИЯТИЕ</div>
            <div className={styles.eventId}>{event._id}</div>

            <div className={styles.mainContainer}>
                <div className={styles.eventName}>{event.name}</div>

                <div>
                    <div className={styles.imageContainer}>
                        <img className={styles.eventImage} src="/image_3.jpg" alt="Event Image"/>
                    </div>

                    <div className={styles.scrollableImages}>
                        <div className={styles.imgInputContainer}>
                            <div className={styles.imgInputContainerDiv}>
                                <FileInput onFileChange={handleFileChange}/>
                                <div className={styles.imgInputContainerDivIcon}>
                                    <Icons type="imageInput" width="30px" height="30px" color="var(--color-heading)" className={styles.imgInputIcon} />
                                </div>

                            </div>
                        </div>
                        {images.map(image => (
                            <img className={styles.imageItem} src={image.src} alt="Event Images" key={image.id}/>
                        ))}
                    </div>
                </div>

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
                            <label htmlFor="username" className={styles.eventInputLabel}>
                                Название мероприятия
                            </label>
                            <div className={styles.eventInputAreaContainer}>
                                <div className={styles.eventInputAreaContainerArea}>
                                    <input type="text" name="evemtName" id="evemtName" autoComplete="evemtName"
                                           className={styles.inputField}
                                           placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventDescriptionContainer}>
                        <label htmlFor="about" className={styles.eventInputLabel}>
                            Описание мероприятия
                        </label>
                        <div className={styles.eventInputAreaContainer}>
                    <textarea
                        id="eventDescription"
                        name="eventDescription"
                        rows={3}
                        className={styles.inputFieldDescription}
                        defaultValue={''}
                    />
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
                                           placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventServicesContainer}>
                        <label htmlFor="eventServices" className={styles.eventInputLabel}>Услуги</label>
                    </div>
                        <ServiceForm onSubmit={handleServiceSubmit}/>


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
                                               placeholder="0.00"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancelButton} type="reset">Отмена</button>
                        <button className={styles.applyButton} type="button">Применить</button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default EventDetail;