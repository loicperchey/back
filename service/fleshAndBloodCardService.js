const SQL = require('@nearform/sql')
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
const { request, json, response } = require("express");
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
  
    
  fastify.get('/', async (request) => {
     return{hello: "bienvenue sur cette piètre tentative de crud sur fastify"};
    })

  fastify.get('/FleshAndBloodCard/:id', async (request, reply) => {
    const {id} = request.params;
    const table="FleshAndBloodCard";
    const requete = SQL `SELECT * FROM ${table} WHERE id=${id}`;
    const reponse = fastify.mysql.query(requete);
    reply.code(200);
    return {reponse}
});

 // Définition d'une route POST
fastify.post("/FleshAndBloodCard", async (request, reply) => {
   const table="FleshAndBloodCard";
	const { name, edition, year, cost, pitch, type, talent, text, attack, defense } = request.body;

	const requete = SQL`INSERT Into ${table} (name, edition, year, cost, pitch, type, talent, text, attack, defense) VALUES (${name}, ${edition}, ${year}, ${cost}, ${pitch}, ${type}, ${talent}, ${text}, ${attack}, ${defense})`;
  const reponse = fastify.mysql.query(requete);
  const {id} = reponse.requete.params.id;
  const requeteInformationCreation = SQL `SELECT * FROM ${table} WHERE id=${id}`;
   reply.code(201);
   return{requeteInformationCreation}
});



fastify.put('FleshAndBloodCard/:id', async (request, reply) => {
	const { id } = request.params;
	const table = 'FleshAndBloodCard';

	const { name, edition, year, cost, pitch, type, talent, text, attack, defense } = request.body;

	const requete = SQL`UPDATE ${table} SET  name = ${name}, edition = ${edition}, year = ${year}, cost = ${cost}, pitch = ${pitch}, type = ${type}, talent = ${talent}, text = ${text}, attack = ${attack}, defense = ${defense} WHERE id = ${id}`;

	const response = fastify.mysql.query(requete);

	reply.code(200);
	return { response };
});

fastify.delete('FleshAndBloodCard/:id', async (request, reply) => {
	const { id } = request.params;
	const table = 'fleshAndBloodCard';
	const requete = SQL`DELETE ${table} WHERE id = ${id}`;

	const response = fastify.mysql.query(requete);

	reply.code(200);
	return { response };
});





}


   module.exports = FleshAndBloodCardRoute;
