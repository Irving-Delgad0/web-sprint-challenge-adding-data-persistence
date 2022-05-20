/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('projects', tbl => {
        tbl.increments('project_id')
        tbl.varchar('project_name').notNullable()    
        tbl.varchar('project_description')
        tbl.boolean('project_completed').defaultTo('false')
    })
    await knex.schema.createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.varchar('resource_name').notNullable().unique()
        tbl.varchar('resource_description')

    })
    await knex.schema.createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.varchar('task_description').notNullable()    
        tbl.varchar('task_notes')
        tbl.boolean('task_completed')
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')        
    })
    await knex.schema.createTable('project_resources', tbl => {
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        tbl.primary(['project_id', 'resource_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('project_resources')
    await knex.schema.dropTableIfExists('tasks')
    await knex.schema.dropTableIfExists('resources')
    await knex.schema.dropTableIfExists('projects')    
};
