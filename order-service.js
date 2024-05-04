const http = require('node:http');
const url = require('node:url');

const menus = ['Nasi Goreng', 'Mie Goreng', 'Mie Rebus', 'Es Teh', 'Teh Tawar'];
const MISSING = 3;

const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url);
  let id = pathname.match(/^\/(\d+)$/);

  if (!id) {
    response.statusCode = 400;
    return void response.end();
  };

  id = Number(id[1]);

  if (id === MISSING) {
    response.statusCode = 404;
    return void response.end();
  };

  response.setHeader('Content-Type', 'application/json');

  response.end(JSON.stringify({
    id,
    menu: menus[id % menus.length],
  }));
});

server.listen(process.env.PORT || 0, () => {
  const { port } = server.address();
  console.info(`Order service listening on localhost on port: ${port}`);
});
