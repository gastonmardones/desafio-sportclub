import pytest
from app import create_app
from app.config import TestConfig


@pytest.fixture
def app():
    app = create_app(TestConfig)
    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def mock_beneficios_response():
    return {
        "error": False,
        "status": 200,
        "body":
            {'beneficios': [
                {'aclaratoria': 'No acumulable con otras promociones', 'categoria_general': 'Gastronomia',
                 'categoria_simple': 'Mercados', 'comercio': 'ALTURA CAFE',
                 'descripcion': 'Tienda de cafe en grano o molido.', 'descuento': 15, 'efectivo': True, 'id': 5,
                 'imagenes': [{
                     'url': 'https://eks-development-01-api-beneficios.s3.us-east-1.amazonaws.com/ALTURA%20CAFE.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6AZYOWWJNXOWKFYJ%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T231001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLWVhc3QtMSJHMEUCIQDRkz5KiyBC9zGX0MR1KJHf1O%2BjSNqusnLUX6muun%2FOKwIgdRPlktGn0yIzpga2HnuST65T9nXrOL1EdkC3Bk1u0ZwqmgUI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NjM4MDE2OTE1MzgiDPva6a8r8J9%2ByC53IyruBPtyxnKdw7Ov2%2BlG%2ByD5sZ6VUFqGsURImJd%2FUasZdSmbq55inHEGV0HZmS1HRWYZBIO2xE8uys7QTT2Z8jRGtf9qpZ7Yv%2BhwEmqngU%2Bgloh7%2F2X2X3nm3Mapn9uDFSL2oTKVH6iRnS3xfdCm01JyBNVsvWywvKVUGjxizBBt7PjmY3uVjqR2YLfrG%2B%2BnIyy8gVJdg%2BUp6PEceiwhN02dWyEoTi3K38tKd6uhRgEhO3OeB%2F4aaO7Zf4l26tD2OIhPxEJ%2BJ3CgbuoTc7lTOsrtjMLMoCFccUeLqy8YRfYmKEsBhdXFok4ltEQFMdN1Uerej%2BXJBKdBTX2UxaDtXS44u6Qpxb10Kzz76fyD1CiezSXxOSvPqbV9%2BkgGUtJAOOpN8DJ9ybqwaOQkLY2oc1F%2B1HS90SkDKNJhB9pJQrfJDgHl8PnTbM%2FeLKhzuzYBwRnl16LzgCxlJ02x5zuZCBIkbMlSJyNH6IJNuDgD4ZHX516EIJqWAVqtaypTaC5XiKUI6cPjvXEkm1i8n4PKLfsIwqIBtnx7T2KAXKIe%2Fl%2F9H9MWD38RQbwiMBQE68V9FYe4LOY3MR9a1%2FOiA8yyTZM2wj%2F8GJBgNrvQoQX79Rf9aa%2FVK8IXJjsLn9tWlrjyoiPRZyzmH29qg8B4N%2FS7WxZxb%2F2RxpimOKmuXYiMG5q3CwvTQwSR%2BlC0Ew0ZdXq9p0Cgh3JAt8xa5bnQplTb4hfOFcgjsG29oa%2FG4Dj5lQMnHiXWboK6Y2JvRZVaOcI8a2G7BLuWQ%2FUN%2FJ8xciulvQ3QObt%2BWRoo%2FFVVyzY0n42TL7hPSSo16zaVp6pf7bgk8d0w1%2FG2vwY6mwGtnvGN0JfmOc1Hbmgc%2FfbOs%2Bwp%2FvRB83dxYZlIKlSTPpsU%2FZ3K1kPni4De7tpyGXnKB9azAoGhEcoHgCLJnq5Ew9M76xZahwTtppn0%2B4cWlWZwBpgextXcaXPzo3dczT6xzfLNhivcJuFfsHt5zFOUxdpmhNChgXibKJbCNdxun69W2MNZ6kcOYTwm7RmiJZWl6dY9Rh5vr%2BaL6A%3D%3D&X-Amz-Signature=e16887332af104e14b66cf1b33f69d7b1cac1b5f871b359a68a90c88f1cce895&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'}],
                 'puntuacion': 3, 'tarjeta': False, 'vencimiento': None, 'visitas': 53}
            ]
            }
    }


