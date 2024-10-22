# Shop Application

## Descripción

Este proyecto es una aplicación de tienda que consiste en un frontend en React y un backend en Ruby on Rails. La aplicación permite a los usuarios ver productos, agregar artículos a su carrito y realizar un proceso de pago. También incluye un sistema de descuentos en función de las promociones definidas para ciertos productos.

## Estructura del Proyecto

El repositorio contiene las siguientes carpetas:

- `shop-frontend`: Contiene el código del frontend de la aplicación, construido con React.
- `shop_api`: Contiene el código del backend de la aplicación, construido con Ruby on Rails.

## Funcionalidades

- Visualización de productos con precios.
- Agregar productos al carrito.
- Calcular el total del carrito, aplicando descuentos donde corresponda.
- Manejo de errores al cargar productos o durante el proceso de pago.

## Tecnologías Utilizadas

- **Frontend**: React, React-Bootstrap
- **Backend**: Ruby on Rails
- **Base de Datos**: Archivos JSON para datos de productos (para simplificar la prueba, un upgrade del proyecto sería usar Sqlite3, por ejemplo).
- **Control de Versiones**: Git

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/)
- [Ruby](https://www.ruby-lang.org/en/downloads/)
- [Rails](https://rubyonrails.org/)
- [Git](https://git-scm.com/)

## Instalación y Configuración

### Backend (Ruby on Rails)

1. Clona el repositorio:

  ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd shop_api
  ```
2. Instala las gemas necesarias:

  ```bash
  bundle install
  ```
3. Asegúrate de que el archivo products.json esté presente en la carpeta app/data/ con los datos de los productos.

4. Inicia el servidor Rails:

  ```bash
  rails server
  ```

El servidor debería estar disponible en http://localhost:3000.

##Frontend (React)

1. Cambia al directorio del frontend:

  ```bash
  cd shop-frontend
  ```
2. Instala las dependencias:

  ```bash
  npm install
  ```

3. Inicia la aplicación:

  ```bash
  npm start
  ```

El frontend debería estar disponible en http://localhost:4000.


## Testing

En el backend hemos usado Spec para testear que el código cumplía con las condiciones. 

Para realizar las pruebas ejecutar el siguiente script estando en el repositorio del backend:

  ```bash
  bundle exec rspec
  ```
