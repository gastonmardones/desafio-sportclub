import logging
import requests
import traceback
from flask import current_app
from app.exceptions import NotFoundError, ExternalAPIError, TimeoutError, ValidationError
from app.models.beneficio import Beneficio

logger = logging.getLogger(__name__)


class BeneficiosService:
    """Servicio para interactuar con la API de beneficios de SportClub"""

    @staticmethod
    def get_all_beneficios():
        """
        Obtiene todos los beneficios de la API SportClub
        Devuelve una lista normalizada de beneficios
        """
        logger.info("Obteniendo beneficios de la API SportClub")
        try:
            response = requests.get(
                f"{current_app.config['SPORTCLUB_API_URL']}/beneficios",
                timeout=current_app.config['TIMEOUT']
            )

            # Manejo de errores HTTP
            response.raise_for_status()

            data = response.json()

            # Valida la estructura de la respuesta
            if 'error' not in data or 'body' not in data:
                raise ValidationError("Formato de respuesta invalida de API externa.")

            # API error
            if data['error']:
                raise ExternalAPIError(f"Error de API externa: {data.get('message', 'Unknown error')}")

            # Normalizar data
            beneficios = Beneficio.normalize_list(data['body']['beneficios'])
            logger.info(f"Obtención exitosa de {len(beneficios)} beneficios")

            return {
                'error': False,
                'status': 200,
                'body': beneficios
            }

        except requests.exceptions.Timeout:
            logger.error("Tiempo de espera al obtener beneficios")
            logger.debug(traceback.format_exc())
            raise TimeoutError("Se agotó el tiempo de solicitud a la API externa")

        except requests.exceptions.HTTPError as e:
            logger.error(f"Error HTTP al obtener los beneficios: {str(e)}")
            logger.debug(traceback.format_exc())
            if e.response.status_code == 404:
                raise NotFoundError("Recurso no encontrado en la API externa")
            raise ExternalAPIError(f"Error de API externa: {str(e)}")

        except requests.exceptions.RequestException as e:
            logger.error(f"Solicitar excepción al obtener beneficios: {str(e)}")
            logger.debug(traceback.format_exc())
            raise ExternalAPIError(f"Error al comunicarse con la API externa: {str(e)}")

        except (ValueError, KeyError) as e:
            logger.error(f"Error al analizar la respuesta: {str(e)}")
            logger.debug(traceback.format_exc())
            raise ValidationError(f"Error al analizar la respuesta de la API externa: {str(e)}")

    @staticmethod
    def get_beneficio_by_id(beneficio_id):
        """
        Obtener un beneficio específico por ID desde la API de SportClub.
        Devuelve un objeto de beneficio normalizado.
        """
        logger.info(f"Obteniendo el beneficio con ID {beneficio_id} de la API de SportClub")
        try:
            # Validate ID
            if not str(beneficio_id).isdigit():
                raise ValidationError("El ID del beneficio debe ser un número")

            response = requests.get(
                f"{current_app.config['SPORTCLUB_API_URL']}/beneficios/{beneficio_id}",
                timeout=current_app.config['TIMEOUT']
            )

            # Check for HTTP errors
            response.raise_for_status()

            # Parse JSON response
            data = response.json()

            # Validate response structure
            if 'error' not in data or 'body' not in data:
                raise ValidationError("Formato de respuesta no válido de la API externa")

            # Check for API error
            if data['error']:
                raise ExternalAPIError(f"Error reportado por la API externa: {data.get('message', 'Error desconocido')}")

            # Normalize data
            beneficio = Beneficio.normalize(data['body'])
            logger.info(f"Beneficio obtenido correctamente con ID {beneficio_id}")

            return {
                'error': False,
                'status': 200,
                'body': beneficio
            }

        except requests.exceptions.Timeout:
            logger.error(f"Tiempo de espera al obtener el beneficio con ID {beneficio_id}")
            logger.debug(traceback.format_exc())
            raise TimeoutError("Se agotó el tiempo de solicitud a la API externa")

        except requests.exceptions.HTTPError as e:
            logger.error(f"Error HTTP al obtener el beneficio con ID {beneficio_id}: {str(e)}")
            logger.debug(traceback.format_exc())
            if e.response.status_code == 404:
                raise NotFoundError(f"Beneficio con ID {beneficio_id} no encontrado")
            raise ExternalAPIError(f"Error de API externa: {str(e)}")

        except requests.exceptions.RequestException as e:
            logger.error(f"Excepción de solicitud al obtener el beneficio con ID {beneficio_id}: {str(e)}")
            logger.debug(traceback.format_exc())
            raise ExternalAPIError(f"Error al comunicarse con la API externa: {str(e)}")

        except (ValueError, KeyError) as e:
            logger.error(f"Error al analizar la respuesta para el beneficio con ID {beneficio_id}: {str(e)}")
            logger.debug(traceback.format_exc())
            raise ValidationError(f"Error al analizar la respuesta de la API externa: {str(e)}")
