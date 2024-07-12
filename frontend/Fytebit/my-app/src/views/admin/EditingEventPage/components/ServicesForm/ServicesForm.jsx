import styles from './ServiceForm.module.css';

const ServiceForm = ({ servicesData, setServicesData }) => {

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...servicesData];
        updatedServices[index][field] = value;
        setServicesData(updatedServices);
    };

    const addService = () => {
        setServicesData([...servicesData, { name: '', price: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedServices = servicesData.map((service, index) => ({
            [`service${index + 1}`]: { name: service.name, price: service.price }
        }));
        console.log(formattedServices);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                            type="text"
                            placeholder="0.00"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                            className={styles.servicePriceInput}
                        />
                    </div>
                </div>
            ))}
            <div className={styles.serviceButtonContainer}>
                <button type="button" onClick={addService} className={styles.addButton}>
                    + Добавить услугу
                </button>
            </div>
        </form>
    );
};

export default ServiceForm;