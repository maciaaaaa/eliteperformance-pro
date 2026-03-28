// server.js - Servidor Profesional ELITEPERFORMANCE PRO
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. CONFIGURACIÓN
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// 2. MIDDLEWARES BÁSICOS
app.use(cors());
app.use(express.json());

// Logger: Muestra cada petición en la terminal (útil para debug)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 3. CONECTAR RUTAS
// Rutas de Autenticación (Registro y Login)
app.use('/api/auth', require('./routes/auth'));

// Rutas de Clientes (Gestión de Atletas) - PROTEGIDAS
app.use('/api/clientes', require('./routes/clientes'));

// 4. HEALTH CHECK / ESTADO DEL SISTEMA
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ Online', 
    timestamp: new Date(), 
    project: 'ElitePerformance Pro' 
  });
});

// 5. MANEJO DE ERRORES GLOBAL (Para que el servidor no se caiga)
app.use((err, req, res, next) => {
  console.error('❌ Error detectado:', err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// 6. ARRANCAR SERVIDOR
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║      🚀 ELITEPERFORMANCE PRO - Backend Online         ║
  ║                                                       ║
  ║   URL: http://localhost:${PORT}                        ║
  ║   Status: ✅ Funcionando correctamente                ║
  ║                                                       ║
  ║   Rutas activas:                                      ║
  ║   - AUTH:     /api/auth/registro, /api/auth/login    ║
  ║   - CLIENTES: /api/clientes (Protegida con Token)    ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});