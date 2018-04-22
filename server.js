const Hapi = require('hapi');
const routes = require('./src/routes')

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 3000;
const RADIX = 10;

const serverConfig = {
    host: process.env.HOST || DEFAULT_HOST,
    port: parseInt(process.env.PORT, RADIX) || DEFAULT_PORT
}

const createServer = (settings, routes) => {
    const server = Hapi.server({
        ...settings,
        app: {}
    });
    server.route(routes)
    return server
}

const server = createServer(serverConfig, routes)

exports.server = server;
exports.startServer = async () => {
    await server.register({
        plugin: require('hapi-raven'),
        options: {
            dsn: process.env.SENTRY_DSN
        }
    })
    await server.start()
    return server
}
