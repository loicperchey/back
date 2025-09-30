import { response } from "express";


export const postSchemaFleshAndBloodCard ={
  
    type:'object',
    
    properties: {
      name: {type: 'string'},
        edition: {type: 'string'},
        cost: {type: 'number'},
        pitch: {type: 'number'},
        type: {type: 'string'},
        talent: {type: 'string'},
        text: {type: 'string'},
        attack: {type: 'number'},
        defense: {type: 'number'},
        fleshAndBloodDeckListPresence: {type: 'array'}
  }
}








