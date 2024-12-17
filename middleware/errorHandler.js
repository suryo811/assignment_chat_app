const globalErrorHandler = (err, req, res, next) => {

    //custom error object
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went very wrong. Try again later.'
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
        customError.statusCode = 400
    }

    //return res.status(500).json(err)
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default globalErrorHandler