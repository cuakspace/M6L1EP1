const http = require('node:http');

const generarHTMLFechaHora = () => {
  const fechaActual = new Date();
  
  // TODO: Extraer componentes de la fecha (día, mes, año, horas, minutos, segundos).
  // Pista: Revisa los métodos de Date o la API Intl.DateTimeFormat.
  const diaNombre = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(fechaActual); 
  const diaNumero = fechaActual.getDate();
  const mes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaActual);
  const anio = fechaActual.getFullYear();
  
  const horas = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Reloj del Servidor</title>
    </head>
    <body>
      <h1>Información Temporal</h1>
      <p>Hoy es ${diaNombre}, ${diaNumero} del mes ${mes} del año ${anio}.</p>
      <p>La hora exacta en el servidor es: <strong>${horas}:${minutos}:${segundos}</strong></p>
    </body>
    </html>
  `;
};

const generarHTMLPalabraAleatoria = () => {
  const longitud = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
  let palabra = '';
  for (let i = 0; i < longitud; i++) {
    palabra += alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
  }

  // TODO: Implementar un bucle para construir la 'palabra' sumando letras del 'alfabeto'.

  return `<h1>Palabra Aleatoria Generada: <span style="color: blue;">${palabra}</span></h1>`;
};

const generarHTMLNumeroAleatorio = () => {
  const min = 10;
  const max = 50000;

  // TODO: Calcular un número entero aleatorio entre 'min' y 'max'.
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

  return `<h1>Número Aleatorio Generado: <span style="color: green;">${numeroAleatorio}</span></h1>`;
};

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/') {
    if (method === 'GET') {
      // TODO: Configurar status HTTP (200) y Content-Type (text/html).
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generarHTMLFechaHora());
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Método no permitido en la ruta raíz.');
    }
  } 
  
  else if (url === '/random-data') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generarHTMLPalabraAleatoria());
    } 
    else if (method === 'PUT') {
      // TODO: Implementar la respuesta para el método PUT utilizando generarHTMLNumeroAleatorio().
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generarHTMLNumeroAleatorio());

    } 
    else {
      // TODO: Manejar métodos no implementados. Retornar texto plano indicando el método recibido.
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Aún no estoy preparado para responder al método ${method}`);
    }
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error 404: La ruta solicitada no existe.');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});