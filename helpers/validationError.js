/**
 * This function is used to handle errors on the login and signup pages,
 * @param {String} page the endpoint of the page to render.
 * @param {object} error the error object gotten from the validation
 * @param {object} res the response object from the middleware
 * @returns the function would render the page that passed in the "page" param, giving the page the found errors.
 */
handleError = function (page, error, res) {
    const errors = [];

    if (error['DB_ERR']) errors.push(error['DB_ERR']);

    if (error.details) {
        for (let item of error.details) {
            if (item.path[0].includes("confirmPassword")) {
                errors.push("Password and confirm password must match.");
            } else {
                errors.push(item.message);
            }
        }
    }
    res.render(page, { title: page.toUpperCase(), errors });
}

module.exports = handleError;