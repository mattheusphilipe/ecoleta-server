import knex from '../database/connection';
import {Request, Response} from 'express';


// padrao CRUDcomunidade index, show, create and update, delete

class ItemsController {

    async index(request: Request, response: Response) {
        try {
  
            const items = await knex('collected_items').select('*');
            const serializedItems = items.map(({title, image, id}) => 
                ({id, title, image_url: `http://localhost:3232/uploads/${image}`}));
        
            response.json(serializedItems);

        } catch (err) {
            return response.json({failure: true, reason: err});
        }

    }
}

export default ItemsController;