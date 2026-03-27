const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Servidor de Elite Performance Pro funcionando!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('------------------------------------------');
  console.log(`Servidor encendido en el puerto ${PORT}`);
  console.log('------------------------------------------');
});