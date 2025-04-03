# SportClub Beneficios - Desafío Técnico

Este repositorio contiene la solución al desafío técnico de SportClub Beneficios. La solución está compuesta por un backend en Flask y un frontend en React para presentar los datos de la API de beneficios proporcionada.

## Enfoque de la Solución

- **Backend:** Se desarrolló una API en Flask que actúa como intermediaria entre el frontend y la API de SportClub. La API maneja errores, tiempos de espera y datos corruptos, siguiendo principios de Clean Architecture.
- **Frontend:** Se construyó una aplicación en React con filtros, paginación y almacenamiento de favoritos en LocalStorage.
- **Testing:** Se implementaron pruebas unitarias y de integración en ambas partes del proyecto.
- **Docker:** Ambas aplicaciones están dockerizadas para facilitar su despliegue.

---

## **Backend - API en Flask**

### Tecnologías
- Python 3.12
- Flask
- Requests
- Logging
- Pytest

### Endpoints
- `GET /api/beneficios` → Recupera la lista de beneficios desde la API de SportClub.
- `GET /api/beneficios/:id` → Recupera el detalle de un beneficio por ID.


---

## **Frontend - Aplicación en React**

### Tecnologías
- React
- Zustand
- Axios
- React Router
- Tailwind CSS
- Vitest y React Testing Library

### Características
- Listado de beneficios con filtros por nombre y estado.
- Detalle de cada beneficio.
- Marcado de beneficios como favoritos (almacenados en LocalStorage).
- Paginación.
- Carga diferida (lazy loading) de imágenes.
- Diseño responsivo y accesibilidad WCAG 2.1 AA.

### Rutas
- `/beneficios` → Lista de beneficios.
- `/beneficios/:id` → Detalle de un beneficio.

---

## **Docker y Despliegue**

Ambas aplicaciones están dockerizadas. Para ejecutar el proyecto, usa:

```sh
  docker-compose up --build
```

Esto levantará el backend en el puerto 5000 y el frontend en el 3000.

---

## **Testing**

Ejecutar pruebas en el backend:
```sh
  pytest
```

Ejecutar pruebas en el frontend:
```sh
  npm test
```

---
