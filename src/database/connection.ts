import knex from 'knex';
import path from 'path';

const connection = knex(
    {
        client: 'sqlite3',
        connection: 
        {
            filename: path.resolve(__dirname, 'database.sqlite'), // __dirname var globalsempre retona o caminho do arquivo que esta executanto ele
        },
        useNullAsDefault: true,
    }
);

// Criar entidades da aplicação

// Entidade collect_points: pontos de colete
// Item coletados collected_items: pilhas, eletronicos
// pum item podem ser coletados de váris pontos então e uma relação many-to-many (n-n) (poin itens)
// point_items:  enteidade para relacionar os pontos de cotas com os itens que ele coleta 
 // collect_point_id  e item_collected_id

 // Migration do knex é o historico do banco de dados

 export default connection;
