export const inputNumbersValidate = (value) => {
    const regex = /^\d+(\.\d+)?$/;
    return { isValid: regex.test(value) };
};

export const validateServicesData = (servicesData, servicesRefs) => {
    for (let i = 0; i < servicesData.length; i++) {
        if (!inputNumbersValidate(servicesData[i].price).isValid) {
            return { isValid: false, ref: servicesRefs[i] };
        }
    }
    return { isValid: true };
};

export const validateDates = (startDate, endDate) => {
    return { isValid: endDate > startDate };
};

export const inputEmptyValidate = (value) => {
    return { isValid: !(value === '')};
};