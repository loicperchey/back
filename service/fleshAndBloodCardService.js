/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routesAttrapeTout (fastify, options) {
    
      fastify.get('/FleshAndBloodCard', async (request, reply) => {
      const result = await collection.find().toArray()
      if (result.length === 0) {
        throw new Error('No documents found')
      }
      return result
    })
    }

async function name(params) {

  fastify.get('/FleshAndBloodCard/:name', (req, reply) => {
  console.log(Object.hasOwn(req.params, 'name')); // true
  return { hello: req.params.name };
});
  
}


    
    module.exports = routesAttrapeTout, name