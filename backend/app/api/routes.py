import logging
from flask import Blueprint, jsonify
from flask_cors import CORS

from app.services.beneficios_service import BeneficiosService

logger = logging.getLogger(__name__)
api_bp = Blueprint('api', __name__)
# Habilita CORS para todas las rutas del Blueprint
CORS(api_bp)

@api_bp.route('/beneficios', methods=['GET'])
def get_beneficios():
    """
    Endpoint para obtener todos los beneficios
    Devuelve la lista normalizada de la API
    """
    logger.info("API request recibida: GET /api/beneficios")
    result = BeneficiosService.get_all_beneficios()
    return jsonify(result)

@api_bp.route('/beneficios/<beneficio_id>', methods=['GET'])
def get_beneficio(beneficio_id):
    """
    Endpoint para obtener un beneficio específico por ID
    Devuelve el beneficio normalizado de la API
    """
    logger.info(f"API request recibida: GET /api/beneficios/{beneficio_id}")
    result = BeneficiosService.get_beneficio_by_id(beneficio_id)
    return jsonify(result)