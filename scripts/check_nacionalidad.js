const http = require('http');
const https = require('https');

async function fetchText(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
        resolve(fetchText(loc, redirects - 1));
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const site = 'http://localhost:3000/nacionalidad';
    console.log('Fetching', site);
    const page = await fetchText(site);
    console.log('Status', page.status);
    const keys = ['Contenido Teórico', 'Preguntas de Práctica', 'Recursos PDF', 'Descargar PDF', 'Gratis', '📖 Contenido Teórico'];
    keys.forEach(k => console.log(k + ': ' + page.body.includes(k)));

    const pdfUrl = 'http://localhost:3000/api/nacionalidad/ccse-derechos-deberes/pdf';
    console.log('Checking PDF endpoint', pdfUrl);
    const pdf = await fetchText(pdfUrl);
    console.log('PDF status', pdf.status, 'length', pdf.body.length);
  } catch (e) {
    console.error('ERROR', e.message || e);
    process.exit(1);
  }
})();

