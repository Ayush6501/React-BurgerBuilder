export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength  && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }

    if (rules.email) {
        if (!value.includes('@')) {
            isValid = false;
        }
    }

    return isValid;
}
