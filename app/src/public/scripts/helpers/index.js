export function formDataToJSON(formData) {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = String(value)
    });
    return object;
}
