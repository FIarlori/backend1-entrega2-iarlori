# Entrega 2 – API de Productos y Carritos con Vistas y WebSockets

Servidor backend desarrollado con Node.js + Express para gestión de e-commerce, con persistencia en archivos JSON (fs). Incluye vistas dinámicas con Handlebars y actualizaciones en tiempo real mediante WebSockets con Socket.io. Escucha en puerto **8080**.

## 📋 Requisitos técnicos
- Node.js v18+ (Recomendado LTS)
- npm v9+
- Postman o similar para probar endpoints de la API
- Navegador web para probar las vistas

## 📦 Instalación
```bash
npm install
```

## 🚀 Ejecución
```bash
node src/app.js
```
O para desarrollo con recarga automática:
```bash
npm run dev
```

## 🛠️ Dependencias
- **express**: Framework para el servidor HTTP
- **express-handlebars**: Motor de plantillas para vistas dinámicas
- **socket.io**: Para actualizaciones en tiempo real vía WebSockets
- **nodemon** (dev): Para recarga automática en desarrollo

## 🌐 Endpoints disponibles

### API de Productos
| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | /api/products                | Obtener todos los productos         |
| GET    | /api/products/:pid           | Obtener producto por ID             |
| POST   | /api/products                | Crear nuevo producto                |
| PUT    | /api/products/:pid           | Actualizar producto                 |
| DELETE | /api/products/:pid           | Eliminar producto                   |

### API de Carritos
| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| POST   | /api/carts                   | Crear nuevo carrito                 |
| GET    | /api/carts/:cid              | Obtener carrito por ID              |
| POST   | /api/carts/:cid/product/:pid | Agregar producto al carrito         |

### Vistas
| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | /                            | Vista estática de productos (home)  |
| GET    | /realtimeproducts            | Vista en tiempo real con WebSockets |

## 🖼️ Vistas
- **Home (`/`)**: Muestra la lista de productos cargada desde `data/products.json`. Se actualiza al recargar la página tras modificaciones en la API.
- **RealTimeProducts (`/realtimeproducts`)**: Muestra productos en tiempo real usando WebSockets. Incluye un formulario para agregar productos y botones para eliminarlos. Las actualizaciones se reflejan automáticamente sin recargar.

## 📡 WebSockets
La vista `/realtimeproducts` utiliza Socket.io para:
- Cargar la lista de productos al conectar.
- Agregar nuevos productos desde un formulario (emite evento `addProduct`).
- Eliminar productos con un botón (emite evento `deleteProduct`).
- Actualizar la lista en todos los clientes conectados tras cada acción.

## 🧪 Pruebas
### Con Postman
- Importa la colección ubicada en `docs/postman/postman_collection.json`.
- Todos los endpoints de la API usan `http://localhost:8080` como base.
- Prueba los endpoints de `/api/products` y `/api/carts` para gestionar productos y carritos.

### Con Navegador
- Abre `http://localhost:8080/` para ver la lista estática de productos.
- Abre `http://localhost:8080/realtimeproducts` para interactuar con productos en tiempo real (agregar/eliminar).
- Las modificaciones realizadas vía API (`/api/products`) se reflejan en la vista `/` al recargar la página.
- Las modificaciones en `/realtimeproducts` (formulario o botones) actualizan la lista en tiempo real.

## 📂 Estructura del Proyecto
- `src/app.js`: Configuración del servidor (Express, Handlebars, Socket.io).
- `src/routes/`: Routers para API (`products.router.js`, `carts.router.js`) y vistas (`views.router.js`).
- `src/managers/`: Clases para manejar productos (`ProductManager.js`) y carritos (`CartManager.js`).
- `src/views/`: Vistas Handlebars (`home.handlebars`, `realTimeProducts.handlebars`).
- `data/`: Archivos JSON para persistencia (`products.json`, `carts.json`).
- `docs/postman/`: Colección de Postman para pruebas de API.