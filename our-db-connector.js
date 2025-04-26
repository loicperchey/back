// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')


/**
 * Connects to a mysql database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    url: 'mysql://pseudo:motDePasse@localhost/mysql'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)
