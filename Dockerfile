# Usa una imagen de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del frontend al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto 5173 (usado por Vite)
EXPOSE 5173

# Inicia Vite en modo desarrollo con "--host" para que sea accesible
CMD ["npm", "run", "dev", "--", "--host"]
