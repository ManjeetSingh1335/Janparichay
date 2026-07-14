import http from 'http';

const PORT=process.env.PORT || 5000;

const server=http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.method === 'OPTIONS'){
    res.writeHead(204);
    res.end();
    return;
  }

  if(req.url === '/api/ip-info' && req.method === 'GET'){
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
      ?.split(',')[0]
      .trim() || req.socket.remoteAddress || '';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ip: clientIp.replace(/^::ffff:/, ''),
      city: 'Unknown',
      country_name: 'Unknown'
    }));
  }else{
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Placeholder backend service running on http://localhost:${PORT}`);
});
