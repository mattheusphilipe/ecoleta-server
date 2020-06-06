import Knex from 'knex'

// Criar a tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('point_collected_items', table => 
    {
        table.increments('id').primary();
        table.integer('collect_point_id')
        .notNullable()
        .references('id')
        .inTable('collect_points');
    
        table.integer('collected_item_id')
        .notNullable()
        .references('id')
        .inTable('collected_items');
    });
}

// Voltar trás (remover tabela)
export async function down(knex: Knex) {
    return knex.schema.dropTable('point_collected_items');
}