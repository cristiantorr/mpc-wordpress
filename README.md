# WordPress URL Information Tool


## Descripción de p
Este proyecto proporciona una herramienta para obtener información de sitios web WordPress a través de su API REST. Permite a los usuarios obtener y mostrar información estructurada sobre páginas, publicaciones y otros tipos de contenido de cualquier sitio WordPress que tenga la API REST habilitada.

## Características
- Obtiene información de páginas de sitios WordPress
- Muestra información de productos si está disponible
- Muestra fechas de última modificación del contenido
- Organiza la información en un formato estructurado
- Incluye manejo de errores para sitios inaccesibles

## Tecnologías Utilizadas
- Node.js
- TypeScript
- SDK de Model Context Protocol (MCP)
- API REST de WordPress

## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## Uso
La herramienta puede ser utilizada para obtener información de cualquier sitio WordPress. Ejemplo de uso:

```typescript
const blogUrl = "https://ejemplo-sitio-wordpress.com" ;
```

La herramienta devolverá información sobre:
- Páginas
- Productos (si WooCommerce está instalado)
- Fechas de última modificación
- Estructura del contenido
- Categorías y taxonomías

## Estructura de Respuesta de la API
La herramienta devuelve información en el siguiente formato:

### Páginas
- Título
- URL/Slug
- Fecha de última modificación
- Tipo de contenido
- Relaciones padre/hijo

### Productos (si están disponibles)
- Nombre del producto
- Categoría
- Características
- Fecha de última modificación

## Manejo de Errores
La herramienta incluye manejo de errores para:
- Sitios inaccesibles
- Restricciones de API
- Respuestas inválidas
- Tiempos de espera de conexión

## Dependencias
- @modelcontextprotocol/sdk
- typescript
- zod

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.