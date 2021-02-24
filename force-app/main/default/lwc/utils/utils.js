//Used to get value from Key in object
const getValueFromObject = (obj, prop) => {
    
    let value = obj[prop];
    
    if (!value && prop.includes('.')) {
        let parts = prop.split('.'),
            last = parts.pop(),
            l = parts.length,
            i = 1,
            current = parts[0];

        while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
        }
        if (obj) {
            return obj[last];
        }
    } else {
        return value;
    }
    return null;
}

const formToastPropertiesMap = (title, message, variant, type, mode, isStandardToast) => {
    return {
        title: title,
        message: message,
        variant: variant,
        type: type,
        mode: mode,
        isStandardToast: isStandardToast
    }
}



//Parse Error Detailed 
const  filterErrors = (errors) => {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter(error => !!error)
            // Extract an error message
            .map(error => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    console.log('Array.isArray(error.body)::::');
                    return error.body.map(e => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    console.log('error.body && typeof error.body.message ===d string::update');
                    let message = error.body.message;
                    message += '';
                    console.log('message::', message);
                    return  message ;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    console.log('typeof error.message:::');
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter(message => !!message)
    );
}

export {
    getValueFromObject,
    filterErrors,
    formToastPropertiesMap
}