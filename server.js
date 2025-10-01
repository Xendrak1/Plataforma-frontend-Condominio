const express = require('express');
const path = require('path');

const app = express();

// Ruta a la carpeta dist
const distPath = path.join(__dirname, 'dist');

console.log('=== Server Starting ===');
console.log('Dist path:', distPath);
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir archivos estáticos de la carpeta dist
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: false,
  setHeaders: (res, filePath) => {
    // Cache para assets compilados (con hash en el nombre)
    if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Todas las demás rutas devuelven el index.html (para React Router)
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(distPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Error loading application');
      }
    });
  } catch (error) {
    console.error('Error in catch-all route:', error);
    res.status(500).send('Internal server error');
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).send('Something broke!');
});

// Puerto configurado por Azure o 8080 por defecto
const port = process.env.PORT || 8080;

// Iniciar servidor
const server = app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📁 Serving static files from: ${distPath}`);
  console.log('=== Server Started Successfully ===');
});

// Manejo de errores del servidor
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

module.exports = app;


