import logging
import sys

def setup_logger(app):
    logger = logging.getLogger()
    log_level = logging.INFO
    logger.setLevel(log_level)

    # Crear console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)

    # Crea formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    console_handler.setFormatter(formatter)

    # Agrega handler al logger
    logger.addHandler(console_handler)

    return logger