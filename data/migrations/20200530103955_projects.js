
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl =>{
        tbl.increments();
        tbl.text('project_name')
            .notNullable();
        tbl.text('project_description')
        tbl.boolean('project_completed')
            .defaultTo(0);
    })
    .createTable('tasks', tbl =>{
        tbl.increments();
        tbl.text('task_description')
            .notNullable();
        tbl.text('notes');
        tbl.boolean('task_completed')
            .defaultTo(0);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('project')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('resources', tbl =>{
        tbl.increments();
        tbl.text('resource_name')
            .notNullable();
         tbl.text('resource_description');
    })
    .createTable('resource_detail', tbl =>{
        tbl.increments();
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('project')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resource')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('resourse_detail')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects');
};
