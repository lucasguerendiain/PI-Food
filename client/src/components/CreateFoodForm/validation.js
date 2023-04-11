const regexAllLetter = /^[A-Za-z]+$/;
const regexImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
const regexAnyLetter = /[a-z]/i
const regexAllNumbers = /^[0-9]+$/;

export function validation(inputs) {
    let errors = {};
    const {name, description, image, healthScore, steps} = inputs;
    if (healthScore < 0 || healthScore > 100 || !healthScore || !regexAllNumbers.test(healthScore)) errors.healthScore = "el numero debe ser entre 0 y 100";
    if (!regexAllLetter.test(name) || name.length > 40 || !name) errors.name = "nombre no valido (no debe contener numeros, ni pasar los 40 caracteres)";
    if (!regexImage.test(image) || !image) errors.image = "imagen no valida";
    if (!description || !regexAnyLetter.test(description)) errors.description = "resumen no valido";
    if (!steps || !regexAnyLetter.test(steps)) errors.steps = "pasos a seguir invalidos";

    return errors;
    /*
    chequear:
    nombre valido(sin numeros)
    imagen valida(url valida)
    resumen valido(no puede ser solo numeros, limite de chars)
    steps validos(no puede ser solo numeros)
    healthScore(limite numerico)
    nada debe ser null?
    */
}