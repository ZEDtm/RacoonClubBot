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
        <>
            {services.map((service, index) => (
                <div key={index} className="sm:col-span-6 mt-2">
                    <div className="flex text-sm font-medium leading-6 bg-[var(--custom-input-back)]">
                        <input
                            type="text"
                            placeholder="Название услуги"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                            className="w-2/3 focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                        />
                        <div
                            className="flex w-1/3">
                            <span className="flex select-none items-center pl-3 sm:text-sm">₽</span>
                            <input
                                type="text"
                                placeholder="0.00"
                                value={service.price}
                                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                            />
                        </div>

                    </div>
                </div>
            ))}
            <div className="flex justify-center text-sm">
                <button type="button" onClick={addService} className="mt-2">
                    + Добавить услугу
                </button>
            </div>
        </>
    );
};

export default ServiceForm;