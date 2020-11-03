import knex from '../database/connection';
import { Request, Response } from 'express';

export class ItemsController {
  async show(request: Request, response: Response){
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
  };
};