import Knex from 'knex'

// Criar a tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('collect_points', table => 
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('UF', 2).notNullable();
        table.string('city').notNullable();
        table.string('street').notNullable();
        table.string('zip_code').notNullable();
        table.integer('addressNumber').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
    });
}

// Voltar trás (remover tabela)
export async function down(knex: Knex) {
    return knex.schema.dropTable('collect_points');
}