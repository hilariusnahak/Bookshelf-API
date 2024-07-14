const Hapi = require('@hapi/hapi');
const routes = require( './routes' );

const init = async () => {
 const server = Hapi.server({
  port: 9000,
  host: 'localhost',
  routes: {
   cors: {
    origin: ['*'],
   },
  },
 });

 // Routes
 server.route(routes);

 await server.start();
 console.log(`Server running on ${server.info.uri}`);
}
init();