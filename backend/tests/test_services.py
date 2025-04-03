from unittest.mock import patch, MagicMock

import pytest
import requests

from app.exceptions import NotFoundError, ExternalAPIError, TimeoutError, ValidationError
from app.services.beneficios_service import BeneficiosService


class TestBeneficiosService:
    """Conjunto de pruebas para la clase BeneficiosService"""

    @patch('app.services.beneficios_service.requests.get')
    def test_get_all_beneficios_success(self, mock_get, mock_beneficios_response, app):
        """Pruebe la recuperación exitosa de todos los beneficios"""
        # Setup mock response
        mock_response = MagicMock()
        mock_response.json.return_value = mock_beneficios_response
        mock_get.return_value = mock_response

        with app.app_context():
            result = BeneficiosService.get_all_beneficios()
            assert result['error'] is False
            assert result['status'] == 200
            assert len(result['body']) == 1
            assert result['body'][0]['id'] == 5
            assert result['body'][0]['comercio'] == 'ALTURA CAFE'
            assert 'categoria_general' in result['body'][0]
            assert result['body'][0]['categoria_general'] == 'Gastronomia'

    @patch('app.services.beneficios_service.requests.get')
    def test_get_all_beneficios_timeout(self, mock_get, app):
        """Pruebe el manejo del tiempo de espera al obtener todos los beneficios"""
        # Configurar una simulación para generar un tiempo de espera
        mock_get.side_effect = requests.exceptions.Timeout("Request timed out")

        with app.app_context():
            with pytest.raises(TimeoutError) as exc_info:
                BeneficiosService.get_all_beneficios()

            assert "Se agotó el tiempo de solicitud a la API externa" in exc_info.value.message

    @patch('app.services.beneficios_service.requests.get')
    def test_get_all_beneficios_http_error(self, mock_get, app):
        """Pruebe el manejo de errores HTTP al obtener todos los beneficios"""
        # Configurar una simulación para generar un error HTTP
        mock_response = MagicMock()
        response = requests.Response()
        response.status_code = 500
        error = requests.exceptions.HTTPError("500 Server Error")
        error.response = response
        mock_response.raise_for_status.side_effect = error
        mock_get.return_value = mock_response

        with app.app_context():
            with pytest.raises(ExternalAPIError) as exc_info:
                BeneficiosService.get_all_beneficios()

            assert "Error de API externa: 500 Server Error" in exc_info.value.message

    @patch('app.services.beneficios_service.requests.get')
    def test_get_beneficio_by_id_success(self, mock_get, mock_beneficio_response, app):
        """Pruebe la recuperación exitosa de un beneficio por ID"""
        mock_response = MagicMock()
        mock_response.json.return_value = mock_beneficio_response
        mock_get.return_value = mock_response

        with app.app_context():
            result = BeneficiosService.get_beneficio_by_id(8)

            assert result['error'] is False
            assert result['status'] == 200
            assert result['body']['id'] == 5
            assert result['body']['comercio'] == 'ALTURA CAFE'
            assert 'categoria_general' in result['body']
            assert result['body']['categoria_general'] == 'Gastronomia'

    @patch('app.services.beneficios_service.requests.get')
    def test_get_beneficio_by_id_not_found(self, mock_get, app):
        """Manejo de prueba 404 cuando no se encuentra beneficio"""
        mock_response = MagicMock()
        response = requests.Response()
        response.status_code = 404
        error = requests.exceptions.HTTPError("404 Not Found")
        error.response = response
        mock_response.raise_for_status.side_effect = error
        mock_get.return_value = mock_response

        with app.app_context():
            with pytest.raises(NotFoundError) as exc_info:
                BeneficiosService.get_beneficio_by_id(999)

            assert "Beneficio con ID 999 no encontrado" in exc_info.value.message

    def test_get_beneficio_by_id_invalid_id(self, app):
        """Validación de prueba de ID de beneficio"""
        with app.app_context():
            # Llamar al metodo de servicio con una identificación no válida y esperar una excepción
            with pytest.raises(ValidationError) as exc_info:
                BeneficiosService.get_beneficio_by_id("invalid")

            assert "El ID del beneficio debe ser un número" in exc_info.value.message
