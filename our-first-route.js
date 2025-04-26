/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  const collection = fastify.mysql.db.collection('test_collection')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/FleshAndBloodCard', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

}

module.exports = routes