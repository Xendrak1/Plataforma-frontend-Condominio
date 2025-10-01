import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const distPath = path.join(__dirname, 'dist');

console.log('Starting server...');
console.log('Dist path:', distPath);
console.log('Environment:', process.env.NODE_ENV);

// Servir archivos estáticos de la carpeta dist
app.use(express.static(distPath, {
  setHeaders: (res, path) => {
    // Cache para assets compilados (con hash en el nombre)
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Health check endpoint para Azure
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Todas las demás rutas devuelven el index.html (para React Router)
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📁 Serving static files from: ${distPath}`);
});


