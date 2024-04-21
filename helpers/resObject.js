/**
 * 
 * @param {any} data contains the response (either an actual message or an error message)
 * @param {Error} error [optional] should be an error object.
 * @returns an object with the parameters explained above as properties.
 */

const resObject = (data, error = null) => ({ data, error });

module.exports = resObject;