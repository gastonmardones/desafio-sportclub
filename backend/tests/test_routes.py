import json
from unittest.mock import patch


def test_get_beneficios(client, mock_beneficios_response):
    """Test GET /api/beneficios endpoint"""
    with patch('app.services.beneficios_service.BeneficiosService.get_all_beneficios') as mock_get:
        mock_get.return_value = mock_beneficios_response

        # Hace una request al endpoint
        response = client.get('/api/beneficios')

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['error'] is False
        assert len(data['body']['beneficios']) == 1
        assert data['body']['beneficios'][0]['id'] == 5
        assert data['body']['beneficios'][0]['comercio'] == 'ALTURA CAFE'

        # Verificar que se llamó al metodo de servicio
        mock_get.assert_called_once()


def test_get_beneficio_by_id(client, mock_beneficio_response):
    """Test GET /api/beneficios/:id endpoint"""
    with patch('app.services.beneficios_service.BeneficiosService.get_beneficio_by_id') as mock_get:
        mock_get.return_value = mock_beneficio_response

        # Hace una request al endpoint
        response = client.get('/api/beneficios/8')

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['error'] is False
        assert data['body']['id'] == 5
        assert data['body']['comercio'] == 'ALTURA CAFE'

        # Verifique que el metodo de servicio se llamó con la identificación correcta
        mock_get.assert_called_once_with('8')


def test_get_beneficio_not_found(client):
    """Respuesta de prueba 404 cuando no se encuentra el beneficio"""
    with patch('app.services.beneficios_service.BeneficiosService.get_beneficio_by_id') as mock_get:
        from app.exceptions import NotFoundError
        mock_get.side_effect = NotFoundError("Beneficio con ID 999 no encontrado")

        response = client.get('/api/beneficios/999')

        assert response.status_code == 404
        data = json.loads(response.data)
        assert data['error'] is True
        assert 'no encontrado' in data['message'].lower()
