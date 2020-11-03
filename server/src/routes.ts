import express, { Router } from 'express';
// importa connection como knex
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      //EC2015 incluiu o acento grave como forma de manupular strings. ex. ${}
      image_url: `http://localhost:3131/uploads/${item.image}`
    }
  });

  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  // const data = request.body;
  
  /* recurso de desestruturação do javascript, mesmo que escrever:
  const name = request.body.name;
  const email = request.body.name;
  ... */

  /* short sintaxe, p.ex. "name: 'name'"; quando o nome da propriedade é igual ao nome da variável do objeto, podemos omitir a propriedade. */

  const {
    // image,
    name,
    email,
    whatsapp,
    longitude,
    latitude,
    city,
    uf,
    items
  } = request.body;

  // trx (transaction), é uma forma de garantia de que as duas transações no banco ocorram de forma atômica. Se uma falhar a outra é cancelada (roolback).
  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    longitude,
    latitude,
    city,
    uf,
  });

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: insertedIds[0],
    };
  });

  await trx('points_items').insert(pointItems);

  return response.json({ succes: true });
});

export default routes;