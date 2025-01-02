const success = (res, data = {}, message) => {
    res.status(200).json({
        data: data,
        message: message,
    })
}

const error = (res, message) => {
    res.status(400).json({
        message: message
    })
}

const validationError = (res, error) => {
    res.status(422).json({
        message: "Validation error",
        error: error
    })
}

const exceptionError = (res, error) => {
    res.status(500).json({
        message: "Exception error",
        error: error
    })
}

module.exports = {
    success: success,
    error: error,
    validationError: validationError,
    exceptionError: exceptionError
}