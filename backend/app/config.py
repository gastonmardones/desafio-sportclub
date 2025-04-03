import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SPORTCLUB_API_URL = os.getenv('SPORTCLUB_API_URL', 'https://api-beneficios.dev.sportclub.com.ar/api')
    TIMEOUT = int(os.getenv('REQUEST_TIMEOUT', 10))  # Timeout API requests en segundos
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    TESTING = False

class TestConfig(Config):
    TESTING = True
    DEBUG = True