
exports.up = function(knex) {
  return knex.schema.createTable('trip', table => {
    table.string('id').notNull()
    table.string('destinationId')
    table.string('driverName')
    table.string('driverPhone')
    table.string('from')
    table.date('startToDestination')
    table.date('startFromDestination')
    table.integer('capacity')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('trip')
};
