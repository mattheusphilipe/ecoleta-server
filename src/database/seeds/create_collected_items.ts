import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('collected_items').insert(
        [
            {
                title: 'Lâmpadas', image: 'lampadas.svg'
            },
            {
                title: 'Pilhas e Baterias', image: 'baterias.svg'
            },
            {
                title: 'Pápeis e Papelão', image: 'papeis-papelao.svg'
            },
            {
                title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'
            },
            {
                title: 'Resíduos Orgânico', image: 'organicos.svg'
            },
            {
                title: 'Óleo de Cozinha', image: 'oleo.svg'
            },
        ]
    );
}