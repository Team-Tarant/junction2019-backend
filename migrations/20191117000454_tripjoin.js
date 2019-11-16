
exports.up = function(knex) {
  return knex.schema.createTable('tripjoin', table => {
    table.string('id').notNull()
    table.string('tripId')
    table.string('participantName')
    table.string('participantPhone')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tripjoin')
};
