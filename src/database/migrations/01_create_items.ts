import Knex from 'knex'

// Criar a tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('collected_items', table => 
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

// Voltar trás (remover tabela)
export async function down(knex: Knex) {
    return knex.schema.dropTable('collected_items');
}