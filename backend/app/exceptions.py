import logging
import traceback
from flask import jsonify

logger = logging.getLogger(__name__)

class APIError(Exception):
    status_code = 500
    
    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload
        logger.error(f"APIError: {message}")
        logger.debug(traceback.format_exc())
    
    def to_dict(self):
        rv = dict(self.payload or ())
        rv['error'] = True
        rv['message'] = self.message
        rv['status'] = self.status_code
        return rv

class NotFoundError(APIError):
    status_code = 404

class ExternalAPIError(APIError):
    status_code = 502  # Bad Gateway

class ValidationError(APIError):
    status_code = 400  # Bad Request

class TimeoutError(APIError):
    status_code = 504  # Gateway Timeout

def register_error_handlers(app):
    @app.errorhandler(APIError)
    def handle_api_error(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response
    
    @app.errorhandler(404)
    def handle_not_found(error):
        return jsonify({
            'error': True,
            'message': 'Recurso no encontrado',
            'status': 404
        }), 404
    
    @app.errorhandler(500)
    def handle_server_error(error):
        logger.error(f"Error no controlado: {str(error)}")
        logger.debug(traceback.format_exc())
        return jsonify({
            'error': True,
            'message': 'Internal server error',
            'status': 500
        }), 500