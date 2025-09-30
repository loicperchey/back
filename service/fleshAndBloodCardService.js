
const { default: fastifyMysql } = require("@fastify/mysql");
const fastify = require('fastify')({
  ajv: {
    plugins:[
      require('ajv-merge-patch')
    ]
  }
})
const ourDbConnector = require("../our-db-connector");
const Ajv = require("ajv");
const {postSchemaFleshAndBloodCard} = require("../model/fleshAndBloodCard");
const { request, json } = require("express");
const { req } = require("pino-std-serializers");
const ajv = new Ajv({
   removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array'
});


 
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function FleshAndBloodCardRoute (fastify, options) {
    

const schema = postSchemaFleshAndBloodCard;
  
  

    /* fastify.get('/FleshAndBloodCard/:name', async (request) => {
     console.log(Object.hasOwn(request.params, 'name'));
     return{hello: request.params.name};
    }) */
    
  fastify.get('/', async (request) => {
     return{hello: "bienvenue sur cette piètre tentative de crud sur fastify"};
    })

  fastify.get('/FleshAndBloodCard/:id', (req, reply) => {
    'SELECT id, name FROM FleshAndBloodCard WHERE id=?', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
});

 // Définition d'une route POST
fastify.post("/FleshAndBloodCard", schema, async (request, reply) => {
   
  
   reply.code(201).send(request.body);
});
}

   module.exports = FleshAndBloodCardRoute;
