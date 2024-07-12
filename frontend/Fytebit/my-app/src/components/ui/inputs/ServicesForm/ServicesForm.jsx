import React, { useState } from 'react';
import styles from './ServiceForm.module.css'

const ServiceForm = ({ onSubmit }) => {
    const [services, setServices] = useState([{ name: '', price: '' }]);

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const addService = () => {
        setServices([...services, { name: '', price: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedServices = services.map((service, index) => ({
            [`service${index + 1}`]: { name: service.name, price: service.price }
        }));
        onSubmit(formattedServices);
    };

    return (
        <>
            {services.map((service, index) => (
                <div key={index} className={styles.servicesContainer}>
                    <input
                        type="text"
                        placeholder="Название услуги"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        className={styles.serviceNameInput}/>
                    <div className={styles.servicePriceInputContainer}>
                        <span className={styles.servicePriceInputSpan}>₽</span>
                        <input
                            type="text"
                            placeholder="0.00"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                            className={styles.servicePriceInput} />
                    </div>
                </div>
            ))}
            <div className={styles.serviceButtonContainer}>
                <button type="button" onClick={addService} className={styles.addButton}>
                    + Добавить услугу
                </button>
            </div>
        </>
    );
};

export default ServiceForm;