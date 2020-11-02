import Knex from 'knex';
// Knex traz as definições de tipo Knex, sendo necessário receber o parâmetro com o tipo 'knex: Knex'

export async function up(knex: Knex) {
// CRIAR TABELA
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

export async function down(knex: Knex) {
// DESFAZER (DELETAR TABELAR)
    knex.schema.dropTable('points');
}