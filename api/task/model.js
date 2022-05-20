// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('tasks')
    .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
    .select('tasks.*', 'project_name', 'project_description')
}

function getById(id) {
    return db('tasks').where('resource_id', id).first()
}

async function create(resource) {
    const [id] = await db('tasks').insert(resource)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create
}