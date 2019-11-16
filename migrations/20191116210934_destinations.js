
exports.up = function(knex) {
  return knex.schema.createTable('destinations', table => {
    table.string('id').notNull()
    table.string('name')
    table.string('description')
    table.timestamps()  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('destinations')
};
