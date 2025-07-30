const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
    filename: './src/db.sqlite'
    },
    useNullAsDefault: true
});

db.schema.hasTable('tasks').then(exists => {
    if (!exists) {  
        return db.schema.createTable('tasks', table => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description').defaultTo('');
            table.boolean('completed').defaultTo(false);
            table.timestamp('createdAt').defaultTo(db.fn.now());
        });
    }
}).catch(error => {
    console.error("Error creating tasks table:", error);
});

module.exports = db;