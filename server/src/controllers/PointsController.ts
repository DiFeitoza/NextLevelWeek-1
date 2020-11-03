import knex from '../database/connection';
import { Request, Response } from 'express';

export class PointsController {
  async index(request: Request, response: Response){
    return response.json(await knex('points').select('*'));
  };

  async show(request: Request, response: Response){
    // outra forma de escrever: const id = request.params.id;
    const { id } = request.params;
    
    return response.json(await knex('points').where('id', id).first());
  };

  async create(request: Request, response: Response) {
    // const data = request.body;
    
    /* recurso de desestruturação do javascript, mesmo que escrever:
    const name = request.body.name;
    const email = request.body.name;
    ... */
  
    // Object Property Shorthand: p.ex. "name: 'name'"; quando o nome da propriedade é igual ao nome da variável do objeto, podemos omitir a propriedade.
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

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
    };
  
    const insertedPointsIds = await trx('points').insert(point);

    const point_id = insertedPointsIds[0];
  
    const pointItems = items.map((item_id: number) => {
      return {
        point_id,
        item_id,
      };
    });

    await trx('points_items').insert(pointItems);

    // sempre que usar o 'trx = knex.transaction()', devo finalizar com trx.commit(), que faz as alterações no banco se as partes da trx ocorreram de forma correta.
    await trx.commit();

    // Spread Operator Shorthand: '... point' retorna todos os dados de 'point', spread operator '...'
    return response.json({
      id: point_id,
      ... point
    });
  };
};