@pytest.fixture
def mock_beneficio_response():
    return {
        "error": False,
        "status": 200,
        "body": {'aclaratoria': 'No acumulable con otras promociones', 'categoria_general': 'Gastronomia',
                 'categoria_simple': 'Mercados', 'comercio': 'ALTURA CAFE',
                 'descripcion': 'Tienda de cafe en grano o molido.', 'descuento': 15, 'efectivo': True, 'id': 5,
                 'imagenes': [{
                     'url': 'https://eks-development-01-api-beneficios.s3.us-east-1.amazonaws.com/ALTURA%20CAFE.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6AZYOWWJNXOWKFYJ%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T231001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLWVhc3QtMSJHMEUCIQDRkz5KiyBC9zGX0MR1KJHf1O%2BjSNqusnLUX6muun%2FOKwIgdRPlktGn0yIzpga2HnuST65T9nXrOL1EdkC3Bk1u0ZwqmgUI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NjM4MDE2OTE1MzgiDPva6a8r8J9%2ByC53IyruBPtyxnKdw7Ov2%2BlG%2ByD5sZ6VUFqGsURImJd%2FUasZdSmbq55inHEGV0HZmS1HRWYZBIO2xE8uys7QTT2Z8jRGtf9qpZ7Yv%2BhwEmqngU%2Bgloh7%2F2X2X3nm3Mapn9uDFSL2oTKVH6iRnS3xfdCm01JyBNVsvWywvKVUGjxizBBt7PjmY3uVjqR2YLfrG%2B%2BnIyy8gVJdg%2BUp6PEceiwhN02dWyEoTi3K38tKd6uhRgEhO3OeB%2F4aaO7Zf4l26tD2OIhPxEJ%2BJ3CgbuoTc7lTOsrtjMLMoCFccUeLqy8YRfYmKEsBhdXFok4ltEQFMdN1Uerej%2BXJBKdBTX2UxaDtXS44u6Qpxb10Kzz76fyD1CiezSXxOSvPqbV9%2BkgGUtJAOOpN8DJ9ybqwaOQkLY2oc1F%2B1HS90SkDKNJhB9pJQrfJDgHl8PnTbM%2FeLKhzuzYBwRnl16LzgCxlJ02x5zuZCBIkbMlSJyNH6IJNuDgD4ZHX516EIJqWAVqtaypTaC5XiKUI6cPjvXEkm1i8n4PKLfsIwqIBtnx7T2KAXKIe%2Fl%2F9H9MWD38RQbwiMBQE68V9FYe4LOY3MR9a1%2FOiA8yyTZM2wj%2F8GJBgNrvQoQX79Rf9aa%2FVK8IXJjsLn9tWlrjyoiPRZyzmH29qg8B4N%2FS7WxZxb%2F2RxpimOKmuXYiMG5q3CwvTQwSR%2BlC0Ew0ZdXq9p0Cgh3JAt8xa5bnQplTb4hfOFcgjsG29oa%2FG4Dj5lQMnHiXWboK6Y2JvRZVaOcI8a2G7BLuWQ%2FUN%2FJ8xciulvQ3QObt%2BWRoo%2FFVVyzY0n42TL7hPSSo16zaVp6pf7bgk8d0w1%2FG2vwY6mwGtnvGN0JfmOc1Hbmgc%2FfbOs%2Bwp%2FvRB83dxYZlIKlSTPpsU%2FZ3K1kPni4De7tpyGXnKB9azAoGhEcoHgCLJnq5Ew9M76xZahwTtppn0%2B4cWlWZwBpgextXcaXPzo3dczT6xzfLNhivcJuFfsHt5zFOUxdpmhNChgXibKJbCNdxun69W2MNZ6kcOYTwm7RmiJZWl6dY9Rh5vr%2BaL6A%3D%3D&X-Amz-Signature=e16887332af104e14b66cf1b33f69d7b1cac1b5f871b359a68a90c88f1cce895&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'}],
                 'puntuacion': 3, 'tarjeta': False, 'vencimiento': None, 'visitas': 53}
    }
