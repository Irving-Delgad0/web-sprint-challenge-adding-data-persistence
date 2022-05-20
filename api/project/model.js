// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAll() {
    const rows = await db('projects')
    return rows.map(row => row.project_completed === 0
        ? {...row, project_completed: false}
        : {...row, project_completed: true})
}

async function getById(id) {
    const row = await db('projects').where('project_id', id).first()

    return row.project_completed === 0
        ? {...row, project_completed: false}
        : {...row, project_completed: true}
}

async function create(project) {
    const [id] = await db('projects').insert(project)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create
}