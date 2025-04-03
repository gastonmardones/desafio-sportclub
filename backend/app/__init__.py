import logging
from flask import Flask
from app.config import Config
from app.api.routes import api_bp
from app.utils.logger import setup_logger
from app.exceptions import register_error_handlers

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Configurar el logger dentro del contexto de la aplicación
    with app.app_context():
        setup_logger(app)  # Pasa la instancia de la app a setup_logger

    app.register_blueprint(api_bp, url_prefix='/api')
    register_error_handlers(app)

    app.logger.info('API inicializada exitosamente')

    return app