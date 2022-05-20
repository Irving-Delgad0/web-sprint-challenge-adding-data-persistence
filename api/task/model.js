// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAll() {
    const rows = await db('tasks')
    .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
    .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')

   return rows.map(row => row.task_completed === 0
        ? {...row, task_completed: false}
        : {...row, task_completed: true})
}

async function getById(id) {
    const row = await db('tasks').where('task_id', id).first()
    return row.task_completed === 0
        ? {...row, task_completed: false}
        : {...row, task_completed: true}
}

async function create(task) {
    const [id] = await db('tasks').insert(task)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create
}