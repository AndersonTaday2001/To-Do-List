export class ApiResponse {
    constructor(success, statusCode, message, data = null, errors = null){
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.timestamp = new Date().toISOString();
    }

    static success(res, date, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json(
            new ApiResponse(true, statusCode, message, date)
        );
    }

    static error (res, message = 'Error', statusCode = 500, errors = null){
        return res.status(statusCode).json(
            new ApiResponse(false, statusCode, message, null, errors)
        )
    }

    static validationError(res, errors, message = 'Validation failed'){
        return res.status(400).json(
            new ApiResponse(false, 400, message, null, errors)
        );
    }

    static notFound(res, message = 'Resource not found'){
        return res.status(404).json(
            new ApiResponse(false, 404, message)
        );
    }

    static unauthorized(res, message = 'Unauthorized access'){
        return res.status(401).json(
            new ApiResponse(false, 401, message)
        );
    }

    static forbidden(res, message = 'Access forbidden'){
        return res.status(403).json(
            new ApiResponse(false, 403, message)
        );
    }

    static conflict(res, message = 'Resource conflict'){
        return res.status(409).json(
            new ApiResponse(false, 409, message)
        );
    }

    static serverError(res, message = 'Internal server error'){
        return res.status(500).json(
            new ApiResponse(false, 500, message)
        );
    }
}