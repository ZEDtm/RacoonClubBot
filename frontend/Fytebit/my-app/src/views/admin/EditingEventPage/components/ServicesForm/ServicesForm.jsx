import styles from './ServiceForm.module.css';
import React, {createRef, useEffect} from "react";

const ServiceForm = ({ servicesData, setServicesData, servicesRefs, setServicesRefs }) => {

    useEffect(() => {
        // Создаем ссылки для каждого элемента в servicesData
        const refs = servicesData.map(() => createRef());
        setServicesRefs(refs);
    }, [servicesData, setServicesRefs]);

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...servicesData];
        updatedServices[index][field] = value;
        setServicesData(updatedServices);
    };

    const addService = () => {
        const ref = createRef();
        setServicesData([...servicesData, { name: '', price: '' }]);
        setServicesRefs([...servicesRefs, ref]);
    };

    return (
        <>
            {servicesData.map((service, index) => (
                <div key={index} className={styles.servicesContainer}>
                    <input
                        type="text"
                        placeholder="Название услуги"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        className={styles.serviceNameInput}
                    />
                    <div className={styles.servicePriceInputContainer}>
                        <span className={styles.servicePriceInputSpan}>₽</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                            className={styles.servicePriceInput}
                            ref={servicesRefs[index]}
                        />
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