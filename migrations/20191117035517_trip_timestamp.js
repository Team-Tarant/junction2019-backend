
exports.up = function(knex) {
  return knex.schema.table('trip', table => {
    table.timestamp('startToDestination')
    table.timestamp('startFromDestination')
  })
};

exports.down = function(knex) {
  return knex.schema.table('trip', table => {
    table.dropColumn('trip')
  })
};
