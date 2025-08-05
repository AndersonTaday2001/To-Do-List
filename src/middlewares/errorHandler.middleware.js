import { ApiResponse } from '../utils/responses.js';
import { CustomError } from '../utils/customErrors.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Si es un error personalizado
  if (err instanceof CustomError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Token expired');
  }

  // Errores de base de datos MySQL
  if (err.code) {
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        return ApiResponse.conflict(res, 'Duplicate entry');
      case 'ER_NO_REFERENCED_ROW_2':
        return ApiResponse.error(res, 'Referenced record does not exist', 400);
      case 'ECONNREFUSED':
        return ApiResponse.serverError(res, 'Database connection failed');
      default:
        return ApiResponse.serverError(res, 'Database error');
    }
  }

  // Error por defecto
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  return ApiResponse.serverError(res, message);
};

// Middleware para rutas no encontradas
export const notFoundHandler = (req, res) => {
  ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};