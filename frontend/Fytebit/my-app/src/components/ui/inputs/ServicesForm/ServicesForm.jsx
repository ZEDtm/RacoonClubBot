import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            {services.map((service, index) => (
                <div key={index} className="sm:col-span-6 mt-4">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            placeholder="Название услуги"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                            className="w-2/5 focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                        />
                        <input
                            type="text"
                            placeholder="Цена"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                            className="w-2/5 focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                        />
                    </div>
                </div>
            ))}
            <button type="button" onClick={addService} className="mt-4">
                Добавить услугу
            </button>
            <button type="submit" className="mt-4">Отправить</button>
        </form>
    );
};

export default ServiceForm;