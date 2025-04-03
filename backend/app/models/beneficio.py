class Beneficio:
    """
    Modelo para beneficio de la API
    Proporciona validación y normalización de los beneficios.
    """
    required_fields = ['id', 'comercio', 'descripcion']

    @classmethod
    def validate(cls, data):
        """Validar que los campos obligatorios estén presentes en los datos"""
        for field in cls.required_fields:
            if field not in data:
                return False, f"Missing required field: {field}"
        return True, None

    @classmethod
    def normalize(cls, data):
        """Normaliza la data de la API"""
        # Asegurar que existan campos obligatorios
        is_valid, error = cls.validate(data)
        if not is_valid:
            raise ValueError(error)

        # Garantizar una estructura consistente
        normalized = {
            'id': data.get('id'),
            'comercio': data.get('comercio', ''),
            'descripcion': data.get('descripcion', ''),
            'aclaratoria': data.get('aclaratoria', ''),
            'descuento': data.get('descuento', 0),
            'tarjeta': data.get('tarjeta', False),
            'efectivo': data.get('efectivo', False),
            'vencimiento': data.get('vencimiento'),
            'puntuacion': data.get('puntuacion', 0),
            'visitas': data.get('visitas', 0),
            'categoria_general': data.get('CategoriaGeneral', {}).get('nombre', '') or data.get('categoria_general',
                                                                                                ''),
            'categoria_simple': data.get('CategoriaSimple', {}).get('nombre', '') or data.get('categoria_simple', ''),
            'imagenes': []
        }

        # Normaliza URLs de imagen
        if 'Imagens' in data and isinstance(data['Imagens'], list):
            for img in data['Imagens']:
                if 'url' in img:
                    normalized['imagenes'].append({'url': img['url']})

        return normalized

    @classmethod
    def normalize_list(cls, data_list):
        """Normaliza lista de beneficios"""
        normalized_list = []
        for item in data_list:
            try:
                normalized_list.append(cls.normalize(item))
            except ValueError:
                # Saltea datos inválidos
                continue
        return normalized_list
