import knex from '../database/connection';
import {Request, Response} from 'express';

class PointerController {

    async index(request: Request, response: Response) {
        const {city, UF, items} = request.query;

        if (!Object.keys(request.query).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }

        try {
          
            const parsedItems: number[] = String(items)
            .split(',')
            .map(item => Number(item.trim()));

            const pointsFilteredByCollectedItemId = await 
             knex('collect_points')
            .join('point_collected_items',
             'collect_points.id', 
             '=',
              'point_collected_items.collect_point_id')
            .whereIn('point_collected_items.collected_item_id', parsedItems)
            .where('city', String(city))
            .where('UF', String(UF))
            .distinct()
            .select('collect_points.*'); // collect_points.* pegar os atributos somente da tabela points
        
            return response.json(pointsFilteredByCollectedItemId);

        } catch (err) {
            console.error({...err})
            return response.status(400).json({message: 'Error to execute queryBuilder', error: {...err}});
        }
        
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        if (!Object.keys(request.params).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }
        try {
            const point = await knex('collect_points').where('id', id).first(); // retorna somente um regtistro

            if (!point) {
                return response.status(400).json({message: 'Collect point not found.'});
            }

            // SELECT * FROM collected_items 
            //JOIN point_collected_items on collected_items.id = point_collected_items.collected_item_id
            // WHERE point_collected_items.collect_point_id = id

            const itemsCollectedByThisPoint = await 
            knex('collected_items')
            .join('point_collected_items', 
            'collected_items.id', 
            '=', 
            'point_collected_items.collected_item_id'
            )
            .where('point_collected_items.collect_point_id', id)
            .select('collected_items.title') //caso eu queira so o titlo dos items coletados

            // sem a clausula select ele projeta tudo

            return response.json({point, itemsCollectedByThisPoint});

        } catch (err) {
            return response.status(400).json({message: 'Error to execute queryBuilder', error: err});
        }
        
    }

    async create(request: Request, response: Response) {

        if (!Object.keys(request.body).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }


        const {
            image:img,
            name,
            email,
            UF,
            city,
            street,
            zip_code,
            neighborhood,
            addressNumber,
            latitude,
            longitude,
            items,
        } = request.body;

        try {
            const trx = await knex.transaction();

            // const collect_point_id: Number[] = await knex.transaction(
            //     (t) => 
            //     {
            //         return 
            //         knex('collect_points')
            //         .transacting(t)
            //         .insert(
            //             {
            //                 image,
            //                 name,
            //                 email,
            //                 UF,
            //                 city,
            //                 street,
            //                 zip_code,
            //                 addressNumber,
            //                 latitude,
            //                 longitude
            //             })
            //             .then(() => t.commit())
            //             .catch(() => t.rollback())
            //     }
            // );
            const image = img || 'https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'

            const pointsItems = {
                     image,
                     name,
                     email,
                     UF,
                     city,
                     street: street || '',
                     zip_code,
                     addressNumber:addressNumber || '',
                     neighborhood:neighborhood || '',
                    latitude,
                     longitude
                 };

            const collect_point_id: Number[] =  await trx('collect_points').insert(pointsItems);
    
                const pointItems: Number[] = items.map((collected_item_id: Number) => 
                    ({
                            collected_item_id, 
                            collect_point_id: collect_point_id[0]
                    })
                );
    
                await trx('point_collected_items').insert(pointItems);

                await trx.commit();
    
    
                return response.json({success: true, id: collect_point_id[0],...pointsItems, items});

        } catch (err) {
            return response.json({failure: true, reason: err});
        }

    }
}

export default PointerController;