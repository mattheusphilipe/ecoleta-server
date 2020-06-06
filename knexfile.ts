import path from 'path';

module.exports = 
{
    // knex não suporta o ES6 o export default
    client: 'sqlite3',
    connection: 
    {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: 
    {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: 
    {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};